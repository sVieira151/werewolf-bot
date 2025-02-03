import path from "path";
import fs from "fs";
import Game from "./model/game.js";
import HostQueue from "./model/hostQueue.js";

const FILENAME = "gameManager.json";
const GAME_FILENAME = (game: string) => `${game}.json`;

export default class GameManager {   
  hosts: HostQueue;
  currentGames: Game[];
  private readonly dataPath: string;
  private readonly filePath: string;
  
  private constructor(dataPath: string){
    this.dataPath = dataPath;
    this.filePath = path.join(this.dataPath, FILENAME);
    this.hosts = new HostQueue();
    this.currentGames = [];
  }

  static Load(dataPath: string): GameManager{
    var result: GameManager = new GameManager(dataPath);
    result.read();
    return result;
  }

  Unload(){
    // in this case all we need to do is write to file
    this.write();    
  }

  private read(){
    if (!fs.existsSync(this.filePath)){
      fs.writeFileSync(this.filePath, JSON.stringify(this));
      return;
    }
    let jsonData = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    console.log(jsonData);
  }

  private write(){    
    fs.writeFileSync(this.filePath, JSON.stringify(this));
  }
}