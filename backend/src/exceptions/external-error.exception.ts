import Exception from "./exception";

export default class ExternalException extends Exception {
  constructor(){
    super("External Error", "Problem with external API", 500);
  }
}