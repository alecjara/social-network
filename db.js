const spicedPg = require('spiced-pg');

const db = spicedPg(process.env.DATABASE_URL || `postgres:postgres:postgres@localhost:5432/socialnetwork`);

exports.createUser = function(firstname, lastname, email, password) {
    return db.query(`INSERT INTO users (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id, firstname, lastname`,
    [firstname || null, lastname || null, email || null, password|| null]);
};

exports.getUser = function(email) {
    return db.query(
        `SELECT users.id AS "user_id", users.password
        FROM users
        WHERE users.email = $1`,
        [email]
    );
};
