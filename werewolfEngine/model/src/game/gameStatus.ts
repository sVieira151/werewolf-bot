export default abstract class GameStatus {
  abstract print() : string;
} 

export class GameStatusSetup extends GameStatus {
  print() { return "Setup" };
}
export class GameStatusSignup extends GameStatus {
  print() { return "Signup" };
}
export class GameStatusInProgress extends GameStatus {
  print() { return "In Progress" };
}
export class GameStatusCompleted extends GameStatus {
  print() { return "Completed" };
}
export class GameStatusAbandoned extends GameStatus {
  print() { return "Abandoned" };
}