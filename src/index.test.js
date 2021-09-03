import { expect } from "chai";
import { test } from "./index";

describe("chartster", function () {
  describe("test", function () {
    it("should return an array of strings", function () {
      expect(test).to.satisfy(isArrayOfStrings);

      function isArrayOfStrings(array) {
        return array.every(function (item) {
          return typeof item === "string";
        });
      }
    });
  });
});
