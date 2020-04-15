const express = require("express");
const handleError = require("./middleware/error");
const auth = require('./middleware/auth')
const example = require('./handlers/example')
const users = require('./handlers/users')

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.json());







server.use(handleError);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

module.exports = server