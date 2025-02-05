export default abstract class PlayerStatus {
  abstract print() : string;
} 

export class PlayerStatusAlive implements PlayerStatus {
  print() { return "Alive" };
}
export class PlayerStatusInjured implements PlayerStatus {
  print() { return "Injured" };
}
export class PlayerStatusDead implements PlayerStatus {
  print() { return "Dead" };
}
export class PlayerStatusUnknown implements PlayerStatus {
  print() { return "Unknown" };
}