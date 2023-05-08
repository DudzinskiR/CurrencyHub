import Exception from "./exception";

export default class DatabaseError extends Exception {
  constructor(){
    super("Database Error", "Problem with Database", 500);
  }
}