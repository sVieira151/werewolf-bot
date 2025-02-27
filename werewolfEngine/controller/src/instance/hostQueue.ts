import User from "../../../model/src/user/user";

export default class HostQueue
{
  // fields
  private hostQueue: User[];
  private maxEntriesPerUser: number = 1;

  // properties
  get count(): number {
    return this.hostQueue.length;
  }

  constructor(maxUserEntries: number = 1, users: User[] = []){
    this.maxEntriesPerUser = maxUserEntries;
    this.hostQueue = users;
  }

  // adds a user to the end of the queue
  push(user: User){
    if (!user) 
      throw Error("Unable to push user: user is null or undefined");

    if (this.hostQueue.filter(x => x.id.equals(user.id)).length >= this.maxEntriesPerUser)
      throw Error(`Unable to push user: user has reached the limit (${this.maxEntriesPerUser}) for number of times they can appear in the queue`);
    this.hostQueue.push(user);
  }

  // returns the user at the start of the queue
  pop() {
    return this.hostQueue.shift();
  }

  // checks if the user is in the queue
  contains(user: User){
    return this.hostQueue.some(x => x.id.equals(user.id));
  }

  // returns a list of the names of the users in the queue
  getHostQueueNames(){
    return this.hostQueue.map(x => x.userName);
  }

  // removes the user at the specified position in the queue. 0 is first in the queue
  remove(index: number){
    if (index !== null && index >= 0 && index < this.count){
      this.hostQueue.splice(index, 1);
    }
  }
}