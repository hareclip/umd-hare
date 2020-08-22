const pg = require('pg');
const pgCamelCase = require('pg-camelcase');
pgCamelCase.inject(pg);

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 10,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 0,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    wrap: (data) => ({
        data: data,
        //bucket_url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/res/`,
    }),
    auth: async (res, username, password, roles) => {
        if(!(typeof username === 'string' && typeof password === 'string')) {
            res.sendStatus(400);
            return null;
        }

        const query = {
            text: `
                SELECT u.id, u.username, u.role, r.label role_label
                FROM users u
                LEFT JOIN roles r
                    ON u.role = r.id
                WHERE u.username = $1 AND u.password = crypt($2, u.password)
            `,
            values: [username, password]
        };
        const result = (await pool.query(query)).rows[0];
        if(!result) {
            res.sendStatus(401);
            return null;
        }
        if(!roles.includes(result.role)) {
            res.sendStatus(403);
            return null;
        }
        return result;
    }
};