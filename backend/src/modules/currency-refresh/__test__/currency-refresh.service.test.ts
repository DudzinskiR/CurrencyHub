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
      const currentDate = new Date();
      const date = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate() - 1);

      const result = CurrencyRefreshService.isOutdated(date);
      expect(result).toBe(true);
    });

    it('should return false if time is in the future', () => {
      const currentDate = new Date();
      const date = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate() + 1);
      const result = CurrencyRefreshService.isOutdated(date);
      expect(result).toBe(false);
    });

    it('should return false if time is the same as current time', () => {
      const time = new Date();
      const result = CurrencyRefreshService.isOutdated(time);
      expect(result).toBe(false);
    });
  });
  

  describe('divideTime', () => { 
    it('should divide time range into a single pair when the range is within the maximum number of days', () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 0, 3);
      const result = CurrencyRefreshService.divideTime(startDate, endDate);
      expect(result).toEqual([{ start: startDate, end: endDate }]);
    });
  
    it('should divide time range into multiple pairs when the range exceeds the maximum number of days', () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 0, 10);
      const result = CurrencyRefreshService.divideTime(startDate, endDate, 5);
      expect(result).toEqual([
        { start: new Date(2022, 0, 1), end: new Date(2022, 0, 5) },
        { start: new Date(2022, 0, 6), end: new Date(2022, 0, 10) },
      ]);
    });
  
    it('should divide time range into a single pair when the range is equal to the maximum number of days', () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 0, 10);
      const result = CurrencyRefreshService.divideTime(startDate, endDate, 10);
      expect(result).toEqual([{ start: startDate, end: endDate }]);
    });
  
    it('should handle cases when the start date is greater than the end date', () => {
      const startDate = new Date(2022, 0, 10);
      const endDate = new Date(2022, 0, 1);
      const result = CurrencyRefreshService.divideTime(startDate, endDate);
      expect(result).toEqual([]);
    });
  
    it('should handle cases when the start date and end date are the same', () => {
      const startDate = new Date(2022, 0, 1);
      const endDate = new Date(2022, 0, 1);
      const result = CurrencyRefreshService.divideTime(startDate, endDate);
      expect(result).toEqual([{ start: startDate, end: endDate }]);
    });
  })
});