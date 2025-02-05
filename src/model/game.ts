import Guid from "./guid.js";
import Player from "./player.js";
import User from "./user.js";
import Phase from "./phase.js";
import PlayerAction from "./playerAction.js";
import GameStatus, { GameStatusSetup } from "./gameStatus.js";

export default class Game{
  id: Guid;
  name: string;
  status: GameStatus;
  host: User;
  players: Player[];
  phases: Phase[];
  playerActions: PlayerAction[];
  constructor(name: string, host: User, id?: Guid, status?: GameStatus){
    this.id = id ?? new Guid();
    this.name = name;
    this.host = host;
    this.status = status ?? new GameStatusSetup();
    this.players = [];
    this.phases = [];
    this.playerActions = [];
  }
}