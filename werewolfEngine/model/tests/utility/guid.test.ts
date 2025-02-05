import { describe, it } from "node:test";
import assert from "node:assert";
import Guid from "../../src/utility/guid";

describe("guid.equals()", () => {
  it("passed itself returns true", () => {
    const a = new Guid("test1234");
    assert.strictEqual(a.equals(a), true);
  })
  it("passed guid with same value returns true", () => {
    const a = new Guid("test1234");
    const b = new Guid("test1234");
    assert.strictEqual(a.equals(b), true);
  })
  it("passed guid with different value returns false", () => {
    const a = new Guid("test1234");
    const b = new Guid("test12345");
    assert.strictEqual(a.equals(b), false);
  })
  it("passed null returns false", () => {
    const a = new Guid("test1234");
    const b: Guid = null;
    assert.strictEqual(a.equals(b), false);
  })
  it("passed undefined returns false", () => {
    const a = new Guid("test1234");
    const b: Guid = undefined;
    assert.strictEqual(a.equals(b), false);
  })
})