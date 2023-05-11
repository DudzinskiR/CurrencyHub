import db from "../../../db/db";
import DatabaseError from "../../../exceptions/database-error.exception";
import { CurrencyRate } from "../../../interfaces/currency-rate";
import { CurrencyStatisticsData } from "../../../interfaces/currency-statistics-data";
import CurrencyRefreshModel from "../../currency-refresh/currency-refresh.model";
import StatisticsModel from "../statistics.model";

describe('StatisticsModel', () => {
  
  beforeEach(async () => {
    await db.migrate.down();
    await db.migrate.latest();
  });

  it('should create and retrieve currency rates for USD', async () => {
    const currencyCode = 'USD';
    const rateData: CurrencyRate[] = [
      { code: currencyCode, time: new Date(), value: 5 },
      { code: currencyCode, time: new Date(), value: 4 },
      { code: currencyCode, time: new Date(), value: 6 },
    ]

    await CurrencyRefreshModel.createNewRates(rateData);

    const response: CurrencyStatisticsData[] = await StatisticsModel.getStatisticsDesc(currencyCode);
    for(const index in response){
      expect({time: response[index].time, value: response[index].value}).toEqual({time: rateData[index].time.getTime(), value: rateData[index].value});
    }
  });

  it('should throw an database error when database is off',async () => {
    
    const currencyCode = 'USD';
    const rateData: CurrencyRate[] = [
      { code: currencyCode, time: new Date(), value: 5 },
      { code: currencyCode, time: new Date(), value: 4 },
      { code: currencyCode, time: new Date(), value: 6 },
    ]

    await CurrencyRefreshModel.createNewRates(rateData);

    await db.migrate.down();

    await expect(StatisticsModel.getStatisticsDesc(currencyCode)).rejects.toThrow(DatabaseError);
  });
})