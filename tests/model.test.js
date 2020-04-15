const test = require("tape");
const build = require("../db/build");

const { createUser, getUsers } = require("../model/users");

test("tests are running!", (t) => {
  const x = 5;
  t.equal(x, 5, "this is working");
  t.end();
});

test("Can create new user", (t) => {
  build().then(() => {
    const user = {
      username: "Bob123",
      email: "bob@hello.com",
      password: "54321",
    };
    createUser(user).then(() => {
      getUsers()
        .then((res) => {
          t.equal(res[res.length - 1].username, "Bob123");
          t.equal(res.length, 6);
          t.end();
        })
        .catch((err) => {
          t.error(err);
          t.end();
        });
    });
  });
});
