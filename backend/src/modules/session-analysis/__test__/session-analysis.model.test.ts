import db from "../../../db/db";
import DatabaseError from "../../../exceptions/database-error.exception";
import { CurrencyRate } from "../../../interfaces/currency-rate";
import CurrencyRefreshModel from "../../currency-refresh/currency-refresh.model";
import SessionAnalysisModel from "../session-analysis.model";

describe('Session Analysis Model', () => {

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

    const response: CurrencyRate[] = await SessionAnalysisModel.getSessionAnalysisDesc(currencyCode);
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

    await expect(SessionAnalysisModel.getSessionAnalysisDesc(currencyCode)).rejects.toThrow(DatabaseError);
  });
})