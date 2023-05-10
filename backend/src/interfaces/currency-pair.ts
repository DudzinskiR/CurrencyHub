export interface CurrencyPair{
  time: number,
  scopes: CurrencyPairScope[]
  values: number[]
}

export interface CurrencyPairScope{
  startScope: number,
  endScope: number
}