import Guid from "../utility/guid";
import IIdentifiable from "../utility/identifiable";

export default class User implements IIdentifiable<User>{
  id: Guid;
  userName: string;
  avatarId: number;
  constructor(_userName: string, _avatarId: number){
    this.id = new Guid();
    this.userName = _userName;
    this.avatarId = _avatarId;
  }

  equals(other: User){
    if (!other)
      return false;
    return this.id.equals(other.id);
  }
}