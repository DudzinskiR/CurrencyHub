import * as validator from "../../../common/currency-validator/currency-validator";
import * as timeBreakpoints from "../../../common/const"
import { CurrencyStatistic } from "../../../interfaces/currency-statistics";
import { CurrencyStatisticsData } from "../../../interfaces/currency-statistics-data";
import CurrencyRefreshService from "../../currency-refresh/currency-refresh.service";
import StatisticsModel from "../statistics.model";
import StatisticsService from "../statistics.service";
import InvalidCurrencyException from "../../../exceptions/invalid-currency.exception";

describe('StatisticsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should refresh currency data, validate code, and return statistics', async () => {
    const currencyCode = 'USD';
    const today = new Date();
    const statisticsData = [
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate()), value: 10},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), value: 20},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 30},
    ];

    const expectStatistics: CurrencyStatistic[] = [
      {median: 0, dominant: [], deviation: 0, variation: 0},
      {median: 0, dominant: [], deviation: 0, variation: 0},
      {median: 0, dominant: [], deviation: 0, variation: 0},
      {median: 0, dominant: [], deviation: 0, variation: 0},
      {median: 0, dominant: [], deviation: 0, variation: 0},
      {median: 0, dominant: [], deviation: 0, variation: 0},
    ]

    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();
    jest.spyOn(StatisticsModel, 'getStatisticsDesc').mockResolvedValue(statisticsData);
    jest.spyOn(validator, "validateCode").mockReturnValue(true);
    jest.mock('../../../common/const', () => {
      return [7,14];
    })

    const result = await StatisticsService.getStatistics(currencyCode);

    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalledWith(currencyCode);
    expect(validator.validateCode).toHaveBeenCalledWith(currencyCode);
    expect(StatisticsModel.getStatisticsDesc).toHaveBeenCalledWith(currencyCode);

    for(const item of result){
      expect(item.deviation).toBeCloseTo(8.164965, 5);
      expect(item.median).toEqual(20)
      expect(item.variation).toBeCloseTo(40.824829, 5);
      expect(item.dominant).toEqual([]);
    }
  });

  it('should throw InvalidCurrencyException if currency code is invalid', async () => {
    const currencyCode = 'XYZ';
    const today = new Date();
    const statisticsData = [
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate()), value: 10},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), value: 20},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 30},
    ];

    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();
    jest.spyOn(StatisticsModel, 'getStatisticsDesc').mockResolvedValue(statisticsData);
    jest.spyOn(validator, "validateCode").mockReturnValue(false);

    await expect(StatisticsService.getStatistics(currencyCode)).rejects.toThrow(InvalidCurrencyException);
    expect(CurrencyRefreshService.refreshCurrencyData).not.toHaveBeenCalled();
    expect(StatisticsModel.getStatisticsDesc).not.toHaveBeenCalled();
  })
})