import Game from "../../../model/src/game/game";
import { DefaultGameStatusNames } from "../../../model/src/game/gameStatus";
import User from "../../../model/src/user/user";

export default class GameController {
  constructor(readonly game: Game){
  }

  static Create(name: string, host: User): GameController {
    const game = new Game();
    game.name = name;
    game.host = host;
    game.addStatus(DefaultGameStatusNames.NOT_STARTED);
    return new GameController(game);
  }

  // Updates the status to accepting signups and returns the date in Ms. 
  // Returns -1 if game has already began accepting signups 
  acceptSignups(): number {
    const game = this.game;
    if (game.currentStatus && game.currentStatus.name !== DefaultGameStatusNames.NOT_STARTED)
      return -1;

    // create the new status
    const signupDate = game.addStatus(DefaultGameStatusNames.SIGNUP).createdDate;
    return signupDate.getTime();    
  }

  // Updates the status to started and returns the date in Ms. 
  // Returns -1 if game has already started or has not accepted signups 
  start(): number {
    const game = this.game;
    if (game.currentStatus && game.currentStatus.name !== DefaultGameStatusNames.SIGNUP)
      return -1;

    // create the new status
     const dateStarted = game.addStatus(DefaultGameStatusNames.STARTED).createdDate;
    return dateStarted.getTime();
  }

  // Updates the status to ended and returns the date in Ms. 
  // Returns -1 if game hasn't been started or has been abandoned
  end(): number {
    const game = this.game;
    if (game.currentStatus && game.currentStatus.name !== DefaultGameStatusNames.STARTED)
      return -1;

    // create the new status
    const dateEnded = game.addStatus(DefaultGameStatusNames.ENDED).createdDate;
    return dateEnded.getTime();
  }

  // Updates the status to abandoned and returns the date in Ms. 
  // Returns -1 if game hasn't ended
  abandon(): number {
    const game = this.game;
    if (game.currentStatus && game.currentStatus.name !== DefaultGameStatusNames.ENDED)
      return -1;

    // create the new status
    const dateAbandoned = game.addStatus(DefaultGameStatusNames.ABANDONED).createdDate;
    return dateAbandoned.getTime();
  }
}