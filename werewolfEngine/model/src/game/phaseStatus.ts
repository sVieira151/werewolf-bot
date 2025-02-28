import Guid from "../utility/guid";
import IIdentifiable from "../utility/identifiable";
import { IStatus, StatusFactory } from "../utility/status";

export const DefaultPhaseStatusNames = {
  NOT_STARTED: "NotStarted",
  STARTED: "Started",
  ENDED: "Ended",
  ABANDONED: "Abandoned"
};

export class PhaseStatusFactory extends StatusFactory<PhaseStatus> {
  getStatusProducer(): new () => PhaseStatus {
    return PhaseStatus;
  }
}

export default class PhaseStatus implements IStatus, IIdentifiable<PhaseStatus> {
  id: Guid = new Guid();
  name: string =  DefaultPhaseStatusNames.NOT_STARTED
  createdDate?: Date;

  equals(other: PhaseStatus): boolean {
    if (!other)
      return false;
    return this.id.equals(other.id);      
  }
} 