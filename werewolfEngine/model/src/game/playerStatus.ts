export default abstract class PlayerStatus {
  createdDate: Date;
  constructor(){
    this.createdDate = new Date();
  }
  abstract print() : string;
} 

export class PlayerStatusAlive extends PlayerStatus {
  print() { return "Alive" };
}
export class PlayerStatusInjured extends PlayerStatus {
  print() { return "Injured" };
}
export class PlayerStatusDead extends PlayerStatus {
  print() { return "Dead" };
}
export class PlayerStatusUnknown extends PlayerStatus {
  print() { return "Unknown" };
}