const modelExample = require("../model/examples");

function getAllExamples(req, res, next) {
    modelExample
        .getAllExamples()
        .then(example => res.send(example))
        .catch(next);
    //You're frozen/glitchy    
}

function post(req, res, next) {
    console.log(req.body)
    const newExample = req.body;
    // console.log(req.users)
    // const userId = req.user.id;
    // newExample.owner_id = userId;
    modelExample
        .createExample(newExample)
        .then((example) => {
            console.log("handlers" + example)
            res.sendStatus(201).send(example);
        })
        .catch(next)
}

function getExample(req, res, next) {
    const id = req.params.id;
    modelExample
        .getExample(id)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(next);
}

module.exports = {
    getAllExamples,
    post,
    getExample
}