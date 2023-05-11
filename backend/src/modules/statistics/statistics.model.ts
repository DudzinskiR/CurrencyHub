import db from "../../db/db";
import DatabaseException from "../../exceptions/database-error.exception";
import { TABLE_NAME } from "../../common/table-name.enum";
import { CurrencyRate } from "../../interfaces/currency-rate";

class StatisticsModel {
  static async getStatisticsDesc(code: string): Promise<CurrencyRate[]>{
    try {
      const today = new Date();
      const res: CurrencyRate[] = await db(TABLE_NAME.CURRENCY_RATES)
        .select("time").select("value").distinct()
        .where({code: code}).where("time", ">", new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()))
        .orderBy('time', 'desc');
      return res;
    } catch(e) {
      throw new DatabaseException();
    }
  }
}

export default StatisticsModel;