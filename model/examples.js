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

// function getExampleById(id) {
//   return db
//     .query("SELECT * FROM examples WHERE id = ($1);", [id])
//     .then( result => result.rows[0] );
// }

function deleteExample(exampleId, userId) {
  return getExample(exampleId)
  .then( exampleObjectFromDB => {
    console.log("exampleObjectFromDB:", exampleObjectFromDB);
    if(exampleObjectFromDB.id === userId){
      return db.query("DELETE FROM examples WHERE id = ($1);", [exampleId])
          .then( result => true )
          .catch( (error) => new Error ('PROBLEM DELETING!') )
    } else {
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
    return false
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
