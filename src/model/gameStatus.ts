export default abstract class GameStatus {
  abstract print() : string;
} 

export class GameStatusSetup implements GameStatus {
  print() { return "Setup" };
}
export class GameStatusSignup implements GameStatus {
  print() { return "Signup" };
}
export class GameStatusInProgress implements GameStatus {
  print() { return "In Progress" };
}
export class GameStatusCompleted implements GameStatus {
  print() { return "Completed" };
}
export class GameStatusAbandoned implements GameStatus {
  print() { return "Abandoned" };
}