
import knex from 'knex';
import db from '../../db/db'
import { CurrencyRefreshData } from '../../interfaces/currency-refresh';
import { TABLE_NAME } from '../common/common.enum';

class CurrencyRefreshModel{
  static async getLastCurrencyRefresh(currencyCode: string): Promise<CurrencyRefreshData> {
    const res = await db(TABLE_NAME.CURRENCY_REFRESH).select('time').where('code', currencyCode);
    return res[0];
  }
}


export default CurrencyRefreshModel;