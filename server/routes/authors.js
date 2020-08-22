const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();
module.exports = router;

router.get('/', async (req, res) => {
    const { rows: authors, rowCount: authorsCount } = await db.query(`SELECT * FROM authors ORDER BY id ASC`);

    const out = {
        authors: authors,
        count: authorsCount,
    }

    res.send(db.wrap(out));
});