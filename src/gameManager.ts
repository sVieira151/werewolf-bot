import path from "path";
import fs from "fs";
import Game from "./model/game.js";
import HostQueue from "./model/hostQueue.js";

const FILENAME = "gameManager.json";
//const GAME_FILENAME = (game: string) => `${game}.json`;

export default class GameManager {   
  hosts: HostQueue;
  currentGames: Game[];
  private static dataPath: string;
  private static filePath: string;
  
  private constructor(){
    this.hosts = new HostQueue();
    this.currentGames = [];
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
    this.currentGames = jsonData.currentGames;
  }

  export(){
    fs.writeFileSync(GameManager.filePath, JSON.stringify(this, null, '\t'));
  }
}