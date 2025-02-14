export default abstract class PhaseStatus {
  abstract print() : string;
  abstract get phaseDuration(): number;
} 

export class PhaseStatusNotStarted implements PhaseStatus {
  print() { return "Not Started" };
  get phaseDuration(): number {
    return -1;
  }
}
export class PhaseStatusStarted implements PhaseStatus {
  readonly started: Date;
  constructor(){
    this.started = new Date();
  }
  print() { return "Started" };
  get phaseDuration(): number {
    return Date.now() - this.started.getTime();
  }
}
export class PhaseStatusEnded implements PhaseStatus {
  readonly ended: Date;
  constructor(readonly started: Date){
    this.ended = new Date;
  }
  print() { return "Ended" };
  get phaseDuration(): number {
    return this.ended.getTime() - this.started.getTime();
  }
}