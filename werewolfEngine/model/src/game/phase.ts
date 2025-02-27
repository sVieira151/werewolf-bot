import Guid from "../utility/guid.js";
import IIdentifiable from "../utility/identifiable.js";
import { StatusContainer } from "../utility/status.js";
import PhaseStatus, { PhaseStatusFactory } from "./phaseStatus.js";

export default class Phase extends StatusContainer<PhaseStatus, PhaseStatusFactory> implements IIdentifiable<Phase> {  
  // fields
  id: Guid = new Guid(); 
  name: string;
  iteration: number;
  maxDurationMs: number;
  statusHistory: PhaseStatus[] = [];
  previousPhase?: Phase;
  nextPhase?: Phase;
  dateStarted?: Date;
  dateEnded?: Date;
  get phaseDurationInMs(): number {
    const start = this.dateStarted ? this.dateStarted.getTime() : Date.now() + 1 ;
    const end = this.dateEnded ? this.dateEnded.getTime() : Date.now();
    return end - start;
  }

  equals(other: Phase): boolean {    
    if (!other)
      return false;
    return this.id.equals(other.id);  
  }  
}