var expect = require("chai").expect;
var chartster = require("./index");

describe("chartster", function () {
  describe("test", function () {
    it("should return an array of strings", function () {
      expect(chartster.test).to.satisfy(isArrayOfStrings);

      function isArrayOfStrings(array) {
        return array.every(function (item) {
          return typeof item === "string";
        });
      }
    });
  });
});
