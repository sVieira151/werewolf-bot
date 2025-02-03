import Player from "./player.js";

export default class HostQueue
{
  current?: Player;
  private hostQueue: Player[];
  constructor(){
    this.hostQueue = [];
  }

  push(player: Player){
    this.hostQueue.push(player);
  }

  pop() {
    return this.hostQueue.pop();
  }

  getHostQueueNames(){
    return this.hostQueue.map(x => x.user.userName);
  }
}