BEGIN;

    DROP TABLE IF EXISTS users, examples
    CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_password VARCHAR(511) NOT NULL,
    adminusr BOOLEAN
);

CREATE TABLE examples
(
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
    language VARCHAR(32),
    title VARCHAR(255),
    example TEXT NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO users
    (username, email, user_password, adminusr)
VALUES
    ('admin', 'admin@iscool.com', '$2a$10$3IAfxI7ekmnHqMv1T8a46O./avVNcq/YYk6SGkRwxEHsy9cQasuUy', true),
    ('Tom', 'tom@iscool.com', '$2a$10$3IAfxI7ekmnHqMv1T8a46O./avVNcq/YYk6SGkRwxEHsy9cQasuUy', false),
    ('Chloe', 'chloe@iscool.com', '$2a$10$3IAfxI7ekmnHqMv1T8a46O./avVNcq/YYk6SGkRwxEHsy9cQasuUy', false),
    ('Kat', 'kat@iscool.com', '$2a$10$det9UYQkW9avEapZQHEti.hcEYC6s4t0YzpXW1C949xMXxQpi.RC2', false),
    ('Roger', 'roger@iscool.com', '$2a$10$Ii5o1InMg1gy4k9ylTTfiOyzDfOzKJ2n.6NuuxdgrPmx088X0DXna', false);

INSERT INTO examples
    (owner_id, language, title, example)
VALUES
    (1, 'js', 'Test example 1', 'Example 1 code goes here.'),
    (2, 'sql', 'Test example 2', 'Example 2 code goes here.'),
    (3, 'js', 'Test example 3', 'Example 3 code goes here.'),
    (4, 'js', 'Test example 4', 'Example 4 code goes here.');

COMMIT;