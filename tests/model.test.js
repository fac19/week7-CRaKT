const build = require("../db/build")
const test = require("tape");

test("DB tests are running!", (t) => {
    const x = 5;
    t.equal(x, 5, "this is working");
    t.end();
  });
  