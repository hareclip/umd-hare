const express = require('express');
const Router = require('express-promise-router');
const multer = require('multer');
const db = require('../db');
const s3 = require('../s3');

const router = new Router();
module.exports = router;

router.post('/auth', express.json(), async (req, res) => {
    const auth = await db.auth(res, req.body.username, req.body.password, [2, 3]);
    if (!auth) return;
    res.sendStatus(200);
});

router.post('/create-author', express.json(), async (req, res) => {
    const auth = await db.auth(res, req.body.username, req.body.password, [2, 3]);
    if (!auth) return;

    const query = {
        text: `
            INSERT INTO authors (full_name, created_by)
                VALUES ($1, $2)
        `,
        values: [req.body.fullName, auth.id]
    };

    await db.query(query);
    res.sendStatus(201);
});

router.post(
    '/publish-article',
    multer({ storage: multer.memoryStorage() }).fields([
        { name: 'contents', maxCount: 1 },
        { name: 'headerImage', maxCount: 1 },
    ]),
    async (req, res) => {
        const auth = await db.auth(res, req.body.username, req.body.password, [2, 3]);
        if (!auth) return;

        const contentsOpt = req.files['contents'];
        if (!contentsOpt) {
            res.status(400).send('Missing contents file');
            return;
        }
        const contents = contentsOpt[0];
        if (!contents || !contents.mimetype.startsWith('text/')) {
            res.status(415).send('Contents must be a text file');
            return;
        }

        const headerImageOpt = req.files['headerImage'];
        const headerImage = headerImageOpt ? headerImageOpt[0] : null;
        if (headerImage && headerImage.mimetype !== 'image/jpeg') {
            res.status(415).send('Header image must be a JPEG file');
            return;
        }

        const title = req.body.title;
        if (typeof title !== 'string') {
            res.status(400).send('Title must be a string');
            return;
        }

        const category = parseInt(req.body.category, 10);
        if (!category) {
            res.status(400).send('Category must be an integer');
            return;
        }

        const author = parseInt(req.body.author, 10);
        if (!author) {
            res.status(400).send('Author must be an integer');
            return;
        }

        const dateVisible = req.body.dateVisible;

        const publisher = auth.id;

        const insertQuery = {
            text: `
                INSERT INTO articles (title, category, author, publisher, date_visible)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id
            `,
            values: [title, category, author, publisher, dateVisible]
        }

        let insertedID;
        try {
            const inserted = (await db.query(insertQuery)).rows[0];
            if (!inserted) throw false;
            insertedID = inserted.id;
        } catch (e) {
            res.sendStatus(400);
            return;
        }

        const contentsFileName = `articles/${insertedID}.md`;
        const headerImageFileName = headerImage ? `images/articles/${insertedID}.jpg` : null;

        const contentsParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            ACL: 'public-read',
            Key: 'res/' + contentsFileName,
            Body: contents.buffer
        };

        try {
            await s3.upload(contentsParams).promise();
        } catch (e) {
            await db.query({ text: 'DELETE FROM articles WHERE id = $1', values: [insertedID] });
            res.status(502).send('Failed to upload contents file');
            return;
        }

        if (headerImage) {
            const headerImageParams = {
                Bucket: process.env.S3_BUCKET_NAME,
                ACL: 'public-read',
                Key: 'res/' + headerImageFileName,
                Body: headerImage.buffer
            };

            try {
                await s3.upload(headerImageParams).promise();
            } catch (e) {
                await db.query({ text: 'DELETE FROM articles WHERE id = $1', values: [insertedID] });
                res.status(502).send('Failed to upload header image file');
                return;
            }
        }

        const updateQuery = {
            text: `
                UPDATE articles
                    SET contents_file_name = $1, header_image_file_name = $2
                    WHERE id = $3
            `,
            values: [contentsFileName, headerImageFileName, insertedID]
        };

        try {
            const result = await db.query(updateQuery);
            if (result.rowCount !== 1) throw false;
        } catch (e) {
            res.sendStatus(400);
            return;
        }

        res.status(201).send(insertedID.toString());
    }
);
