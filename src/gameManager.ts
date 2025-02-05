import path from "path";
import fs from "fs";
import Game from "./model/game.js";
import HostQueue from "./model/hostQueue.js";
import Guid from "./model/guid.js";
import GameStatus from "./model/gameStatus.js";
import User from "./model/user.js";

const FILENAME = "gameManager.json";
const GAME_FILENAME = (game: string) => `${game}.json`;

class GameInfo{
  constructor(public id: Guid, public name: string, public status: GameStatus, public hostId?: Guid){}
  matchesName(name: string){
    return this.name.toLowerCase() === name.toLowerCase();
  }
}

export default class GameManager {   
  hosts: HostQueue;
  knownUsers: User[];
  gamesList: GameInfo[];
  private static dataPath: string;
  private static filePath: string;
  
  private constructor(){
    this.hosts = new HostQueue();
    this.gamesList = [];
    this.knownUsers = [];
  }

  static setDataPath(_dataPath: string){
    GameManager.dataPath = _dataPath;
    GameManager.filePath = path.join(this.dataPath, FILENAME);
  }

  static get(): GameManager{
    if (!GameManager.dataPath)
      throw Error("Must call setDataPath() before Get().");

    const gm = new GameManager();
    gm.import();
    return gm;
  }

  import(){
    if (!fs.existsSync(GameManager.filePath)){
      this.export();
      return;
    }
    const jsonData = JSON.parse(fs.readFileSync(GameManager.filePath, 'utf8'));
    this.hosts = jsonData.hosts;
    this.gamesList = jsonData.currentGames;
  }

  export(){
    fs.writeFileSync(GameManager.filePath, JSON.stringify(this, null, '\t'));
  }

  // loads the full game data from it's json file
  loadGameData(_id: Guid) : Game{
    let result: Game;
    const gamePath = path.join(GameManager.dataPath, "games", GAME_FILENAME(_id.value));
    if (!fs.existsSync(gamePath)){
      const info = this.gamesList.find(x => x.id.equals(_id));
      if (!info)
        throw Error(`Unable to load game data: No game with id ${_id} exists`);

      const host = this.knownUsers.find(x => x.id.equals(info.hostId));
      if (!host)
        throw Error(`Unable to load game data: No host with id ${info.hostId} exists`);
      
      // create game with game info and save to json
      result = new Game(info.name, host, _id, info.status);
      this.saveGameData(result);
    } else {
      result = JSON.parse(fs.readFileSync(gamePath, 'utf8'));
    }

    return result;
  }

  // saves the full game data to it's own json file
  saveGameData(_game: Game){
    const gamePath = path.join(GameManager.dataPath, "games", GAME_FILENAME(_game.id.value));    
    fs.writeFileSync(gamePath, JSON.stringify(this, null, '\t'));
  }

  // deletes the json game data stored on disk 
  deleteGameData(_id: Guid){
    const gamePath = path.join(GameManager.dataPath, "games", GAME_FILENAME(_id.value));
    if (fs.existsSync(gamePath)){
      fs.unlinkSync(gamePath);
      if (fs.existsSync(gamePath))
        throw Error(`Unable to delete game data: ${_id.value}`);
    } 
  }

  // creates a new game with the specified name and host. Saves game data 
  // and adds to the games list
  createNewGame(name: string, host: User): Game{
    // check if game with same already exists
    if (this.gamesList.some(x => x.matchesName(name)))
      throw Error(`Unable to create new game: game called ${name} already exists`);
    if (!this.hosts.contains(host))
      throw Error(`Unable to create new game: user ${host.userName} not in host queue`);

    // create the game and save it
    const result = new Game(name, host);
    this.saveGameData(result);

    // add to games list and add host if unknown
    this.gamesList.push(new GameInfo(result.id, result.name, result.status, host.id))
    this.registerUser(host);

    return result;
  }

  // removes teh game from the list and deletes the game data
  deleteGame(gameId: Guid){
    const index = this.gamesList.findIndex(x => x.id.equals(gameId));
    if (index < 0)
      throw Error(`Unable to delete game: game with id ${gameId} not found`);

    // remove game from list and disk
    const game = this.gamesList.splice(index, 1).pop();
    this.deleteGame(game.id);
  }

  

  // pushes a user into the known users list if they are not 
  // already into it
  private registerUser(user: User){
    if (!this.knownUsers.some(x => x.id.equals(user.id))){
      this.knownUsers.push(user);
    }
  }
}