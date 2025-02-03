import Guid from "./guid.js";
import Player from "./player.js";
import User from "./user.js";
import Phase from "./phase.js";
import PlayerAction from "./playerAction.js";

export default class Game{
  readonly id: Guid;
  name: string;
  host: User;
  players: Player[];
  phases: Phase[];
  playerActions: PlayerAction[];
}