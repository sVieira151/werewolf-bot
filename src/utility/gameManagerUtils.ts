import fs from "fs";
import path from "path";
import GameManager from "../gameManager";

const FILENAME = "gameManager.json";

export function initialisePaths(_gm: GameManager, _basePath: string){
  try{
    _gm.dataPath = path.join(_basePath, "data", _gm.serverId);
    if (!fs.existsSync(_gm.dataPath))
      fs.mkdirSync(_gm.dataPath);
  
    _gm.filePath = path.join(_gm.dataPath, FILENAME);
  } catch (err) {
    throw new GameManagerInitPathsError(err);
  }
}

export function importGameManager(_gm: GameManager){
  // if the file doesn't exist, generate one and return
  if (!fs.existsSync(_gm.filePath))
    throw new GameManagerImportError(`File not found: '${_gm.filePath}'`);
 
  try{
    _gm = JSON.parse(fs.readFileSync(_gm.filePath, 'utf8'));
  } catch (err) {
    throw new GameManagerImportError(err);
  }
}

export function exportGameManager(_gm: GameManager){
  try{
    fs.writeFileSync(_gm.filePath, JSON.stringify(_gm, null, '\t'));
  } catch (err) {
    throw new GameManagerExportError(err);
  }
}  

export class GameManagerImportError extends Error{
  constructor(message: string){
    super(message);
  }
}

export class GameManagerExportError extends Error{
  constructor(message: string){
    super(message);
  }
}

export class GameManagerInitPathsError extends Error{
  constructor(message: string){
    super(message);
  }
}