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

exports.getUserData = function(id) {
    return db.query(
        `SELECT *
         FROM users
         WHERE id = $1`,
        [id]
    );
};

exports.addImages = function(cUrl, id) {
    return db.query(
        `UPDATE users
        SET profilePicUrl = $2
        WHERE id = $1
        RETURNING profilePicUrl`,
        [cUrl, id]
    );
};

exports.updateBio = function(id, bio) {
    return db.query(
        `UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING id, bio`,
        [id, bio]
    );
};

exports.otherPersonProfile = function(id) {
    return db.query(
        `SELECT id, firstname, lastname, email, bio, profilePicUrl
         FROM users
         WHERE id = $1`,
        [id]
    );
};

//we need two delete queries, one insert, one update
//query for new table
// SELECT * FROM friendships
// WHERE (receiverid = $1 AND senderid = $2)
// OR (receiverid = $2 and senderid = $1)


//delete the rows cancelling when accepted is false
//delete unfriend when accepting is true
