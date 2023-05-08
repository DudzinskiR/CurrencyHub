import Exception from "./exception";

export default class ExternalError extends Exception {
  constructor(){
    super("External Error", "Problem with external API", 500);
  }
}