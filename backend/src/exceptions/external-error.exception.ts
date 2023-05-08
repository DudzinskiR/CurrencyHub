import Exception from "./exception";

export default class ExternalError extends Exception {
  constructor(message: string, code: number){
    super("External Error", message, code);
  }
}