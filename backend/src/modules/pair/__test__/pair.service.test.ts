import { pairTimeBreakpoints } from "../../../common/const";
import * as validator from "../../../common/currency-validator/currency-validator";
import InvalidCurrencyError from "../../../exceptions/invalid-currency.exception";
import { CurrencyPair } from "../../../interfaces/currency-pair";
import { CurrencyPairData } from "../../../interfaces/currency-pair-data";
import CurrencyRefreshService from "../../currency-refresh/currency-refresh.service";
import PairModel from "../pair.model";
import PairService from "../pair.service";

jest.mock("../../../common/const", () => ({
  __esModule: true,
  pairTimeBreakpoints: [7, 9999]
}))

describe('Pair Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw InvalidCurrencyError if codeOne is invalid', async () => {
    const mockCodeOne = 'XYZ';
    const mockCodeTwo = 'USD';
    const mockNumBins = 5;

    jest.spyOn(validator, "validateCode").mockReturnValue(false);
    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();
    jest.spyOn(PairModel, 'getCurrencyDataDesc').mockResolvedValue([]);

    await expect(PairService.getPairDate(mockCodeOne, mockCodeTwo, mockNumBins)).rejects.toThrow(InvalidCurrencyError);
    expect(CurrencyRefreshService.refreshCurrencyData).not.toHaveBeenCalled();
    expect(PairModel.getCurrencyDataDesc).not.toHaveBeenCalled();
  });

  it('should throw InvalidCurrencyError if codeTwo is invalid', async () => {
    const mockCodeOne = 'USD';
    const mockCodeTwo = 'XYZ';
    const mockNumBins = 5;

    jest.spyOn(validator, "validateCode").mockReturnValueOnce(true).mockReturnValueOnce(false);
    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();
    jest.spyOn(PairModel, 'getCurrencyDataDesc').mockResolvedValue([]);

    await expect(PairService.getPairDate(mockCodeOne, mockCodeTwo, mockNumBins)).rejects.toThrow(InvalidCurrencyError);
    expect(CurrencyRefreshService.refreshCurrencyData).not.toHaveBeenCalled();
    expect(PairModel.getCurrencyDataDesc).not.toHaveBeenCalled();
  });

  it('should refresh currency data, validate code, and return pair statistics',async () => {
    const mockCodeOne = 'USD';
    const mockCodeTwo = 'EUR';
    const mockNumBins = 2;
    const today = new Date();

    const currencyDataOne: CurrencyPairData[] = [
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 10},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3), value: 11},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4), value: 12},

      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 11), value: 13},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 18), value: 14},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 19), value: 15},
    ]

    const currencyDataTwo: CurrencyPairData[] = [
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 20},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3), value: 21},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4), value: 22},

      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 11), value: 23},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 18), value: 24},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 19), value: 25},
    ]

    const expectedResult: CurrencyPair[] = [
      {
        scopes: [{ start: -0.045455, end: -0.042569 }, { start: -0.042569, end: -0.039683 }],
        values: [1, 1]
      },
      {
        scopes: [{ start: -0.045455, end: -0.036616 }, { start: -0.036616, end: -0.027778 }],
        values: [2, 3]
      }
    ]

    jest.spyOn(validator, "validateCode").mockReturnValue(true);
    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();
    jest.spyOn(PairModel, 'getCurrencyDataDesc').mockResolvedValueOnce(currencyDataOne).mockResolvedValueOnce(currencyDataTwo);


    const result = await PairService.getPairDate(mockCodeOne, mockCodeTwo, mockNumBins);

    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalledWith(mockCodeOne);
    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalledWith(mockCodeTwo);
    
    expect(result).toEqual(expectedResult);
  });

  it('should refresh currency data, validate code, and return pair statistics with single bin',async () => {
    const mockCodeOne = 'USD';
    const mockCodeTwo = 'EUR';
    const mockNumBins = -5;
    const today = new Date();

    const currencyDataOne: CurrencyPairData[] = [
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 10},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3), value: 11},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4), value: 12},

      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 11), value: 13},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 18), value: 14},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 19), value: 15},
    ]

    const currencyDataTwo: CurrencyPairData[] = [
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 20},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3), value: 21},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4), value: 22},

      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 11), value: 23},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 18), value: 24},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 19), value: 25},
    ]

    const expectedResult: CurrencyPair[] = [
      {
        scopes: [{ start: -0.045455, end: -0.039683 }],
        values: [2]
      },
      {
        scopes: [{ start: -0.045455, end: -0.027778 }],
        values: [5]
      }
    ]

    jest.spyOn(validator, "validateCode").mockReturnValue(true);
    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();
    jest.spyOn(PairModel, 'getCurrencyDataDesc').mockResolvedValueOnce(currencyDataOne).mockResolvedValueOnce(currencyDataTwo);


    const result = await PairService.getPairDate(mockCodeOne, mockCodeTwo, mockNumBins);

    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalledWith(mockCodeOne);
    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalledWith(mockCodeTwo);

    expect(result).toEqual(expectedResult);
  });

  
  it('should refresh currency data and return empty result if no matching dates found',async () => {
    const mockCodeOne = 'USD';
    const mockCodeTwo = 'EUR';
    const mockNumBins = 3;
    const today = new Date();

    const currencyDataOne: CurrencyPairData[] = [
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), value: 10},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 11},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3), value: 12},

      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4), value: 13},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5), value: 14},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6), value: 15},
    ]

    const currencyDataTwo: CurrencyPairData[] = [
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 11), value: 20},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 12), value: 21},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 13), value: 22},

      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14), value: 23},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 15), value: 24},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 16), value: 25},
    ]

    const expectedResult: CurrencyPair[] = [
      {
        scopes: [{start: 0, end: 0}, {start: 0, end: 0}, {start: 0, end: 0}],
        values: [0, 0, 0]
      },
      {
        scopes: [{start: 0, end: 0}, {start: 0, end: 0}, {start: 0, end: 0}],
        values: [0, 0, 0]
      }
    ]

    jest.spyOn(validator, "validateCode").mockReturnValue(true);
    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();
    jest.spyOn(PairModel, 'getCurrencyDataDesc').mockResolvedValueOnce(currencyDataOne).mockResolvedValueOnce(currencyDataTwo);


    const result = await PairService.getPairDate(mockCodeOne, mockCodeTwo, mockNumBins);

    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalledWith(mockCodeOne);
    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalledWith(mockCodeTwo);
    
    expect(result).toEqual(expectedResult);
  });
})