import Guid from "../utility/guid.js";
import Player from "./player.js";
import User from "../user/user.js";
import Phase from "./phase.js";
import PlayerAction from "./playerAction.js";
import GameStatus, { GameStatusSetup } from "./gameStatus.js";

export default class Game{
  id: Guid = new Guid();
  name: string;
  host: User;
  status: GameStatus = new GameStatusSetup();
  players: Player[] = [];
  phases: Phase[] = [];
  playerActions: PlayerAction[] = [];
}