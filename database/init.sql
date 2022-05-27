-- Start the transaction

BEGIN;

-- Delete, 'cascade' delete relations
DROP TABLE IF EXISTS users, sessions CASCADE;

-- create tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE sessions (
    sid CHAR(24) UNIQUE NOT NULL PRIMARY KEY,
    data JSON NOT NULL
);

-- End the transaction
COMMIT;