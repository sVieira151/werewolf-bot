import { v4 as uuidv4 } from 'uuid';

export default class Guid {
  constructor(readonly value: string = uuidv4()){
  }
  toString(){
    return this.value;
  }
  equals(other: Guid){
    if (!other) return false;
    return this.value === other.value;
  }
}