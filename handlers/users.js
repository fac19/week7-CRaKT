const model = require("../model/users");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();

const secret = process.env.SECRET;

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
            user_id: userID,
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
        .catch(next)
    })
    .catch(console.error)
}

function login(req, res, next) {
  console.log(req.body.email, req.body.password);
  model.getUser(req.body.email)
    .then(dbUser => {
      console.log(dbUser);
      return bcrypt.compare(req.body.password, dbUser.user_password)
        .then(result => {
          if (!result) throw new Error("Bad password!");

          const claims = {
            user_id: dbUser.id,
            admin: dbUser.adminusr || false
          }
          const token = jwt.sign(claims, secret, {
            expiresIn: "24h"
          });
          res.send({
            "token": token
          });

        })
    })
    .catch(next)
}


module.exports = {
  post,
  login
};