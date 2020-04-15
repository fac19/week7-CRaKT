const db = require("../db/connection.js");

function getAllExamples() {
    return db.query("SELECT * FROM examples;").then(result => result.rows);
}

module.exports = {
    getAllExamples
};