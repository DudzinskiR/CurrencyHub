import db from "../../db/db";
import DatabaseError from "../../exceptions/database-error.exception";
import { CurrencyAnalysisData } from "../../interfaces/currency-analysis-data";
import { CurrencyPairData } from "../../interfaces/currency-pair-data";
import { TABLE_NAME } from "../common/common.enum";

class ChangeDistributionModel {
  static async getCurrencyDataDesc(code: string): Promise<CurrencyPairData[]>{
    try {  
      const today = new Date();
      const res: CurrencyAnalysisData[] = await db(TABLE_NAME.CURRENCY_RATES)
        .select("time").select("value")
        .where({code: code}).where("time", ">", new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()))
        .orderBy('time', 'desc');
      return res;
    } catch (e){
      throw new DatabaseError();
    }
  }
}

export default ChangeDistributionModel