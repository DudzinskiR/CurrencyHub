import * as validator from "../../../common/currency-validator/currency-validator";
import InvalidCurrencyError from "../../../exceptions/invalid-currency.exception";
import CurrencyRefreshService from "../../currency-refresh/currency-refresh.service";
import AnalysisModel from "../analysis.model";
import AnalysisService from "../analysis.service";

jest.mock("../../currency-refresh/currency-refresh.service");

describe('AnalysisService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should refresh currency data and return analysis', async () => {
    const currencyCode = 'USD';
    const today = new Date();
    const analysisData = [
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate()), value: 10},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), value: 11},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 12},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4), value: 12},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5), value: 11},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8), value: 10},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 9), value: 11},
    ];

    const expectedOutput = [
      { up: 2, const: 1, down: 1 },
      { up: 3, const: 1, down: 2 },
      { up: 3, const: 1, down: 2 },
      { up: 3, const: 1, down: 2 },
      { up: 3, const: 1, down: 2 },
      { up: 3, const: 1, down: 2 },
    ];

    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();
    jest.spyOn(AnalysisModel, 'getAnalysisDesc').mockResolvedValue(analysisData);
    jest.spyOn(validator, "validateCode").mockReturnValue(true);
    const result = await AnalysisService.getAnalysis(currencyCode);

    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalledWith(currencyCode);
    expect(validator.validateCode).toHaveBeenCalledWith(currencyCode);
    expect(AnalysisModel.getAnalysisDesc).toHaveBeenCalledWith(currencyCode);

    expect(result).toEqual(expectedOutput);
  });

  it('should refresh currency data and return analysis - long gaps between rates', async () => {
    const currencyCode = 'USD';
    const today = new Date();
    const analysisData = [
      // < 7
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate()), value: 10},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), value: 11},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), value: 12},

      // < 14
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 8), value: 12},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 9), value: 11},

      // < 30
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 18), value: 10},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 19), value: 11},

      // < 90
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 32), value: 11},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 33), value: 10},

      // < 180
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 91), value: 12},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 92), value: 13},

      // other
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 181), value: 12},
      {time: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 182), value: 12},
    ];

    const expectedOutput = [
      { up: 2, const: 0, down: 0 },
      { up: 2, const: 1, down: 1 },
      { up: 3, const: 1, down: 2 },
      { up: 3, const: 2, down: 3 },
      { up: 5, const: 2, down: 3 },
      { up: 5, const: 3, down: 4 },
    ];

    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();
    jest.spyOn(AnalysisModel, 'getAnalysisDesc').mockResolvedValue(analysisData);
    jest.spyOn(validator, "validateCode").mockReturnValue(true);

    const result = await AnalysisService.getAnalysis(currencyCode);

    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalledWith(currencyCode);
    expect(validator.validateCode).toHaveBeenCalledWith(currencyCode);
    expect(AnalysisModel.getAnalysisDesc).toHaveBeenCalledWith(currencyCode);

    expect(result[0]).toEqual(expectedOutput[0]);
    expect(result[1]).toEqual(expectedOutput[1]);
    expect(result[2]).toEqual(expectedOutput[2]);
    expect(result[3]).toEqual(expectedOutput[3]);
    expect(result[4]).toEqual(expectedOutput[4]);
    expect(result[5]).toEqual(expectedOutput[5]);
  });

  it('should throw InvalidCurrencyError if currency code is invalid', async () => {
    const currencyCode = 'XYZ';
    jest.spyOn(CurrencyRefreshService, 'refreshCurrencyData').mockResolvedValue();

    jest.spyOn(validator, "validateCode").mockReturnValue(false);

    await expect(AnalysisService.getAnalysis(currencyCode)).rejects.toThrow(InvalidCurrencyError);
    expect(CurrencyRefreshService.refreshCurrencyData).toHaveBeenCalled();
    expect(validator.validateCode).toHaveBeenCalledWith(currencyCode);
    expect(AnalysisModel.getAnalysisDesc).not.toHaveBeenCalled();
  })
})