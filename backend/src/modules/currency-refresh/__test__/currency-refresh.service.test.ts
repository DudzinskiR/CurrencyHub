import { unwatchFile } from "fs";
import CurrencyRefreshModel from "../currency-refresh.model"
import CurrencyRefreshService from "../currency-refresh.service"

describe('CurrencyRefreshService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('refreshCurrencyData', () => {
    it('should refresh currency data if it is outdated', async () => {
      const currencyCode = 'USD';
      const currentDate = new Date();
      const lastRefreshDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate() - 1);

      jest.spyOn(CurrencyRefreshModel, 'getLastCurrencyRefresh').mockResolvedValue({time: lastRefreshDate, code: currencyCode});
      jest.spyOn(CurrencyRefreshModel, 'getCurrencyRates').mockResolvedValue([{code: currencyCode, time: currentDate, value: 1}]);
      jest.spyOn(CurrencyRefreshModel, 'createNewRates').mockResolvedValue();
      jest.spyOn(CurrencyRefreshModel, 'updateRefresh').mockResolvedValue();
      
      await CurrencyRefreshService.refreshCurrencyData(currencyCode);

      expect(CurrencyRefreshModel.getLastCurrencyRefresh).toHaveBeenCalledWith(currencyCode);
      expect(CurrencyRefreshModel.getCurrencyRates).toHaveBeenCalled();
      expect(CurrencyRefreshModel.createNewRates).toHaveBeenCalled();
      expect(CurrencyRefreshModel.updateRefresh).toHaveBeenCalled();

    });

    it('should create new currency refresh if last refresh does not exist', async () => {
      const currencyCode = 'USD';
      const currentDate = new Date();

      jest.spyOn(CurrencyRefreshModel, 'getLastCurrencyRefresh').mockResolvedValue(undefined);
      jest.spyOn(CurrencyRefreshModel, 'getCurrencyRates').mockResolvedValue([{code: currencyCode, time: currentDate, value: 1}]);
      jest.spyOn(CurrencyRefreshModel, 'createNewRates').mockResolvedValue();
      jest.spyOn(CurrencyRefreshModel, 'createNewRefresh').mockResolvedValue();
      
      await CurrencyRefreshService.refreshCurrencyData(currencyCode);

      expect(CurrencyRefreshModel.getLastCurrencyRefresh).toHaveBeenCalledWith(currencyCode);
      expect(CurrencyRefreshModel.getCurrencyRates).toHaveBeenCalled();
      expect(CurrencyRefreshModel.createNewRates).toHaveBeenCalled();
      expect(CurrencyRefreshModel.createNewRates).toHaveBeenCalled();
    });

    it('should not refresh currency data if it is not outdated', async () => {
      const currencyCode = 'USD';
      const currentDate = new Date();

      jest.spyOn(CurrencyRefreshModel, 'getLastCurrencyRefresh').mockResolvedValue({time: currentDate, code: currencyCode});
      jest.spyOn(CurrencyRefreshModel, 'getCurrencyRates').mockResolvedValue([{code: currencyCode, time: currentDate, value: 1}]);
      jest.spyOn(CurrencyRefreshModel, 'createNewRates').mockResolvedValue();
      jest.spyOn(CurrencyRefreshModel, 'createNewRefresh').mockResolvedValue();
      
      await CurrencyRefreshService.refreshCurrencyData(currencyCode);

      expect(CurrencyRefreshModel.getLastCurrencyRefresh).toHaveBeenCalledWith(currencyCode);
      expect(CurrencyRefreshModel.getCurrencyRates).not.toHaveBeenCalled();
      expect(CurrencyRefreshModel.createNewRates).not.toHaveBeenCalled();
      expect(CurrencyRefreshModel.createNewRates).not.toHaveBeenCalled();
    });
  });

  describe('isOutdated', () => {
    it('should return true if time in the past', () => {
      const time = new Date(2020, 0, 1);
      const result = CurrencyRefreshService.isOutdated(time);
      expect(result).toBe(true);
    })
  })
});