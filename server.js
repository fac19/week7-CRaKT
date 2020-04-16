const express = require("express");
const handleError = require("./middleware/error");
const auth = require("./middleware/auth");
const example = require("./handlers/examples");
const users = require("./handlers/users");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());

server.get("/", example.getAllExamples);
server.post("/example", example.post); // ADD AUTH MIDDLEWARE




server.post("/signup", users.post);
server.post("/login", users.login);

server.use(handleError);

if (process.env.PGDATABASE !== "localtest") {
    server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}

module.exports = server;