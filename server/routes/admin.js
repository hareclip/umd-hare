const express = require('express');
const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();
module.exports = router;

router.post('/auth', express.json(), async (req, res) => {
    const auth = await db.auth(res, req.body.username, req.body.password, [3]);
    if (auth) {
        res.sendStatus(200);
    }
});

router.post('/create-user', express.json(), async (req, res) => {
    const auth = await db.auth(res, req.body.username, req.body.password, [3]);
    if (!auth) return;

    const query = {
        text: `
            INSERT INTO users (username, password, role)
                VALUES ($1, crypt($2, gen_salt('bf', 4)), $3)
        `,
        values: [req.body.newUsername, req.body.newPassword, req.body.newRole]
    };
    try {
        await db.query(query);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(400);
    }
});

router.post('/delete-article', express.json(), async (req, res) => {
    const auth = await db.auth(res, req.body.username, req.body.password, [3]);
    if (!auth) return;

    const id = req.body.id;
    const query = {
        text: `DELETE FROM articles a WHERE a.id = $1`,
        values: [id]
    };
    try {
        await db.query(query);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(404);
    }
});
