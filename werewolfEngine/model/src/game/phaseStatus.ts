export default abstract class PhaseStatus {
  createdDate: Date;
  constructor(){
    this.createdDate = new Date();
  }
  abstract print() : string;
  abstract get phaseDuration(): number;
} 

export class PhaseStatusNotStarted extends PhaseStatus {
  print() { return "Not Started" };
  get phaseDuration(): number {
    return -1;
  }
}
export class PhaseStatusStarted extends PhaseStatus {
  print() { return "Started" };
  get phaseDuration(): number {
    return Date.now() - this.createdDate.getTime();
  }
}
export class PhaseStatusEnded extends PhaseStatus {
  constructor(readonly phaseStartDate: Date){
    super();
  }
  print() { return "Ended" };
  get phaseDuration(): number {
    return this.createdDate.getTime() - this.phaseStartDate.getTime();
  }
}