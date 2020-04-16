const db = require("../db/connection.js");

function getAllExamples() {
  return db
    .query(
      `SELECT 
    users.username,
    examples.owner_id,
    examples.language,
    examples.title,
    examples.example,
    examples.date
    FROM     
    examples INNER JOIN users ON users.id = examples.owner_id;`
    )
    .then((result) => result.rows)
    .catch((error) => {
      console.log("Error at getAllExamples handler is :" + error);
    });
}

function createExample(example) {
  return db
    .query(
      "INSERT INTO examples(language, title, example) VALUES($1, $2, $3) RETURNING id",
      [example.language, example.title, example.example]
    )
    .then((result) => {
      console.log(result.row);
      return result.rows[0].id;
    })
    .catch((error) => {
      console.log("Error in model/examples.js, createExample()", error);
    });
}

function getExample(id) {
  return db
    .query("SELECT * FROM examples WHERE id=($1)", [id])
    .then((res) => res.rows[0]);
}

function updateExample(id, newdata) {
  return (
    db
      .query(
        "UPDATE examples SET language=($1), title=($2), example=($3) WHERE id =($4) RETURNING  *",
        [newdata.language, newdata.title, newdata.example, id]
      )
      //must update ALL VALUES otherwise any value not updated will return NULL
      .then((res) => res.rows[0])
  );
}

// function updateExamplebyID(id, newdata) {
//   // Setup static beginning of query
//   var query = ["UPDATE examples"];
//   query.push("SET");

//   // Create another array storing each set command
//   // and assigning a number value for parameterized query
//   var set = [];
//   Object.keys(newdata).forEach((key, i) => {
//     set.push(key + " = ($" + (i + 1) + ")");
//   });
//   query.push(set.join(", "));

//   // Add the WHERE statement to look up by id
//   query.push("WHERE id = " + id + " RETURNING *");

//   // Return a complete query string
//   return query.join(" ");
// }

module.exports = {
  getAllExamples,
  createExample,
  getExample,
  updateExample,
  //   updateExamplebyID,
};
