const modelExample = require("../model/examples");

function getAllExamples(req, res, next) {
    modelExample
        .getAllExamples()
        .then(example => res.send(example))
        .catch(next);
    //You're frozen/glitchy    
}

module.exports = {
    getAllExamples
}