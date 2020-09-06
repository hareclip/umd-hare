const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();
module.exports = router;

const getTags = async (id) => {
    const { rows: tags } = await db.query(`
        SELECT t.*
        FROM tags_articles ta
        JOIN tags t
            ON ta.tag = t.id
        JOIN articles a
            ON ta.article = a.id
        WHERE CURRENT_TIMESTAMP >= a.date_visible
            AND a.id = $1
    `, [id]);
    return tags;
};

router.get('/recent', async (req, res) => {
    const numArticles = 6;
    const query = {
        text: `
            SELECT a.*, c.id category_id, c.label category_label, au.full_name author_full_name
            FROM articles a
            LEFT JOIN authors au
                ON a.author = au.id
            LEFT JOIN categories c
                ON a.category = c.id
            WHERE CURRENT_TIMESTAMP >= a.date_visible
            ORDER BY a.date_created DESC
            LIMIT $1
        `,
        values: [numArticles],
    };

    const { rows: articles, rowCount: articlesCount } = await db.query(query);
    for (let i = 0; i < articlesCount; i++) {
        articles[i].tags = await getTags(articles[i].id);
    }

    const out = {
        articles: articles,
        count: articlesCount,
    }

    res.send(db.wrap(out));
});

router.get('/home', async (req, res) => {
    const numArticles = 8;
    const numFeaturedArticles = 2;
    const featuredCategoryA = 1; // News
    const featuredCategoryB = 2; // Opinion
    const featuredCategoryC = 3; // Politics

    const featuredQuery = {
        text: `
            SELECT a.*, c.id category_id, c.label category_label, au.full_name author_full_name
            FROM articles a
            LEFT JOIN authors au
                ON a.author = au.id
            JOIN categories c
                ON a.category = c.id AND (c.id = $2 OR c.id = $3 OR c.id = $4)
            WHERE CURRENT_TIMESTAMP >= a.date_visible
            ORDER BY a.date_created DESC
            LIMIT $1
        `,
        values: [numFeaturedArticles, featuredCategoryA, featuredCategoryB, featuredCategoryC],
    };

    const query = {
        text: `
            SELECT a.*, c.id category_id, c.label category_label, au.full_name author_full_name
            FROM articles a
            LEFT JOIN authors au
                ON a.author = au.id
            LEFT JOIN categories c
                ON a.category = c.id
            WHERE CURRENT_TIMESTAMP >= a.date_visible
            ORDER BY a.date_created DESC
            LIMIT $1
        `,
        values: [numArticles],
    };

    const { rows: featuredArticles, rowCount: featuredArticlesCount } = await db.query(featuredQuery);
    const { rows: otherArticles, rowCount: articlesCount } = await db.query(query);

    const featuredIDs = featuredArticles.map(a => a.id);
    const articles = featuredArticles.concat(otherArticles.filter(a => !featuredIDs.includes(a.id)));

    for (let i = 0; i < articlesCount; i++) {
        articles[i].tags = await getTags(articles[i].id);
    }

    const out = {
        articles: articles,
        count: articlesCount,
    }

    res.send(db.wrap(out));
});

router.get('/category/:category', async (req, res) => {
    const category = req.params.category;
    const amount = req.query.amount || 5;
    const offset = req.query.offset || 0;

    const query = {
        text: `
            SELECT a.*, c.id category_id, c.label category_label, au.full_name author_full_name
            FROM articles a
            LEFT JOIN authors au
                ON a.author = au.id
            JOIN categories c
                ON a.category = c.id AND c.id = $1
            WHERE CURRENT_TIMESTAMP >= a.date_visible
            ORDER BY a.date_created DESC
            LIMIT $2
            OFFSET $3
        `,
        values: [category, amount, offset],
    };

    const { rows: articles, rowCount: articlesCount } = await db.query(query);
    for (let i = 0; i < articlesCount; i++) {
        articles[i].tags = await getTags(articles[i].id);
    }

    const out = {
        articles: articles,
        count: articlesCount,
    }

    res.send(db.wrap(out));
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const { rows: articles } = await db.query(`
        SELECT a.*, c.id category_id, c.label category_label, au.full_name author_full_name
        FROM articles a
        LEFT JOIN authors au
            ON a.author = au.id
        LEFT JOIN categories c
            ON a.category = c.id
        WHERE CURRENT_TIMESTAMP >= a.date_visible
            AND a.id = $1
    `, [id]);
    if (articles.length < 1) {
        res.status(404).send('Article not found');
        return;
    }

    const article = articles[0];
    article.tags = await getTags(id);
    res.send(db.wrap(article));
});

router.get('/search', async (req, res) => {
    const searchTerm = req.query.search;

    const query = {
        text: `
            SELECT a.*, c.id category_id, c.label category_label, au.full_name author_full_name
            FROM articles a
            LEFT JOIN authors au
                ON a.author = au.id
            LEFT JOIN categories c
                ON a.category = c.id
            WHERE CURRENT_TIMESTAMP >= a.date_visible AND (author_full_name LIKE $1 OR a.title LIKE $1)
            ORDER BY a.date_created DESC
        `,
        values: ['%#{searchTerm}%'],
    };

    const { rows: articles, rowCount: articlesCount } = await db.query(query);
    for (let i = 0; i < articlesCount; i++) {
        articles[i].tags = await getTags(articles[i].id);
    }

    const out = {
        articles: articles,
        count: articlesCount,
    }

    res.send(db.wrap(out));
});

router.get('/', async (req, res) => {
    const amount = req.query.amount || 5;
    const offset = req.query.offset || 0;

    const query = {
        text: `
            SELECT a.*, c.id category_id, c.label category_label, au.full_name author_full_name
            FROM articles a
            LEFT JOIN authors au
                ON a.author = au.id
            LEFT JOIN categories c
                ON a.category = c.id
            WHERE CURRENT_TIMESTAMP >= a.date_visible
            ORDER BY a.date_created DESC
            LIMIT $1
            OFFSET $2
        `,
        values: [amount, offset],
    };

    const { rows: articles, rowCount: articlesCount } = await db.query(query);
    for (let i = 0; i < articlesCount; i++) {
        articles[i].tags = await getTags(articles[i].id);
    }

    const out = {
        articles: articles,
        count: articlesCount,
    }

    res.send(db.wrap(out));
});
