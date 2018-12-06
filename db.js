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


exports.friendButton = function(receiver, sender) {
    return db.query(
        `SELECT * FROM friendships
        WHERE (receiverid = $1 AND senderid = $2)
        OR (receiverid = $2 and senderid = $1)`,
        [receiver, sender]
    );
};


exports.sendButton = function(receiver, sender) {
    return db.query(
        `INSERT into friendships (receiverid, senderid)
        VALUES ($1, $2 )
        RETURNING *`,
        [receiver, sender]
    );
};

exports.cancelButton = function(receiver, sender) {
    return db.query(
        `DELETE FROM friendships
           WHERE (receiverid = $1 AND senderid = $2)
           RETURNING *`,
        [receiver, sender]
    );
};

exports.acceptButton = function(receiver, sender) {
    return db.query(
        `UPDATE friendships
           SET accepted = true
           WHERE (receiverid = $1 AND senderid = $2)
           RETURNING *`,
        [receiver, sender]
    );
};

exports.deleteButton = function(receiverid, senderid) {
    return db.query(
        `DELETE FROM friendships
        WHERE (receiverid = $1 AND senderid = $2)
        OR (receiverid = $2 and senderid = $1)
        RETURNING *`,
        [receiverid, senderid]
    );
};


//FOR PART7
// const q = `
//     SELECT users.id, firstname, lastname, profilePicUrl, accepted
//     FROM friendships
//     JOIN users
//     ON (accepted = false AND receiverid = $1 AND senderid = users.id)
//     OR (accepted = true AND receiverid = $1 AND senderid = users.id)
//     OR (accepted = true AND senderid = $1 AND receiverid = users.id)
// `;
