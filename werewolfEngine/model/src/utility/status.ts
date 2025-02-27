export interface IStatus {
  name: string;
  createdDate?: Date;
}

export interface IStatusFactory<T extends IStatus> {
  create(name: string, dateCreated: Date): T;
}

export interface IStatusContainer<T extends IStatus> {
  statusHistory: T[];
  get currentStatus() : T;
  addStatus(name: string, dateCreated: Date): T;
}

export abstract class StatusFactory<T extends IStatus> implements IStatusFactory<T> {
  constructor(private instantiator: new() => T){
  }
  create(name: string, dateCreated: Date): T {
    const result = new this.instantiator();
    result.name = name;
    result.createdDate = dateCreated;
    return result;
  }
}

export abstract class StatusContainer<
  StatusType extends IStatus,
  FactoryType extends StatusFactory<StatusType>
  > {  
  private statusFactory: FactoryType;
  statusHistory: StatusType[] = [];
  
  // returns the most recent status in the status history
  // returns null if no status in history
  get currentStatus(): StatusType {
    if (this.statusHistory.length === 0)
      return null;
    return this.statusHistory[this.statusHistory.length - 1];
  }

  addStatus(name: string, dateCreated: Date = new Date()) : StatusType {
    if (this.statusHistory.some(x => x.name === name))
      throw Error(`Unable to add status '${name}' - status already exists in status history`);

    const status: StatusType = this.statusFactory.create(name, dateCreated);
    this.statusHistory.push(status);
    return status;
  }
}