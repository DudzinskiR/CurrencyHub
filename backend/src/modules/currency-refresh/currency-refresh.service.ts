import { getTableByCode } from "../../common/currency-validator/currency-validator";
import { CurrencyRate } from "../../interfaces/currency-rate";
import { DatePair } from "../../interfaces/currency-refresh";
import CurrencyRefreshModel from "./currency-refresh.model";

class CurrencyRefreshService {
  static async refreshCurrencyData(currencyCode: string) {
    const tableName = getTableByCode(currencyCode);
    const res = await CurrencyRefreshModel.getLastCurrencyRefresh(currencyCode);

    const startDate: Date = new Date();
    if(res) {
      startDate.setDate(res.time.getDate());
    } else {
      const newDate: Date = new Date();
      newDate.setFullYear(new Date().getFullYear() - 1);
      startDate.setTime(newDate.getTime());
    }

    if(!this.isOutdated(startDate)){
      return;
    }

    const dates = this.divideTime(startDate, new Date());

    let rates: CurrencyRate[] = [];
    for(const item of dates){
      const newRates = await CurrencyRefreshModel.getCurrencyRates(currencyCode, tableName, item.start, item.end);
      rates = [...rates, ...newRates];
    }
    await CurrencyRefreshModel.createNewRates(rates);

    if(!res) {
      await CurrencyRefreshModel.createNewRefresh({code: currencyCode, time: new Date()});
    } else {
      await CurrencyRefreshModel.updateRefresh({code: currencyCode, time: new Date()});
    }
  }

  static isOutdated(time: Date): boolean {
    return time.getTime() - new Date().getTime() < 0;
  }

  static divideTime(startDate: Date, endDate: Date, maxDay: number = 92): DatePair[] {
    const dates: DatePair[] = [];

    if(endDate.getTime() < startDate.getTime()){
      return dates;
    }

    const diffInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if(diffInDays <= maxDay){
      dates.push({start: startDate, end: endDate});
    } else {
      let currentDate = new Date(startDate);

      while(currentDate < endDate) {
        const nextDate = new Date(currentDate.getTime());
        nextDate.setDate(nextDate.getDate() + maxDay - 1);

        if(nextDate > endDate){
          dates.push({start: currentDate, end: endDate});
        } else {
          dates.push({start: currentDate, end: nextDate});
        }

        currentDate = new Date(nextDate.getTime() + 24 * 60 * 60 * 1000);
      }
    }
    return dates;
  }
}

export default CurrencyRefreshService;