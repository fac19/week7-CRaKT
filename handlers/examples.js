const modelExample = require("../model/examples");

function getAllExamples(req, res, next) {
  modelExample
    .getAllExamples()
    .then((example) => res.send(example))
    .catch(next);
}

// Inserts a new example into the examples table and returns the inserted row's id
function post(req, res, next) {
  console.log("NEW POST:", req.body);
  req.body.user_id = req.user.user_id;
  req.body.admin = req.user.admin;
  modelExample
    .createExample(req.body)
    .then((exampleId) => {
      res.status(201).send({
        exampleId: exampleId,
      });
    })
    .catch(next);
}

function getExample(req, res, next) {
  const id = req.params.id;
  modelExample
    .getExample(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch(next);
}

// function updateExample()

module.exports = {
  getAllExamples,
  post,
  getExample,
};
