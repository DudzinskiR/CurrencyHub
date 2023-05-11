import db from "../../db/db";
import DatabaseException from "../../exceptions/database-error.exception";
import { TABLE_NAME } from "../../common/table-name.enum";
import { CurrencyRate } from "../../interfaces/currency-rate";

class ChangeDistributionModel {
  static async getCurrencyDataDesc(code: string): Promise<CurrencyRate[]>{
    try {  
      const today = new Date();
      const res: CurrencyRate[] = await db(TABLE_NAME.CURRENCY_RATES)
        .select("time").select("value").distinct()
        .where({code: code}).where("time", ">", new Date(today.getFullYear(), today.getMonth() - 3, today.getDate()))
        .orderBy('time', 'desc');
      return res;
    } catch (e){
      throw new DatabaseException();
    }
  }
}

export default ChangeDistributionModel