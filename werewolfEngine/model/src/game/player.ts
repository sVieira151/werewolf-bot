import PlayerStatus, { PlayerStatusAlive } from "./playerStatus.js";
import Role from "./role.js";
import User from "../user/user.js";
import IIdentifiable from "../utility/identifiable.js";
import Guid from "../utility/guid.js";

export default class Player implements IIdentifiable<Player>  {
  get id(): Guid { return this.user.id }; 
  constructor(readonly user: User, public role: Role, public status: PlayerStatus = new PlayerStatusAlive()){    
  }

  equals(other: Player): boolean {
    if (!other)
      return false;
    return this.user.id.equals(other.user.id);    
  }
}