export default abstract class PhaseStatus {
  public createdDate: Date;
  abstract print() : string;
  abstract get phaseDuration(): number;
} 

export class PhaseStatusNotStarted implements PhaseStatus {
  public createdDate: Date;
  constructor(){
    this.createdDate = new Date();
  }
  print() { return "Not Started" };
  get phaseDuration(): number {
    return -1;
  }
}
export class PhaseStatusStarted implements PhaseStatus {
  public createdDate: Date;
  constructor(){
    this.createdDate = new Date();
  }
  print() { return "Started" };
  get phaseDuration(): number {
    return Date.now() - this.createdDate.getTime();
  }
}
export class PhaseStatusEnded implements PhaseStatus {
  public createdDate: Date;
  constructor(readonly phaseStartDate: Date){
    this.createdDate = new Date;
  }
  print() { return "Ended" };
  get phaseDuration(): number {
    return this.createdDate.getTime() - this.phaseStartDate.getTime();
  }
}