import db from '../../db/db'
import DatabaseError from '../../exceptions/database-error.exception';
import { TABLE_NAME } from '../../common/table-name.enum';
import { CurrencyRate } from '../../interfaces/currency-rate';

class SessionAnalysisModel{
  static async getSessionAnalysisDesc(currencyCode: string): Promise<CurrencyRate[]> {
    try{
      const today = new Date();
      const res: CurrencyRate[] = await db(TABLE_NAME.CURRENCY_RATES)
        .select("time").select("value")
        .where({code: currencyCode}).where("time", ">", new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()))
        .orderBy('time', 'desc');
      return res;
    } catch (e){
      throw new DatabaseError();
    }
  }
}


export default SessionAnalysisModel;