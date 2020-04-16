const db = require("../db/connection.js");

function getAllExamples() {
    return db.query(`SELECT 
    users.username,
    examples.owner_id,
    examples.language,
    examples.title,
    examples.example,
    examples.date
    FROM     
    examples INNER JOIN users ON users.id = examples.owner_id;`).then(result => result.rows);
}

module.exports = {
    getAllExamples
};