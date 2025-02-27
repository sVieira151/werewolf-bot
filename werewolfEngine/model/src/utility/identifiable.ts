import Guid from "./guid";

export default interface IIdentifiable<T> {
  id: Guid;
  equals(other: T): boolean;
}