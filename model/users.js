const db = require("../db/connection.js");

function createUser(user) {
  return db
    .query(
      "INSERT INTO users(username, email, user_password) VALUES($1, $2, $3);",
      [user.username, user.email, user.password]
    )
    .then((res) => res.rows);
}

function getUsers() {
  return db.query("SELECT * FROM users").then((res) => res.rows);
}

function getUser(email) {
  return db
    .query("SELECT * FROM users WHERE email = ($1);", [email])
    .then((res) => {
      console.log(res.rows)
      if (res.rows.length < 1) throw new Error("User does not exist");
      return res.rows[0];
    });
}

module.exports = {
  createUser,
  getUsers,
  getUser
};