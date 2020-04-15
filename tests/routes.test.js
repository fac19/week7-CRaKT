const supertest = require("supertest");
const test = require("tape");
const server = require("../server");
const build = require("../db/build")

test("Route tests are running!", (t) => {
  const x = 5;
  t.equal(x, 5, "Route tests are running");
  t.end();
});

test("Test main route returns 200", t => {
  build()
    .then( _ => {
      supertest(server)
        .get("/")
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end((err, res) => {
          t.error(err, "HTTP code is 200 OK");
          t.equal(typeof res.body, typeof {}, "Route returns an object.");
          t.equal(res.text.includes("Example 1 code goes here"), true);
          t.equal(res.text.includes("Example 4 code goes here"), true);
          t.equal(res.text.includes("Chloe"), true, "Owner name in output");
          t.end();
        });
    });
});