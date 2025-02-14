import Phase from "../../../model/src/game/phase";
import { PhaseStatusEnded, PhaseStatusNotStarted, PhaseStatusStarted } from "../../../model/src/game/phaseStatus";

export default class PhaseController {  
  private maxDurationTimeout: NodeJS.Timeout; 

  // Returns the previous phase from the encapsulated Phase
  get previousPhase(): Phase { return this.phase.previousPhase; }  

  // Returns the next phase from the encapsulated Phase
  get nextPhase(): Phase { return this.phase.nextPhase; }

  // Gets the total duration of the phase. 
  // If not started then will return -1, if not ended will return duration as of current time
  get durationInMs() { return this.phase.status.phaseDuration };

  // Gets a formatted name for displaying
  get displayName(){    
    return `${this.phase.name} ${this.phase.iteration}`;
  }

  constructor(readonly phase: Phase){
  
  }

  // instantiates a new phase controller with a phase of the specified subtype
  static Create<T extends Phase>(p: new() => T, name: string, iteration: number, maxDurationInMs: number): PhaseController {
    const phase = new p();
    // fill out details
    phase.name = name;
    phase.iteration = iteration;
    phase.maxDurationMs = maxDurationInMs; 
    return new PhaseController(phase);
  }  

  setPreviousPhase(_phase: Phase){
    const phase = this.phase;
    if (phase.nextPhase instanceof Phase && _phase === phase.nextPhase)
      throw Error("Unable to set previous phase: previous phase can't be the same as next phase")

    // if we have a previous phase already, unlink this phase from it
    if (phase.previousPhase instanceof Phase){
      phase.previousPhase.nextPhase = null;
    }

    phase.previousPhase = _phase;

    // if the intended previous phase isn't null or undefined, update it's next phase
    if (_phase instanceof Phase){
      _phase.nextPhase = phase;
    }
  }

  setNextPhase(_phase: Phase){
    const phase = this.phase;
    if (phase.previousPhase instanceof Phase && _phase === phase.previousPhase)
      throw Error("Unable to set next phase: next phase can't be the same as previous phase")

    // if we have a next phase already, unlink this phase from it
    if (phase.nextPhase instanceof Phase){
      phase.nextPhase.previousPhase = null;
    }

    phase.nextPhase = _phase;
    
    // if the intended next phase isn't null or undefined, update it's previous phase
    if (_phase instanceof Phase){
      _phase.previousPhase = phase;
    }
  }

  // Updates the status to started and returns the date started  in Ms. 
  // Returns -1 if Phase has already been started
  start(): number {
    const phase = this.phase;
    if (!(phase.status instanceof PhaseStatusNotStarted))
      return -1;

    phase.status = new PhaseStatusStarted();
    phase.dateStarted = phase.status.createdDate;

    // end the game if max duration passes
    this.maxDurationTimeout = setTimeout(() => this.end(), phase.maxDurationMs);

    return phase.dateStarted.getTime();
  }

  // Updates the status to ended and returns the date ended in Ms. 
  // Returns -1 if Phase has not been started or has already been ended
  end(): number {
    const phase = this.phase;
    if (!(phase.status instanceof PhaseStatusStarted))
      return -1;

    // clear the timeout since we are ending now
    clearTimeout(this.maxDurationTimeout);
    phase.status = new PhaseStatusEnded(phase.dateStarted);
    phase.dateEnded = phase.status.createdDate;
    return phase.dateEnded.getTime();
  }
}