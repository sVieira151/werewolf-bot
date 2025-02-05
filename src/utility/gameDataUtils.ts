import path from "path";
import fs from "fs";
import Game from "../model/game";
import Guid from "../model/guid";

const GAME_FILENAME = (game: string) => `${game}.json`;

// loads the full game data from it's json file. Returns undefined if unable to load
export function loadGameData(directoryPath: string, _id: Guid) : Game{
  let result: Game;
  const gamePath = path.join(directoryPath, "games", GAME_FILENAME(_id.value));
  if (fs.existsSync(gamePath)){
    result = JSON.parse(fs.readFileSync(gamePath, 'utf8'));
  }

  return result;
}

// saves the full game data to it's own json file
export function saveGameData(directoryPath: string, _game: Game){
  const gamePath = path.join(directoryPath, "games", GAME_FILENAME(_game.id.value));    
  fs.writeFileSync(gamePath, JSON.stringify(this, null, '\t'));
  if (!fs.existsSync(gamePath))
    throw Error(`Unable to save game data: ${_game.id.value}`);
}

// deletes the json game data stored on disk 
export function deleteGameData(directoryPath: string, _id: Guid){
  const gamePath = path.join(directoryPath, "games", GAME_FILENAME(_id.value));
  if (fs.existsSync(gamePath)){
    fs.unlinkSync(gamePath);
    if (fs.existsSync(gamePath))
      throw Error(`Unable to delete game data: ${_id.value}`);
  } 
}