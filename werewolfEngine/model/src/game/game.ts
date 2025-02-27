import Guid from "../utility/guid.js";
import Player from "./player.js";
import User from "../user/user.js";
import Phase from "./phase.js";
import PlayerAction from "./playerAction.js";
import GameStatus, { GameStatusFactory } from "./gameStatus.js";
import IIdentifiable from "../utility/identifiable.js";
import { StatusContainer } from "../utility/status.js";

export default class Game extends StatusContainer<GameStatus, GameStatusFactory> implements IIdentifiable<Game>{
  id: Guid = new Guid();
  name: string;
  host: User;
  status: GameStatus[] = [];
  players: Player[] = [];
  phases: Phase[] = [];
  playerActions: PlayerAction[] = []; 

  equals(other: Game): boolean {    
    if (!other)
      return false;
    return this.id.equals(other.id);  
  } 
}