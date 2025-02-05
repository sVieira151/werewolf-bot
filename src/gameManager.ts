import Game from "./model/game.js";
import HostQueue from "./model/hostQueue.js";
import Guid from "./model/guid.js";
import GameStatus from "./model/gameStatus.js";
import User from "./model/user.js";
import { deleteGameData, loadGameData, saveGameData } from "./utility/gameDataUtils.js";
import { exportGameManager, importGameManager, initialisePaths } from "./utility/gameManagerUtils.js";

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
  dataPath: string;
  filePath: string;
  
  private constructor(){
    this.hosts = new HostQueue();
    this.gamesList = [];
    this.knownUsers = [];
  }  

  static get(_dir: string, _serverId: string): GameManager{
    const gm = new GameManager();
    initialisePaths(gm, _dir, _serverId);
    try{
      importGameManager(gm);
    } catch {
      exportGameManager(gm);
    }
    console.log(gm);
    return gm;
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
    saveGameData(this.dataPath, result);

    // add to games list and add host if unknown
    this.gamesList.push(new GameInfo(result.id, result.name, result.status, host.id))
    this.registerUser(host);

    return result;
  }

  // removes the game from the list and deletes the game data
  deleteGame(gameId: Guid){
    const index = this.gamesList.findIndex(x => x.id.equals(gameId));
    if (index < 0)
      throw Error(`Unable to delete game: game with id ${gameId} not found`);

    // remove game from list and disk
    const game = this.gamesList.splice(index, 1).pop();
    deleteGameData(this.dataPath, game.id);
  }

  // loads the game data of a game in the games list from disk and returns it. Throws error
  // if no game in the games list matches the id
  loadGame(gameId: Guid): Game{
    const info = this.gamesList.find(x => x.id.equals(gameId));
    if (!info)
      throw Error(`Unable to load game: game with id ${gameId} not found`);

    return loadGameData(this.dataPath, info.id);
  }

  // saves the game data to disk. Throws error if no game in games list matches
  // the provided id
  saveGame(game: Game){
    const index = this.gamesList.findIndex(x => x.id.equals(game.id));
    if (index < 0)
      throw Error(`Unable to save game: game with id ${game.id} not found in games list`);

    saveGameData(this.dataPath, game);
  }

  // pushes a user into the known users list if they are not 
  // already into it
  private registerUser(user: User){
    if (!this.knownUsers.some(x => x.id.equals(user.id))){
      this.knownUsers.push(user);
    }
  }
}