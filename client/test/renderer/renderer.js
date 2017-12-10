"use strict";

const mocha = require('mocha');
const assert = require("assert");


mocha.describe("Check 2+2", function() {
    mocha.it("it should be 4", function() {
        let res = 2+2;

        assert.equal(res, 4);
    });
});
