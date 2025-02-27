import Guid from "../utility/guid";
import IIdentifiable from "../utility/identifiable";

export default class Role implements IIdentifiable<Role> {
  id: Guid = new Guid();
  displayName: string;

  equals(other: Role): boolean {    
    if (!other)
      return false;
    return this.id.equals(other.id);
  }
}