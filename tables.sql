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
