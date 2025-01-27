import Guid from "./guid";
import Player from "./player";
import User from "./user";
import Phase from "./phase";
import PlayerAction from "./playerAction";

export default class Game{
  readonly id: Guid;
  host: User;
  players: Player[];
  phases: Phase[];
  playerActions: PlayerAction[];
}