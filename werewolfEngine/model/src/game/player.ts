import PlayerStatus, { PlayerStatusAlive } from "./playerStatus.js";
import Role from "./role.js";
import User from "../user/user.js";

export default class Player{
  constructor(readonly user: User, public role: Role, public status: PlayerStatus = new PlayerStatusAlive()){    
  }

  // returns true if the user id matches the other user id, returns false otherwise
  equals(other: User): boolean{
    if (!other)
      return false;
    return this.user.id.equals(other.id);
  }
}