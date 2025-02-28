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
  private statusProducer: new() => T;
  constructor(){
    this.statusProducer = this.getStatusProducer();
  }
  abstract getStatusProducer(): new() => T;
  
  create(name: string, dateCreated: Date): T {
    const result = new this.statusProducer();
    result.name = name;
    result.createdDate = dateCreated;
    return result;
  }

  static getInstance<T extends IStatus, U extends StatusFactory<T>>(c: new() => U): StatusFactory<T> {
    return new c();
  }
}

export abstract class StatusContainer<
  StatusType extends IStatus,
  FactoryType extends StatusFactory<StatusType>
  > {  
  statusHistory: StatusType[] = [];
  private statusFactory: FactoryType;
  
  constructor(factoryInstantiator: new() => FactoryType){
    this.statusFactory = new factoryInstantiator();
  }

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