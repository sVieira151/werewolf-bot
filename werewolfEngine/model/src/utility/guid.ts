import { v4 as uuidv4 } from 'uuid';

export default class Guid {
  readonly value: string;
  constructor(){
    this.value = uuidv4();
  }
  toString(){
    return this.value;
  }
  equals(other: Guid){
    return this.value === other.value;
  }
}