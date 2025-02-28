import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import User from "../../../model/src/user/user";
import GameController from "../../src/game/gameController";

const gameName: string = "Test";
let host: User;
let signupsGame: GameController;
let startedGame: GameController;
let endedGame: GameController;
let abandonedGame: GameController;

function standardSetup(){  
  host = new User("TestUser", 0);

  signupsGame = GameController.Create(`${gameName} Signups`, host);
  signupsGame.acceptSignups();
  startedGame = GameController.Create(`${gameName} Started`, host);
  startedGame.acceptSignups();
  startedGame.start();
  endedGame = GameController.Create(`${gameName} Ended`, host);
  endedGame.acceptSignups();
  endedGame.start();
  endedGame.end();
  abandonedGame = GameController.Create(`${gameName} Abandoned`, host);
  abandonedGame.acceptSignups();
  abandonedGame.start();
  abandonedGame.abandon();
}

describe("GameController.acceptSignups()", ()=>{
  beforeEach(standardSetup);
  it("game not started, returns current time", ()=>{
    const game = GameController.Create(gameName, host);
    assert.strictEqual(game.acceptSignups(), Date.now());
  })
  it("game accepting signups, returns -1", ()=>{
    const game = signupsGame;
    assert.strictEqual(game.acceptSignups(), -1);
  })
  it("game started, returns -1", ()=>{
    const game = startedGame;
    assert.strictEqual(game.acceptSignups(), -1);    
  })
  it("game ended, returns -1", ()=>{
    const game = endedGame;
    assert.strictEqual(game.acceptSignups(), -1);    
  })
  it("game abandoned, returns -1", ()=>{
    const game = abandonedGame;
    assert.strictEqual(game.acceptSignups(), -1);    
  })
})

describe("GameController.start()", ()=>{
  beforeEach(standardSetup);
  it("game not started, returns -1", ()=>{
    const game = GameController.Create(gameName, host);
    assert.strictEqual(game.start(), -1);
  })
  it("game accepting signups, returns current time", ()=>{
    const game = signupsGame;
    assert.strictEqual(game.start(), Date.now());
  })
  it("game started, returns -1", ()=>{
    const game = startedGame;
    assert.strictEqual(game.start(), -1);    
  })
  it("game ended, returns -1", ()=>{
    const game = endedGame;
    assert.strictEqual(game.start(), -1);    
  })
  it("game abandoned, returns -1", ()=>{
    const game = abandonedGame;
    assert.strictEqual(game.start(), -1);    
  })
})

describe("GameController.end()", ()=>{
  beforeEach(standardSetup);
  it("game not started, returns -1", ()=>{
    const game = GameController.Create(gameName, host);
    assert.strictEqual(game.end(), -1);
  })
  it("game accepting signups, returns -1", ()=>{
    const game = signupsGame;
    assert.strictEqual(game.end(), -1);
  })
  it("game started, returns current time", ()=>{
    const game = startedGame;
    assert.strictEqual(game.end(), Date.now());    
  })
  it("game ended, returns -1", ()=>{
    const game = endedGame;
    assert.strictEqual(game.end(), -1);    
  })
  it("game abandoned, returns -1", ()=>{
    const game = abandonedGame;
    assert.strictEqual(game.end(), -1);    
  })
})

describe("GameController.abandon()", ()=>{
  beforeEach(standardSetup);
  it("game not started, returns current time", ()=>{
    const game = GameController.Create(gameName, host);
    assert.strictEqual(game.abandon(), Date.now());
  })
  it("game accepting signups, returns current time", ()=>{
    const game = signupsGame;
    assert.strictEqual(game.abandon(), Date.now());
  })
  it("game started, returns current time", ()=>{
    const game = startedGame;
    assert.strictEqual(game.abandon(), Date.now());    
  })
  it("game ended, returns -1", ()=>{
    const game = endedGame;
    assert.strictEqual(game.abandon(), -1);    
  })
  it("game abandoned, returns -1", ()=>{
    const game = abandonedGame;
    assert.strictEqual(game.abandon(), -1);    
  })
})