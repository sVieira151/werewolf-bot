import HostQueue from "./hostQueue.js";
import Guid from "../../../model/src/utility/guid.js";
import GameStatus from "../../../model/src/game/gameStatus.js";
import User from "../../../model/src/user/user.js";
import { deleteGameData, loadGameData, saveGameData } from "./gameDataUtils.js";
import { exportGameManager, GameManagerImportError, importGameManager, initialisePaths } from "./instanceManagerUtils.js";
import GameController from "../game/gameController.js";

class GameInfo{
  constructor(public id: Guid, public name: string, public statusHistory: GameStatus[], public hostId?: Guid){}
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
  
  private constructor(public serverId: string){
    this.hosts = new HostQueue();
    this.gamesList = [];
    this.knownUsers = [];
  }  

  // gets an instance of GameManager for the specified serverId. If no
  // file exists to import, a new one is generated 
  static import(_dir: string, _serverId: string): GameManager{
    const gm = new GameManager(_serverId);
    try{
      initialisePaths(gm, _dir);
      importGameManager(gm);
      console.log(`Imported GameManager for server: ${_serverId}`)
    } catch (err) {
      if (err instanceof GameManagerImportError){
        console.log(`Unable to import. Generating file for GameManager for server: ${_serverId}`)
        exportGameManager(gm);
      } else if (err instanceof Error){
        throw err;
      }
    }
    console.log(gm);
    return gm;
  }  

  // exports the data of the specified GameManager to disk
  static export(_gm: GameManager){    
    try{      
      exportGameManager((_gm))
      console.log(`Exported GameManager for server: ${_gm.serverId}`)
    } catch (err) {
      if (err instanceof Error){
        console.log(`Unable to export GameManager for server: ${_gm.serverId}`)
      } else {
        throw err;
      }
    }
  }

  // creates a new game with the specified name and host. Saves game data 
  // and adds to the games list
  createNewGame(name: string, host: User): GameController{
    // check if game with same already exists
    if (this.gamesList.some(x => x.matchesName(name)))
      throw Error(`Unable to create new game: game called ${name} already exists`);
    if (!this.hosts.contains(host))
      throw Error(`Unable to create new game: user ${host.userName} not in host queue`);

    // create the game and save it
    const result = GameController.Create(name, host);
    saveGameData(this.dataPath, result.game);

    // add to games list and add host if unknown
    this.gamesList.push(new GameInfo(result.game.id, result.game.name, result.game.status, host.id))
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
  loadGame(gameId: Guid): GameController{
    const info = this.gamesList.find(x => x.id.equals(gameId));
    if (!info)
      throw Error(`Unable to load game: game with id ${gameId} not found`);

    return new GameController(loadGameData(this.dataPath, info.id));
  }

  // saves the game data to disk. Throws error if no game in games list matches
  // the provided id
  saveGame(gameController: GameController){
    const index = this.gamesList.findIndex(x => x.id.equals(gameController.game.id));
    if (index < 0)
      throw Error(`Unable to save game: game with id ${gameController.game.id} not found in games list`);

    saveGameData(this.dataPath, gameController.game);
  }

  // pushes a user into the known users list if they are not 
  // already into it
  private registerUser(user: User){
    if (!this.knownUsers.some(x => x.id.equals(user.id))){
      this.knownUsers.push(user);
    }
  }
}