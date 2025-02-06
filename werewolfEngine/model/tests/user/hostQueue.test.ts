import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import HostQueue from "../../src/user/hostQueue";
import User from "../../src/user/user";

let emptyQueue: HostQueue;
let preparedQueue: HostQueue;
let initialCount: number;
let usersList: User[];
let maxEntriesPerUser: number;

function generateTestUser(index: number): User{
  return new User(`testUser_${index}`, index); 
}

function generateUserList(numUsers: number): User[]{
  const users: User[] = [];
  for(let i=0; i<numUsers; i++){
    users.push(generateTestUser(i));
  }

  return users;
}

function setupStandard(){
  maxEntriesPerUser = Math.ceil(Math.random()*4 + 1);
  emptyQueue = new HostQueue(maxEntriesPerUser);
  usersList = generateUserList(5);
  preparedQueue = new HostQueue(maxEntriesPerUser, usersList);
  initialCount = preparedQueue.count;
}

// push
describe("hostQueue.push()", () => {
  beforeEach(()=> {
    setupStandard();
  })
  it("empty queue, passed new user, length is one", () => {
    emptyQueue.push(usersList[0]);
    assert.strictEqual(emptyQueue.count, 1);
  })
  it("empty queue, passed null, error thrown", () => {
    assert.throws(() => emptyQueue.push(null), Error);
  })
  it("empty queue, passed undefined, error thrown", () => {
    assert.throws(() => emptyQueue.push(undefined), Error);
  })
  it("non-empty queue, passed new user, length is one higher than before", () => {
    preparedQueue.push(generateTestUser(initialCount));
    assert.strictEqual(preparedQueue.count, initialCount + 1);
  })
  it("non-empty queue, passed existing max entries per user, error thrown", () => {
    assert.throws(() => {
      let i = 0;
      while(i<=maxEntriesPerUser){
        preparedQueue.push(usersList[0])
        i++;
      }
    }, Error);
  })
})

// pop
describe("hostQueue.pop()", (() => {
  beforeEach(()=> {
    setupStandard();
  })
  it("empty queue, returns undefined", () => {
    assert.strictEqual(emptyQueue.pop(), undefined);
  })
  it("empty queue, returns first user", () => {
    const expected = usersList[0];
    assert.strictEqual(preparedQueue.pop(), expected);
  })
}))

// contains
describe("hostQueue.contains()", (() => {
  beforeEach(()=> {
    setupStandard();
  })
  it("empty queue, passed user, returns false", () => {
    assert.strictEqual(emptyQueue.contains(usersList[0]), false);
  })
  it("empty queue, passed null, returns false", () => {
    assert.strictEqual(emptyQueue.contains(null), false);
  })
  it("empty queue, passed undefined, returns false", () => {
    assert.strictEqual(emptyQueue.contains(undefined), false);
  })
  it("non-empty queue, passed existing user, returns true", () => {
    assert.strictEqual(preparedQueue.contains(usersList[0]), true);
  })
  it("non-empty queue, passed non-existing user, returns false", () => {
    assert.strictEqual(preparedQueue.contains(generateTestUser(99)), false);
  })
  it("non-empty queue, passed null, throws error", () => {
    assert.throws(() => preparedQueue.contains(null), Error);
  })
  it("non-empty queue, passed undefined, throws error", () => {
    assert.throws(() => preparedQueue.contains(undefined), Error);
  })
}))

// getHostQueueNames
describe("hostQueue.getHostQueueNames()", (() => {
  beforeEach(()=> {
    setupStandard();
  })
}))

// remove
describe("hostQueue.remove()", (() => {
  beforeEach(()=> {
    setupStandard();
  })
}))