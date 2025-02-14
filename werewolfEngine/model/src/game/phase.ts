import Guid from "../utility/guid.js";
import PhaseStatus, { PhaseStatusEnded, PhaseStatusNotStarted, PhaseStatusStarted } from "./phaseStatus.js";

export default abstract class Phase {  
  // fields
  readonly id: Guid; 
  private maxDurationTimeout: NodeJS.Timeout; 

  // properties
  protected _previousPhase?: Phase;
  get previousPhase(): Phase { return this._previousPhase; }

  protected _nextPhase?: Phase;
  get nextPhase(): Phase { return this._nextPhase; }

  protected _dateStarted?: Date;
  get dateStarted(): Date { return this._dateStarted };

  protected _dateEnded?: Date;
  get dateEnded(): Date { return this._dateEnded };

  protected _status: PhaseStatus;
  get status(): PhaseStatus { return this._status };

  // Gets the total duration of the phase. 
  // If not started then will return -1, if not ended will return duration as of current time
  get durationInMs() { return this.status.phaseDuration };

  // Gets a formatted name for displaying
  get displayName(){    
    return `${this.name} ${this.iteration}`;
  }

  // methods
  constructor(readonly name: string, readonly iteration: number, readonly maxDurationMs: number){
    this.id = new Guid();   
    this._status = new PhaseStatusNotStarted();
  }

  setPreviousPhase(phase: Phase){
    if (this.nextPhase instanceof Phase && phase === this.nextPhase)
      throw Error("Unable to set previous phase: previous phase can't be the same as next phase")

    // if we have a previous phase already, unlink this phase from it
    if (this.previousPhase instanceof Phase){
      this.previousPhase._nextPhase = null;
    }

    this._previousPhase = phase;

    // if the intended previous phase isn't null or undefined, update it's next phase
    if (phase instanceof Phase){
      phase._nextPhase = this;
    }
  }

  setNextPhase(phase: Phase){
    if (this.previousPhase instanceof Phase && phase === this.previousPhase)
      throw Error("Unable to set next phase: next phase can't be the same as previous phase")

    // if we have a next phase already, unlink this phase from it
    if (this.nextPhase instanceof Phase){
      this.nextPhase._previousPhase = null;
    }

    this._nextPhase = phase;
    
    // if the intended next phase isn't null or undefined, update it's previous phase
    if (phase instanceof Phase){
      phase._previousPhase = this;
    }
  }

  // Updates the status to started and returns the date started  in Ms. 
  // Returns -1 if Phase has already been started
  start(): number {
    if (!(this.status instanceof PhaseStatusNotStarted))
      return -1;

    this._status = new PhaseStatusStarted();
    this._dateStarted = this.status.createdDate;

    // end the game if max duration passes
    this.maxDurationTimeout = setTimeout(() => this.end(), this.maxDurationMs);

    return this.dateStarted.getTime();
  }

  // Updates the status to ended and returns the date ended in Ms. 
  // Returns -1 if Phase has not been started or has already been ended
  end(): number {
    if (!(this.status instanceof PhaseStatusStarted))
      return -1;

    // clear the timeout since we are ending now
    clearTimeout(this.maxDurationTimeout);
    this._status = new PhaseStatusEnded(this.dateStarted);
    this._dateEnded = this.status.createdDate;
    return this.dateEnded.getTime();
  }
}