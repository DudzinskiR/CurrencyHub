import Exception from "./exception";

export default class InvalidCurrencyError extends Exception {
  constructor(currencyCode: string){
    super("Invalid Currency Error", `Currency: (${currencyCode}) don't exist`, 400);
  }
}