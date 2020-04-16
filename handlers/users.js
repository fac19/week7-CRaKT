const model = require("../model/users");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();

const secret = process.env.JWT_SECRET;

function post(req, res, next) {
  if (!req.body) {
    throw new Error('Error: no request body')
  }

  const newUserEmail = req.body.email;
  const newUserName = req.body.username;
  const rawPassword = req.body.password

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(rawPassword, salt))
    .then(cookedPassword => {
      const newUser = {
        email: newUserEmail,
        username: newUserName,
        password: cookedPassword
      }
      model
        .createUser(newUser)
        .then((userID) => {
          const token = jwt.sign({
            user: userID,
            admin: false
          }, secret, {
            expiresIn: "1h"
          });
          res.status(201).send({
            username: newUserName,
            email: newUserEmail,
            "token": token
          });
        })
        //returns empty array. should be token?
        .catch(next)
    })
    .catch(console.error)
}

module.exports = {
  post
};