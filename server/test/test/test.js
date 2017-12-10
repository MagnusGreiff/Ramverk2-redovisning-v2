"use strict";

const mocha = require('mocha');
const assert = require("assert");

const test = require("../../testing");

mocha.describe("Check 2+2", function() {
    mocha.it("it should be 4", function() {
        let res = 2+2;

        assert.equal(res, 4);
    });
});


mocha.describe("Check if function returns hello", function() {
    mocha.it("it should be 'hello'", function() {
        let test1 = test.hello();

        assert.equal(test1, "hello");
    });
});
