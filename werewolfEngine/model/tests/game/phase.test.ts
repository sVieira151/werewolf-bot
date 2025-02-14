import { beforeEach, describe, it } from "node:test";
import assert from "node:assert";
import Phase from "../../src/game/phase";
import { setTimeout } from "node:timers/promises";

const phaseName: string = "Test";
const numPhases: number = 3;
let maxDuration: number;
let preparedPhasesNoLinks: Phase[];
let preparedPhasesWithLinks: Phase[];
let startedPhase: Phase;
let endedPhase: Phase;

class MockPhase extends Phase{
  set previousPhaseOverride(p: Phase) { this._previousPhase = p; }
  set nextPhaseOverride(p: Phase) { this._nextPhase = p; }
}

function standardSetup(){
  preparedPhasesNoLinks = [];
  preparedPhasesWithLinks = []
  maxDuration = Math.floor(Math.random()*5*1000+5000); // minimum 5 seconds, maximum 10 seconds
  for(let i=0; i<numPhases; i++){
    const newPhase = () => new MockPhase(phaseName, i, maxDuration);
    // phases with no links
    let p: MockPhase = newPhase();
    preparedPhasesNoLinks.push(p);

    // phases with links
    p = newPhase();
    if (i >= 1){
      p.previousPhaseOverride = preparedPhasesWithLinks[i-1];
      (preparedPhasesWithLinks[i-1] as MockPhase).nextPhaseOverride = p;
    }
    preparedPhasesWithLinks.push(p);
  }

  startedPhase = new MockPhase(phaseName, 0, maxDuration);
  startedPhase.start();
  endedPhase = new MockPhase(phaseName, 1, maxDuration);
  endedPhase.start();
  endedPhase.end();
}

describe("phase.displayName", ()=>{
  beforeEach(standardSetup);
  it("phase exists, display name matches expected format",()=>{
    const index = Math.floor(Math.random()*numPhases);
    assert.strictEqual(preparedPhasesNoLinks[index].displayName, `${phaseName} ${index}`);
  })
  it("phase exists, name undefined, display name matches expected format",()=>{
    const phase = new MockPhase(undefined, 0, 5000);
    assert.strictEqual(phase.displayName, `${undefined} ${0}`);
  })
  it("phase exists, name null, display name matches expected format",()=>{
    const phase = new MockPhase(null, 0, 5000);
    assert.strictEqual(phase.displayName, `${null} ${0}`);
  })
});

describe("phase.durationInMs", ()=>{
  beforeEach(standardSetup);
  it("phase not started, returns -1", ()=>{
    const phase = new MockPhase(phaseName, 0, 5000);
    assert.strictEqual(phase.durationInMs, -1);
  })
  it("phase started and not ended, returns difference from start to current time", ()=>{
    const phase = new MockPhase(phaseName, 0, 5000);
    const start = phase.start();
    setTimeout(1000);
    const end = Date.now();  
    assert.strictEqual(phase.durationInMs, end - start);
  })
  it("phase started and ended (doesn't exceed max), returns difference from start to end time", ()=>{
    const phase = new MockPhase(phaseName, 0, 5000);
    const start = phase.start();
    setTimeout(1000);  
    const end = phase.end();
    assert.strictEqual(phase.durationInMs, end - start);
  })
  it("phase started and ended (does exceed max), returns (approx) max duration time", async ()=>{ 
    const maxDurationMs = 5000;
    const phase = new MockPhase(phaseName, 0, maxDurationMs);
    phase.start();
    await setTimeout(maxDurationMs + 1000);  
    assert.strictEqual(phase.durationInMs >= maxDurationMs, true, "Duration is less than MaxDurationInMs !");
    assert.strictEqual(phase.durationInMs >= maxDurationMs + (maxDurationMs/100), false, "Duration is more than approximate MaxDurationInMs");
  })
})

describe("phase.setPreviousPhase()", ()=>{
  beforeEach(standardSetup);
  it("no previous phase & no next phase, passed valid phase, phase's previous phase is same as phase provided", ()=>{
    const phase = preparedPhasesNoLinks[1];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    const previous = preparedPhasesNoLinks[0];
    phase.setPreviousPhase(previous);
    assert.strictEqual(phase.previousPhase, previous);
  })
  it("no previous phase & no next phase, passed null, phase's previous phase is null", ()=>{
    const phase = preparedPhasesNoLinks[1];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    phase.setPreviousPhase(null);
    assert.strictEqual(phase.previousPhase, null);
  })
  it("no previous phase & no next phase, passed undefined, phase's previous phase is undefined", ()=>{
    const phase = preparedPhasesNoLinks[1];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    phase.setPreviousPhase(undefined);
    assert.strictEqual(phase.previousPhase, undefined);
  })
  it("has previous phase & no next phase, passed valid phase, phase's previous phase is same as phase provided", ()=>{
    const phase = preparedPhasesWithLinks[numPhases-1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    const previous = new MockPhase(phaseName, 999, maxDuration);
    phase.setPreviousPhase(previous);
    assert.strictEqual(phase.previousPhase, previous);
  })
  it("has previous phase & no next phase, passed existing previous phase, phase's previous phase remains the same", ()=>{
    const phase = preparedPhasesWithLinks[numPhases-1];
    const originalPrevious = phase.previousPhase;
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    const previous = phase.previousPhase;
    phase.setPreviousPhase(previous);
    assert.strictEqual(phase.previousPhase, previous);
    assert.strictEqual(phase.previousPhase, originalPrevious);
  })
  it("has previous phase & no next phase, passed null, phase's previous phase is null", ()=>{
    const phase = preparedPhasesWithLinks[numPhases-1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    phase.setPreviousPhase(null);
    assert.strictEqual(phase.previousPhase, null);
  })
  it("has previous phase & no next phase, passed undefined, phase's previous phase is undefined", ()=>{
    const phase = preparedPhasesWithLinks[numPhases-1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    phase.setPreviousPhase(undefined);
    assert.strictEqual(phase.previousPhase, undefined);
  })
  it("no previous phase & has next phase, passed valid phase, phase's previous phase is same as phase provided", ()=>{
    const phase = preparedPhasesWithLinks[0];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const previous = new MockPhase(phaseName, 999, maxDuration);
    phase.setPreviousPhase(previous);
    assert.strictEqual(phase.previousPhase, previous);
  })
  it("no previous phase & has next phase, passed null, phase's previous phase is null", ()=>{
    const phase = preparedPhasesWithLinks[0];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");
    
    phase.setPreviousPhase(null);
    assert.strictEqual(phase.previousPhase, null);
  })
  it("no previous phase & has next phase, passed undefined, phase's previous phase is undefined", ()=>{
    const phase = preparedPhasesWithLinks[0];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    phase.setPreviousPhase(undefined);
    assert.strictEqual(phase.previousPhase, undefined);
  })
  it("no previous phase & has next phase, passed existing next phase, throws error", ()=>{
    const phase = preparedPhasesWithLinks[0];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const next = preparedPhasesWithLinks[1];
    assert.throws(() => phase.setPreviousPhase(next), "Expected error thrown if attempting to set previous to existing next phase");
  })
  it("has previous phase & has next phase, passed valid phase, phase's previous phase is same as phase provided", ()=>{
    const phase = preparedPhasesWithLinks[1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const previous = new MockPhase(phaseName, 999, maxDuration);
    phase.setPreviousPhase(previous);
    assert.strictEqual(phase.previousPhase, previous);
  })
  it("has previous phase & has next phase, passed existing previous phase, phase's previous phase remains the same", ()=>{
    const phase = preparedPhasesWithLinks[1];
    const originalPrevious = phase.previousPhase;
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const previous = phase.previousPhase;
    phase.setPreviousPhase(previous);
    assert.strictEqual(phase.previousPhase, previous);
    assert.strictEqual(phase.previousPhase, originalPrevious);
  })
  it("has previous phase & has next phase, passed null, phase's previous phase is null", ()=>{
    const phase = preparedPhasesWithLinks[1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");
    
    phase.setPreviousPhase(null);
    assert.strictEqual(phase.previousPhase, null);
  })
  it("has previous phase & has next phase, passed undefined, phase's previous phase is undefined", ()=>{
    const phase = preparedPhasesWithLinks[1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    phase.setPreviousPhase(undefined);
    assert.strictEqual(phase.previousPhase, undefined);
  })
  it("has previous phase & has next phase, passed existing next phase, throws error", ()=>{
    const phase = preparedPhasesWithLinks[1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const next = preparedPhasesWithLinks[2];
    assert.throws(() => phase.setPreviousPhase(next), "Expected error thrown if attempting to set previous to existing next phase");
  })
})

describe("phase.setNextPhase()", ()=>{
  beforeEach(standardSetup);
  it("no previous phase & no next phase, passed valid phase, phase's next phase is same as phase provided", ()=>{
    const phase = preparedPhasesNoLinks[1];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    const next = preparedPhasesNoLinks[0];
    phase.setNextPhase(next);
    assert.strictEqual(phase.nextPhase, next);
  })
  it("no previous phase & no next phase, passed null, phase's next phase is null", ()=>{
    const phase = preparedPhasesNoLinks[1];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    phase.setNextPhase(null);
    assert.strictEqual(phase.nextPhase, null);
  })
  it("no previous phase & no next phase, passed undefined, phase's next phase is undefined", ()=>{
    const phase = preparedPhasesNoLinks[1];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");
    
    phase.setNextPhase(undefined);
    assert.strictEqual(phase.nextPhase, undefined);
  })
  it("has previous phase & no next phase, passed valid phase, phase's next phase is same as phase provided", ()=>{
    const phase = preparedPhasesWithLinks[numPhases-1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    const next = new MockPhase(phaseName, 999, maxDuration);
    phase.setNextPhase(next);
    assert.strictEqual(phase.nextPhase, next);
  })
  it("has previous phase & no next phase, passed existing previous phase, throws error", ()=>{    
    const phase = preparedPhasesWithLinks[numPhases-1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    const previous = preparedPhasesWithLinks[numPhases-2];
    assert.throws(() => phase.setNextPhase(previous), "Expected error thrown if attempting to set previous to existing next phase");
  })
  it("has previous phase & no next phase, passed null, phase's next phase is null", ()=>{
    const phase = preparedPhasesWithLinks[numPhases-1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    phase.setNextPhase(null);
    assert.strictEqual(phase.nextPhase, null);
  })
  it("has previous phase & no next phase, passed undefined, phase's next phase is undefined", ()=>{
    const phase = preparedPhasesWithLinks[numPhases-1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.equal(phase.nextPhase, null, "Phase not set up correctly - has next phase!");

    phase.setNextPhase(undefined);
    assert.strictEqual(phase.nextPhase, undefined);
  })
  it("no previous phase & has next phase, passed valid phase, phase's next phase is same as phase provided", ()=>{
    const phase = preparedPhasesWithLinks[0];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const next = new MockPhase(phaseName, 999, maxDuration);
    phase.setNextPhase(next);
    assert.strictEqual(phase.nextPhase, next);
  })
  it("no previous phase & has next phase, passed null, phase's next phase is null", ()=>{
    const phase = preparedPhasesWithLinks[0];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");
    
    phase.setNextPhase(null);
    assert.strictEqual(phase.nextPhase, null);
  })
  it("no previous phase & has next phase, passed undefined, phase's next phase is undefined", ()=>{
    const phase = preparedPhasesWithLinks[0];
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    phase.setNextPhase(undefined);
    assert.strictEqual(phase.nextPhase, undefined);
  })
  it("no previous phase & has next phase, passed existing next phase, phase's next phase remains the same", ()=>{
    const phase = preparedPhasesWithLinks[0];
    const originalNext = phase.nextPhase;
    assert.equal(phase.previousPhase, null, "Phase not set up correctly - has previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const next = phase.nextPhase;
    phase.setNextPhase(next);
    assert.strictEqual(phase.nextPhase, next);
    assert.strictEqual(phase.nextPhase, originalNext);
  })
  it("has previous phase & has next phase, passed valid phase, phase's next phase is same as phase provided", ()=>{
    const phase = preparedPhasesWithLinks[1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const next = new MockPhase(phaseName, 999, maxDuration);
    phase.setNextPhase(next);
    assert.strictEqual(phase.nextPhase, next);
  })
  it("has previous phase & has next phase, passed existing next phase, phase's next phase remains the same", ()=>{
    const phase = preparedPhasesWithLinks[1];
    const originalNext = phase.nextPhase;
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const next = phase.nextPhase;
    phase.setNextPhase(next);
    assert.strictEqual(phase.nextPhase, next);
    assert.strictEqual(phase.nextPhase, originalNext);
  })
  it("has previous phase & has next phase, passed null, phase's next phase is null", ()=>{
    const phase = preparedPhasesWithLinks[1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");
    
    phase.setNextPhase(null);
    assert.strictEqual(phase.nextPhase, null);
  })
  it("has previous phase & has next phase, passed undefined, phase's next phase is undefined", ()=>{
    const phase = preparedPhasesWithLinks[1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    phase.setNextPhase(undefined);
    assert.strictEqual(phase.nextPhase, undefined);
  })
  it("has previous phase & has next phase, passed existing previous phase, throws error", ()=>{
    const phase = preparedPhasesWithLinks[1];
    assert.notEqual(phase.previousPhase, null, "Phase not set up correctly - has no previous phase");
    assert.notEqual(phase.nextPhase, null, "Phase not set up correctly - has no next phase!");

    const previous = preparedPhasesWithLinks[0];
    assert.throws(() => phase.setNextPhase(previous), "Expected error thrown if attempting to set previous to existing next phase");
  })
})

describe("phase.start()", ()=>{
  beforeEach(standardSetup);
  it("phase not started, returns current time", ()=>{
    const phase = new MockPhase(phaseName, 0, maxDuration);
    assert.strictEqual(phase.start(), Date.now());
  })
  it("phase started, returns -1", ()=>{
    const phase = startedPhase;
    assert.strictEqual(phase.start(), -1);    
  })
  it("phase ended, returns -1", ()=>{
    const phase = endedPhase;
    assert.strictEqual(phase.start(), -1);    
  })
})

describe("phase.end()", ()=>{
  beforeEach(standardSetup);
  it("phase started, returns current time", ()=>{
    const phase = startedPhase;
    assert.strictEqual(phase.end(), Date.now());
  })
  it("phase not started, returns -1", ()=>{
    const phase = new MockPhase(phaseName, 0, maxDuration);
    assert.strictEqual(phase.end(), -1);    
  })
  it("phase ended, returns -1", ()=>{
    const phase = endedPhase;
    assert.strictEqual(phase.start(), -1);    
  })
})