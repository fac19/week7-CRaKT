const build = require("../db/build");
const test = require("tape");
const request = require('supertest');

const {
  createUser,
  getUsers,
  getUser,
} = require("../model/users");

const {
  getExample
} = require('../model/examples')

test("DB tests are running!", (t) => {
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

test("Returns user with a given email address", (t) => {
  build().then(() => {
    getUser("admins@iscool.com")
      .then((res) => {
        t.equal(res.username, "admin");
        t.equal(res.adminusr, true);
        t.end();
      })
      .catch((err) => {
        t.error(err);
        t.end();
      });
  });
});

test('Can get an example by id', t => {
  build().then(() => {
    getExample(1)
      .then((res) => {
        // console.log(res)
        t.equal(res.language, 'js')
        t.equal(res.title, "Test example 1")
        t.equal(res.example, 'Example 1 code goes here.')
        t.end()
      })
      .catch((err) => {
        t.error(err);
        t.end();
      })
  });
})

// test("Returns error if no user found", (t) => {
//   build().then(() => {
//     t.throws(() => getUser("hello@iscool.com"))
//     t.end();
//   })
// });


// test("Does not allow duplicate users when email is already in use", (t) => {
//   build()
//     .then(() => {
//       const user = {
//         username: "Tommy",
//         email: "tom@iscool.com",
//         password:
//           "$2a$10$3IAfxI7ekmnHqMv1T8a46O./avVNcq/YYk6SGkRwxEHsy9cQasuUy",
//       };
//       createUser(user).then(() => {
//         getUsers().then((res) => {
//           console.log("hello");
//           t.equal(res[res.length - 1].username, "Roger");
//           t.equal(res.length, 5);
//           t.end();
//         });
//       });
//     })
//     .catch((err) => {
//       t.error(err);
//       t.end();
//     });
// });