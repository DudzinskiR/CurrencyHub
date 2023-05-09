import db from "../../db/db";
import DatabaseError from "../../exceptions/database-error.exception";
import { CurrencyStatisticsData } from "../../interfaces/currency-statistics-data";
import { TABLE_NAME } from "../common/common.enum";

class StatisticsModel {
  static async getStatisticsDesc(currencyCode: string){
    try {
      const today = new Date();
      const res: CurrencyStatisticsData[] = await db(TABLE_NAME.CURRENCY_RATES)
        .select("time").select("value")
        .where({code: currencyCode}).where("time", ">", new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()))
        .orderBy('time', 'desc');
      return res;
    } catch(e) {
      throw new DatabaseError();
    }
  }
}

export default StatisticsModel;