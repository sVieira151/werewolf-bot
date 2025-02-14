import Game from "../../../model/src/game/game";
import User from "../../../model/src/user/user";

export default class GameController {
  constructor(readonly game: Game){

  }

  static Create(name: string, host: User): GameController {
    const game = new Game();
    game.name = name;
    game.host = host;
    return new GameController(game);
  }
}