const supertest = require("supertest");
const test = require("tape");
const server = require("../server");

test("Route tests are running!", (t) => {
    const x = 5;
    t.equal(x, 5, "this is working");
    t.end();
});

test("Test main route returns 200", t => {
    supertest(server)
        .get("/")
        .expect(200)
        .end( (err,res) => {
            t.error(err);
            t.end();
        })
})
