import PlayerStatus, { PlayerStatusAlive } from "./playerStatus";
import Role from "./role";
import User from "./user";

export default class Player{
  role: Role;
  status: PlayerStatus;
  constructor( readonly user: User, _role: Role, _status = new PlayerStatusAlive()){
    this.role = _role;
    this.status = _status;
  }
}