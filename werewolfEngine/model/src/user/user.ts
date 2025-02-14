import Guid from "../utility/guid";

export default class User{
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