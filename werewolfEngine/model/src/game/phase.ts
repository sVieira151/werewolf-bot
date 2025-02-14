import Guid from "../utility/guid.js";
import PhaseStatus, { PhaseStatusNotStarted } from "./phaseStatus.js";

export default abstract class Phase {  
  // fields
  id: Guid = new Guid(); 
  name: string;
  iteration: number;
  maxDurationMs: number;
  status: PhaseStatus = new PhaseStatusNotStarted();
  previousPhase?: Phase;
  nextPhase?: Phase;
  dateStarted?: Date;
  dateEnded?: Date;
}