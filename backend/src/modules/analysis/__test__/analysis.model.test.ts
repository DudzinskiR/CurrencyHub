import db from "../../../db/db";
import DatabaseError from "../../../exceptions/database-error.exception";
import { CurrencyAnalysisData } from "../../../interfaces/currency-analysis-data";
import { CurrencyRate } from "../../../interfaces/currency-rate";
import CurrencyRefreshModel from "../../currency-refresh/currency-refresh.model";
import AnalysisModel from "../analysis.model";

describe('s', () => {

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

    const response: CurrencyAnalysisData[] = await AnalysisModel.getAnalysisDesc(currencyCode);
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

    await expect(AnalysisModel.getAnalysisDesc(currencyCode)).rejects.toThrow(DatabaseError);
  });
})