import PlayerStatus, { PlayerStatusAlive } from "./playerStatus";
import Role from "./role";
import User from "./user";

export default class Player{
  user: User;
  role: Role;
  status: PlayerStatus;
  constructor(_user: User, _role: Role, _status = new PlayerStatusAlive()){
    this.user = _user;
    this.role = _role;
    this.status = _status;
  }
}