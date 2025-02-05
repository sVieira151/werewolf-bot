import { describe, it } from "node:test";
import assert from "node:assert";
import Guid from "../../src/utility/guid";

describe("guid.equals()", () => {
  it("should return true if two guids have the same value - 'test1234'", () => {
    const a = new Guid("test1234");
    const b = new Guid("test1234");
    assert.strictEqual(a.equals(b), true);
  })
})