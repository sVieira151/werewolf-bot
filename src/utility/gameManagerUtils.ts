import fs from "fs";
import path from "path";
import GameManager from "../gameManager";

const FILENAME = "gameManager.json";

export function initialisePaths(_gm: GameManager, _basePath: string, _serverId: string){
  _gm.dataPath = path.join(_basePath, "data", _serverId);
  _gm.filePath = path.join(_gm.dataPath, FILENAME);
}

export function importGameManager(_gm: GameManager){
  // if the file doesn't exist, generate one and return
  if (!fs.existsSync(_gm.filePath))
    throw Error(`Unable to import Game Manager: no file to load at ${_gm.filePath}`);

  _gm = JSON.parse(fs.readFileSync(_gm.filePath, 'utf8'));
}

export function exportGameManager(_gm: GameManager){
  fs.writeFileSync(_gm.filePath, JSON.stringify(_gm, null, '\t'));
}  