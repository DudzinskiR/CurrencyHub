import db from "../../../db/db";
import DatabaseError from "../../../exceptions/database-error.exception";
import { CurrencyRate } from "../../../interfaces/currency-rate";
import CurrencyRefreshModel from "../../currency-refresh/currency-refresh.model";
import PairModel from "../change-distribution.model";

describe("PairModel", () => {
  beforeEach(async () => {
    await db.migrate.down();
    await db.migrate.latest();
  });

  it('should create and retrieve currency rates for USD', async () => {
    const mockCode = 'USD';

    const mockData: CurrencyRate[] = [
      { code: mockCode, time: new Date(), value: 5 },
      { code: mockCode, time: new Date(), value: 4 },
      { code: mockCode, time: new Date(), value: 6 },
    ];


    await CurrencyRefreshModel.createNewRates(mockData);

    const response: CurrencyRate[] = await PairModel.getCurrencyDataDesc(mockCode);

    for(const index in response){
      expect({time: response[index].time, value: response[index].value}).toEqual({time: mockData[index].time.getTime(), value: mockData[index].value});
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

    await expect(PairModel.getCurrencyDataDesc(currencyCode)).rejects.toThrow(DatabaseError);
  });
})