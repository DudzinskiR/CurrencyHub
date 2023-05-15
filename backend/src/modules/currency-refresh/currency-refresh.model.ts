import db from '../../db/db'
import { CurrencyRefreshData } from '../../interfaces/currency-refresh';
import { TABLE_NAME } from '../../common/table-name.enum';
import { CurrencyRate } from '../../interfaces/currency-rate'
import axios from 'axios';
import ExternalException from '../../exceptions/external-error.exception';
import DatabaseException from '../../exceptions/database-error.exception';

class CurrencyRefreshModel{
  static async getLastCurrencyRefresh(currencyCode: string): Promise<CurrencyRefreshData | undefined> {
    try{
      const res = await db(TABLE_NAME.CURRENCY_REFRESH).select('time').where('code', currencyCode);
      
      if(res.length === 0)
        return undefined;

      const output: CurrencyRefreshData = {
        code: currencyCode,
        time: new Date(res[0].time)
      } 

      return output;
    } catch (e){
      throw new DatabaseException();
    }
  }

  static async fetchCurrencyRates(currencyCode: string, table: 'A' | 'B', startDate: Date, endDate: Date): Promise<CurrencyRate[]> {
    const rates: CurrencyRate[] = []

    try {
      const url = `http://api.nbp.pl/api/exchangerates/rates/${table}/${currencyCode}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}?format=json`;
      const response = await axios.get(url, {timeout: 30000});
      for(const item of response.data.rates){
        rates.push({
          code: currencyCode,
          time: new Date(item.effectiveDate),
          value: item.mid
        })
      }
    } catch (err){
      throw new ExternalException();
    }
    return rates;
  }

  static async createNewRefresh(data: CurrencyRefreshData) {
    try{
      await db(TABLE_NAME.CURRENCY_REFRESH).insert(data);
    } catch (e){
      throw new DatabaseException();
    }
  }

  static async updateRefresh(data: CurrencyRefreshData) {
    try{
      await db(TABLE_NAME.CURRENCY_REFRESH).where({code: data.code}).update(data)
    } catch (e){
      throw new DatabaseException();
    }
  }

  static async createNewRates(rates: CurrencyRate[]){
    try{
      await db(TABLE_NAME.CURRENCY_RATES).insert(rates);
    } catch (e){
      throw new DatabaseException();
    }
  }
}


export default CurrencyRefreshModel;