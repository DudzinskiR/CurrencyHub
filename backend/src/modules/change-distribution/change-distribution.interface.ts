export interface ChangeDistribution{
  scopes: ChangeDistributionScope[]
  values: number[]
}

export interface ChangeDistributionScope{
  start: number,
  end: number
}