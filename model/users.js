const db = require("../db/connection.js");

function createUser(user) {
  return db
    .query(
      "INSERT INTO users(username, email, user_password) VALUES($1, $2, $3)",
      [user.username, user.email, user.password]
    )
    .then((res) => res.rows);
}

function getUsers() {
  return db.query("SELECT * FROM users").then((res) => res.rows);
}

// function getUser(id)

module.exports = { createUser, getUsers };
