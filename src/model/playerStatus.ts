export default abstract class PlayerStatus {
  abstract print() : string;
} 

export class PlayerStatusAlive implements PlayerStatus {
  print() { return "Alive!" };
}
export class PlayerStatusLynched implements PlayerStatus {
  print() { return "Lynched!" };
}
export class PlayerStatusKilled implements PlayerStatus {
  print() { return "Killed!" };
}
export class PlayerStatusUnknown implements PlayerStatus {
  print() { return "Unknown?!" };
}