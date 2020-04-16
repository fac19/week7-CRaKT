const modelExample = require("../model/examples");

function getAllExamples(req, res, next) {
  modelExample
    .getAllExamples()
    .then((example) => res.send(example))
    .catch(next);
  //You're frozen/glitchy
}

// Inserts a new example into the examples table and returns the inserted row's id
function post(req, res, next) {
  console.log("NEW POST:", req.body);
  req.body.user_id = req.user.user_id;
  req.body.admin = req.user.admin;
  modelExample
    .createExample(req.body)
    .then((exampleId) => {
      res.status(201).send({ exampleId: exampleId });
    })
    .catch(next);
}

module.exports = {
  getAllExamples,
  post,
};
