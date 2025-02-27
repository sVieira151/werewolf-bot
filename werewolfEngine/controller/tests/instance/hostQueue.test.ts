import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import HostQueue from "../../src/instance/hostQueue";
import User from "../../../model/src/user/user";

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

function setupStandard(_numUsers: number = 5, _maxEntriesPerUser: number = 4){
  maxEntriesPerUser = Math.floor(Math.random()*_maxEntriesPerUser + 1);
  emptyQueue = new HostQueue(maxEntriesPerUser);
  usersList = generateUserList(_numUsers);
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
      while(i<=maxEntriesPerUser+1){
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
  let preparedUserCount: number;
  beforeEach(()=> {
    preparedUserCount = Math.floor(Math.random()*8 + 1);
    setupStandard(preparedUserCount);
  })
  it("empty queue, returns array of length 0", () => {
    assert.deepStrictEqual(emptyQueue.getHostQueueNames().length, 0);
  })
  it("non-empty queue, returns array with length that matches user count", () => {
    assert.deepStrictEqual(preparedQueue.getHostQueueNames().length, preparedUserCount);
  })
}))

// remove
describe("hostQueue.remove()", (() => {
  beforeEach(()=> {
    setupStandard();
  })
  it ("empty queue, passed positive index, doesn't throw & queue remains empty", ()=> {    
    assert.doesNotThrow(() => emptyQueue.remove(1));
    assert.strictEqual(emptyQueue.count, 0);
  })
  it ("empty queue, passed negative index, doesn't throw & queue remains empty", ()=> {    
    assert.doesNotThrow(() => emptyQueue.remove(-6));
    assert.strictEqual(emptyQueue.count, 0);
  })
  it ("empty queue, passed null, doesn't throw & queue remains empty", ()=> {    
    assert.doesNotThrow(() => emptyQueue.remove(null));
    assert.strictEqual(emptyQueue.count, 0);
  })
  it ("empty queue, passed undefined, doesn't throw & queue remains empty", ()=> {    
    assert.doesNotThrow(() => emptyQueue.remove(undefined));
    assert.strictEqual(emptyQueue.count, 0);
  })
  it ("non-empty queue, passed a valid index, queue count is one fewer than at start", ()=> {    
    const expected = preparedQueue.count;
    assert.doesNotThrow(() => preparedQueue.remove(0));
    assert.strictEqual(preparedQueue.count, expected - 1);
  })
  it ("non-empty queue, passed a valid index, queue count is one fewer than at start", ()=> {    
    const expected = preparedQueue.count;
    assert.doesNotThrow(() => preparedQueue.remove(0));
    assert.strictEqual(preparedQueue.count, expected - 1);
  })
  it ("non-empty queue, passed invalid positive index, doesn't throw & queue remains same size", ()=> {     
    const expected = preparedQueue.count;  
    assert.doesNotThrow(() => preparedQueue.remove(1564));
    assert.strictEqual(preparedQueue.count, expected);
  })
  it ("non-empty queue, passed negative index, doesn't throw & queue remains same size", ()=> {     
    const expected = preparedQueue.count;  
    assert.doesNotThrow(() => preparedQueue.remove(-6));
    assert.strictEqual(preparedQueue.count, expected);
  })
  it ("non-empty queue, passed null, doesn't throw & queue remains same size", ()=> {    
    const expected = preparedQueue.count;  
    assert.doesNotThrow(() => preparedQueue.remove(null));
    assert.strictEqual(preparedQueue.count, expected);
  })
  it ("non-empty queue, passed undefined, doesn't throw & queue remains same size", ()=> {  
    const expected = preparedQueue.count;    
    assert.doesNotThrow(() => preparedQueue.remove(undefined));
    assert.strictEqual(preparedQueue.count, expected);
  })
}))