
import knex from 'knex';
import db from '../../db/db'
import { CurrencyRefreshData } from '../../interfaces/currency-refresh';
import { TABLE_NAME } from '../common/common.enum';
import { CurrencyRate } from '../../interfaces/currency-rate'
import axios from 'axios';
import ExternalError from '../../exceptions/external-error.exception';

class CurrencyRefreshModel{
  static async getLastCurrencyRefresh(currencyCode: string): Promise<CurrencyRefreshData | undefined> {
    const res = await db(TABLE_NAME.CURRENCY_REFRESH).select('time').where('code', currencyCode);
    return res[0];
  }

  static async getCurrencyRates(currencyCode: string, table: 'A' | 'B', startDate: Date, endDate: Date): Promise<CurrencyRate[]> {
    const rates: CurrencyRate[] = []

    try {
      const url = `http://api.nbp.pl/api/exchangerates/rates/${table}/${currencyCode}/${startDate.toISOString().split('T')[0]}/${endDate.toISOString().split('T')[0]}?format=json`;
      const response = await axios.get(url);
      for(const item of response.data.rates){
        rates.push({
          code: currencyCode,
          time: new Date(item.effectiveDate),
          value: item.mid
        })
      }
    } catch (err){
      throw new ExternalError();
    }
    return rates;
  }

  static async createNewRefresh(data: CurrencyRefreshData) {
    await db(TABLE_NAME.CURRENCY_REFRESH).insert(data);
  }

  static async updateRefresh(data: CurrencyRefreshData) {
    await db(TABLE_NAME.CURRENCY_REFRESH).where({code: data.code}).update(data)
  }

  static async createNewRates(rates: CurrencyRate[]){
    await db(TABLE_NAME.CURRENCY_RATES).insert(rates);
  }
}


export default CurrencyRefreshModel;