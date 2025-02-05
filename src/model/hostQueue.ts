import User from "./user.js";

const USER_COUNT_MAX = 1;

export default class HostQueue
{
  private hostQueue: User[];
  constructor(){
    this.hostQueue = [];
  }

  // adds a user to the end of the queue
  push(user: User){
    if (this.hostQueue.filter(x => x.id.equals(user.id)).length > USER_COUNT_MAX)
      throw Error(`Unable to push user: user has reached the limit (${USER_COUNT_MAX}) for number of times they can appear in the queue`);
    this.hostQueue.push(user);
  }

  // returns the user at the start of the queue
  pop() {
    return this.hostQueue.shift();
  }

  contains(user: User){
    return this.hostQueue.some(x => x.id.equals(user.id));
  }
  getHostQueueNames(){
    return this.hostQueue.map(x => x.userName);
  }

  remove(index: number){
    this.hostQueue.splice(index, 1);
  }
}