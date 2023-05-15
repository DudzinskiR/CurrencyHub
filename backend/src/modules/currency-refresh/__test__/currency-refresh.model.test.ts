import CurrencyRefreshModel from '../currency-refresh.model';
import db from "../../../db/db"
import { CurrencyRefreshData } from '../../../interfaces/currency-refresh';
import { CurrencyRate } from '../../../interfaces/currency-rate';
import axios, { AxiosError } from 'axios';
import ExternalError from '../../../exceptions/external-error.exception';
import DatabaseError from '../../../exceptions/database-error.exception';

describe('CurrencyRefresh', () => { 
  beforeEach(async () => {
    await db.migrate.down();
    await db.migrate.latest();
  });

  it('should return undefined if currency refresh does not exist', async () => {
    const data = await CurrencyRefreshModel.getLastCurrencyRefresh('USD');

    expect(data).toEqual(undefined);
  })

  it('should create and retrieve last currency refresh for USD', async () => {
    const refreshData: CurrencyRefreshData = {
      code: "USD", 
      time: new Date()
    }  

    await CurrencyRefreshModel.createNewRefresh(refreshData);
    const data = await CurrencyRefreshModel.getLastCurrencyRefresh('USD');

    expect(data).toEqual({time: refreshData.time, code: "USD"});
  });

  it('should create, update and retrieve last currency refresh for USD', async () => {
    const refreshData: CurrencyRefreshData = {
      code: "USD", 
      time: new Date()
    }  

    await CurrencyRefreshModel.createNewRefresh(refreshData);

    const updateData: CurrencyRefreshData = {
      code: "USD",
      time: new Date(refreshData.time.getTime() + 1000 * 60 * 60 * 24)
    } 

    await CurrencyRefreshModel.updateRefresh(updateData);
    const data = await CurrencyRefreshModel.getLastCurrencyRefresh('USD');

    expect(data).toEqual({time: updateData.time, code: "USD"});
  });

  test('should create currency rates for USD', async () => {
    const rateData: CurrencyRate[] = [
      {
        code: "USD", time: new Date(), value: 5
      }
    ]

    await CurrencyRefreshModel.createNewRates(rateData);
  });

  it('should fetch currency rates for USD', async () => {
    const mockResponse = {
      data: {
        rates: [
          { effectiveDate: '2023-05-07', mid: 1.2345 },
          { effectiveDate: '2023-05-08', mid: 1.3456 },
          { effectiveDate: '2023-05-09', mid: 1.4567 },
        ]
      }
    };

    jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);

    const currencyCode = 'USD';
    const table = 'A';
    const startDate = new Date('2023-05-07');
    const endDate = new Date('2023-05-09');

    const result = await CurrencyRefreshModel.fetchCurrencyRates(currencyCode, table, startDate, endDate);

    expect(result).toEqual([
      { code: 'USD',time: new Date('2023-05-07'),value: 1.2345 },
      { code: 'USD',time: new Date('2023-05-08'),value: 1.3456 },
      { code: 'USD',time: new Date('2023-05-09'),value: 1.4567 },
    ])
  });

  it('should return empty array when api returns 404 error', async () => {
    const currencyCode = 'USD';
    const table = 'A';
    const startDate = new Date('2023-05-07');
    const endDate = new Date('2023-05-09');

    jest.spyOn(axios, 'get').mockRejectedValue(new AxiosError());

    const result = await CurrencyRefreshModel.fetchCurrencyRates(currencyCode, table, startDate, endDate);

    expect(result).toEqual([]);
  })
});

describe('CurrencyRefresh - throw exception', () => {

  it('should throw an external error when fetch fails', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Error'));

    const currencyCode = 'USD';
    const table = 'A';
    const startDate = new Date('2023-05-07');
    const endDate = new Date('2023-05-09');

    await expect(CurrencyRefreshModel.fetchCurrencyRates(currencyCode, table, startDate, endDate)).rejects.toThrow(ExternalError);
  });

  it('should throw an database error when database is off',async () => {
    await db.migrate.down();
    const rates: CurrencyRate[] = [
      {code: "USD", time: new Date(), value: 1},
      {code: "USD", time: new Date(), value: 2},
    ]

    const refresh: CurrencyRefreshData = {
      code: "USD",
      time: new Date()
    }

    await expect(CurrencyRefreshModel.getLastCurrencyRefresh('USD')).rejects.toThrow(DatabaseError);
    await expect(CurrencyRefreshModel.createNewRefresh(refresh)).rejects.toThrow(DatabaseError);
    await expect(CurrencyRefreshModel.updateRefresh(refresh)).rejects.toThrow(DatabaseError);
    await expect(CurrencyRefreshModel.createNewRates(rates)).rejects.toThrow(DatabaseError);
  });
})