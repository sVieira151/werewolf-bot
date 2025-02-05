import PlayerStatus, { PlayerStatusAlive } from "./playerStatus.js";
import Role from "./role.js";
import User from "./user.js";

export default class Player{
  role: Role;
  status: PlayerStatus;
  constructor( readonly user: User, _role: Role, _status = new PlayerStatusAlive()){
    this.role = _role;
    this.status = _status;
  }
}