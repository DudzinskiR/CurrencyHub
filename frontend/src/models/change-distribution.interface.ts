export interface ChangeDistributionData{
  scopes: ChangeDistributionScopeData[]
  values: number[]
}

export interface ChangeDistributionScopeData{
  start: number,
  end: number
}