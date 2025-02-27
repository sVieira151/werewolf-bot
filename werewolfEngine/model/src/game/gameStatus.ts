import Guid from "../utility/guid";
import IIdentifiable from "../utility/identifiable";
import { IStatus, StatusFactory } from "../utility/status";

export const DefaultGameStatusNames = {
  NOT_STARTED: "NotStarted",
  SIGNUP: "Signup",
  STARTED: "Started",
  ENDED: "Ended",
  ABANDONED: "Abandoned"
};

export class GameStatusFactory extends StatusFactory<GameStatus> {}

export default class GameStatus implements IStatus, IIdentifiable<GameStatus> {
  id: Guid = new Guid();
  name: string =  DefaultGameStatusNames.NOT_STARTED
  createdDate?: Date;

  equals(other: GameStatus): boolean {
    if (!other)
      return false;
    return this.id.equals(other.id);      
  }
} 