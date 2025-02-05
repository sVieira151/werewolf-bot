import Guid from "./guid.js";

export default abstract class Phase {
  readonly id: Guid;  
  previousPhase: Phase;
  nextPhase: Phase;
  dateStarted: Date;
  dateEnded: Date;
  constructor(readonly name: string, readonly iteration: number, readonly maxDurationMs: number){
    this.id = new Guid();   
  }

  getDisplayName(){
    return `${this.name} ${this.iteration}`;
  }

  setPrevious(_phase: Phase){
    this.previousPhase = _phase;
  }

  setNext(_phase: Phase){
    this.nextPhase = _phase;
  }

  start(){
    this.dateStarted = new Date();
  }

  end(){
    this.dateEnded = new Date();
  }

  // Gets the total duration of the phase. 
  // If not started then will return -1, if not ended will return duration as of current time
  durationMs(){
    let started = this.dateStarted ? this.dateStarted.getTime() : Date.now() + 1;
    let ended = this.dateStarted || this.dateEnded ? this.dateEnded.getTime() : Date.now();
    return ended - started;
  }
}