export interface CurrencyPair{
  scopes: CurrencyPairScope[]
  values: number[]
}

export interface CurrencyPairScope{
  start: number,
  end: number
}