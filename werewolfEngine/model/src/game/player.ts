import PlayerStatus, { PlayerStatusAlive } from "./playerStatus.js";
import Role from "./role.js";
import User from "../user/user.js";

export default class Player{
  constructor(readonly user: User, public role: Role, public status: PlayerStatus = new PlayerStatusAlive()){    
  }
}