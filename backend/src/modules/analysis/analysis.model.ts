import db from '../../db/db'
import DatabaseError from '../../exceptions/database-error.exception';
import { CurrencyAnalysisData } from '../../interfaces/currency-analysis-data';
import { TABLE_NAME } from '../common/common.enum';

class AnalysisModel{
  static async getAnalysisDesc(currencyCode: string): Promise<CurrencyAnalysisData[]> {
    try{
      const today = new Date();
      const res: CurrencyAnalysisData[] = await db(TABLE_NAME.CURRENCY_RATES)
        .select("time").select("value")
        .where({code: currencyCode}).where("time", ">", new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()))
        .orderBy('time', 'desc');
      return res;
    } catch (e){
      throw new DatabaseError();
    }
  }
}


export default AnalysisModel;