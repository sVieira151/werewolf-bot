import PlayerActionStatus, { PlayerActionStatusNone, PlayerActionStatusSuccess, PlayerActionStatusUndone } from "./playerActionStatus.js";
import Guid from "./guid.js";
import Player from "./player.js";
import Phase from "./phase.js";

export default abstract class PlayerAction{
  readonly id: Guid;
  phase?: Phase;
  phaseUndone?: Phase;
  status: PlayerActionStatus;
  constructor(readonly player: Player, readonly target?: Player){
    this.id = new Guid();
    this.status = new PlayerActionStatusNone();
  }

  do(_phase: Phase){
    this.status = this.onDo();
    this.phase = _phase;
  }

  undo(_phase: Phase){
    if (this.status instanceof PlayerActionStatusSuccess){
      this.onUndo();
      this.phaseUndone = _phase;
      this.status = new PlayerActionStatusUndone();
    }
  }

  abstract toString(): string;
  protected abstract onDo(): PlayerActionStatus;
  protected abstract onUndo(): null;  
}