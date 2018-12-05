DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(200) NOT NULL,
        lastname VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE CHECK (email <> ''),
        password VARCHAR(200) NOT NULL,
        profilePicUrl TEXT,
        bio TEXT
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    receiverid INTEGER NOT NULL REFERENCES users(id),
    senderid INTEGER NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
