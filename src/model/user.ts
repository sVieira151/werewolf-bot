export default class User{
  id: number;
  userName: string;
  constructor(_id: number, _userName: string){
    this.id = _id;
    this.userName = _userName;
  }
}