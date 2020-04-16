const supertest = require("supertest");
const test = require("tape");
const server = require("../server");
const build = require("../db/build");

test("Route tests are running!", (t) => {
  const x = 5;
  t.equal(x, 5, "this is working");
  t.end();
});

test("Test main route returns 200", t => {
  build()
    .then(() => {
      supertest(server)
        .get("/")
        .expect(200)
        .expect("content-type", "application/json; charset=utf-8")
        .end((err, res) => {
          t.error(err, "HTTP status is 200 and application/json; charset=utf-8");
          t.equals(res.text.includes("Kat"), true, "Kat should be present");
          t.equals(res.text.includes("Test example 4"), true, "example title should be present");
          t.equals(res.text.includes("Example 1 code goes here."), true, "example text should be present");
          t.end();
        })
    })
})