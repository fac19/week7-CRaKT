const db = require("../db/connection.js");

function getAllExamples() {
  return db
    .query(
      `SELECT 
    users.username,
    examples.id,
    examples.owner_id,
    examples.language,
    examples.title,
    examples.example,
    examples.date
    FROM     
    examples INNER JOIN users ON users.id = examples.owner_id
    ORDER BY examples.date DESC;`
    )
    .then((result) => result.rows)
    .catch((error) => {
      console.log("Error at getAllExamples handler is :" + error);
    });
}

function createExample(example) {
  return db
    .query(
      "INSERT INTO examples(owner_id, language, title, example) VALUES($1, $2, $3, $4) RETURNING id",
      [example.user_id, example.language, example.title, example.example]
    )
    .then((result) => {
      return result.rows[0].id;
    })
    .catch((error) => {
      console.log("Error in model/examples.js, createExample()", error);
    });
}

function deleteExample(exampleId, user) {
  return getExample(exampleId)
  .then( exampleObjectFromDB => {
    if(exampleObjectFromDB.id === user.id || user.adminusr){
      return db.query("DELETE FROM examples WHERE id = ($1);", [exampleId])
          .then( result => true )
          .catch( err => {
            const error = new Error ('Delete query failed!' + err.message);
            error.status = 400;
            throw error;
          })
    } else {
          const error = new Error ("Only owner or admin can delete this.");
          error.status = 403;
          throw error;
      return false;
    }
  })
}

function getExample(id) {
  return db
    .query("SELECT * FROM examples WHERE id=($1)", [id])
    .then((res) => res.rows[0]);
}

 //must update ALL VALUES otherwise any value not updated will return NULL

// function updateExample(id, newdata) {
//   return (
//     db
//       .query(
//         "UPDATE examples SET language=($1), title=($2), example=($3) WHERE id =($4) RETURNING  *",
//         [newdata.language, newdata.title, newdata.example, id]
//       )
//      
//       .then((res) => res.rows[0])
//   );

// }

function updateExamplebyID(id, newdata, userId) {
    return getExample(id)
    .then(dbExample => {
    if(dbExample.id === userId){

        var query = ["UPDATE examples"];
        query.push("SET");
      
        // Create new array and store each set parameter
        // assign a number value for parameterized query
        const set = [];
        const values = [];
        Object.keys(newdata).forEach((key, i) => {
          set.push(key + "=($" + (i + 1) + ")");
          values.push(newdata[key]);
        });
        query.push(set.join(", "));
      
        // Add WHERE statement to look up by id
        query.push("WHERE id=" + id + " RETURNING *");
       
        // Return a complete query string
      //   console.log(query.join(" "))
      //   console.log(values)
      
        return db.query(query.join(" "), values)
        .then((res) => res.rows[0]);
      } else {
        const error = new Error("You do not own this example")
        error.status = 401;
        throw error;
    }
 })
}
  

module.exports = {
  getAllExamples,
  createExample,
  getExample,
//   updateExample,
  deleteExample,
  updateExamplebyID,
};
