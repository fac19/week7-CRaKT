const model = require("../model/users");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const secret = process.env.JWT_SECRET;

function post(req, res, next) {
  const newUser = req.body;

  model
    .createUser(newUser)
    .then((user) => {
      const token = jwt.sign({ user: user.id }, secret, { expiresIn: "1h" });
      user.access_token = token;
      res.status(201).send(user);
    })
    //returns empty array. should be token?
    .catch(next);
}

module.exports = { post };
