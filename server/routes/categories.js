const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();
module.exports = router;

router.get('/', async (req, res) => {
    const { rows: categories, rowCount: categoriesCount } = await db.query(`SELECT * FROM categories ORDER BY id ASC`);

    const out = {
        categories: categories,
        count: categoriesCount,
    }

    res.send(db.wrap(out));
});

router.get('/:id', async (req, res) => {
    const { rows: categories, rowCount: categoriesCount } = await db.query({
        text: `SELECT * FROM categories WHERE id = $1`,
        values: [req.params.id]
    });

    if(categoriesCount < 1) {
        res.sendStatus(404);
        return;
    }

    res.send(db.wrap(categories[0]));
});