import Guid from "./guid";

export default class User{
  readonly id: Guid;
  userName: string;
  avatarId: number;
  constructor(_userName: string, _avatarId: number){
    this.id = new Guid();
    this.userName = _userName;
    this.avatarId = _avatarId;
  }
}