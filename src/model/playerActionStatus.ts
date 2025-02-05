export default abstract class PlayerActionStatus {
  abstract print() : string;
} 

export class PlayerActionStatusNone implements PlayerActionStatus {
  print() { return "N/A" };
}
export class PlayerActionStatusSuccess implements PlayerActionStatus {
  print() { return "Success" };
}
export class PlayerActionStatusFailed implements PlayerActionStatus {
  print() { return "Fail" };
}
export class PlayerActionStatusBlocked implements PlayerActionStatus {
  print() { return "Blocked" };
}
export class PlayerActionStatusUndone implements PlayerActionStatus {
  print() { return "Undone" };
}