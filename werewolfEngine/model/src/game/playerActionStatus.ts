export default abstract class PlayerActionStatus {
  abstract print() : string;
} 

export class PlayerActionStatusNone extends PlayerActionStatus {
  print() { return "N/A" };
}
export class PlayerActionStatusSuccess extends PlayerActionStatus {
  print() { return "Success" };
}
export class PlayerActionStatusFailed extends PlayerActionStatus {
  print() { return "Fail" };
}
export class PlayerActionStatusBlocked extends PlayerActionStatus {
  print() { return "Blocked" };
}
export class PlayerActionStatusUndone extends PlayerActionStatus {
  print() { return "Undone" };
}