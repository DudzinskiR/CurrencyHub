import { timeBreakpoints } from "../../common/const";
import { validateCode } from "../../common/currency-validator/currency-validator";
import DateProcessor, { DateInfo } from "../../common/date-processor/date-processor";
import InvalidCurrencyError from "../../exceptions/invalid-currency.exception";
import { CurrencyStatistic } from "../../interfaces/currency-statistics";
import CurrencyRefreshService from "../currency-refresh/currency-refresh.service";
import {calcStandardDeviation, calcDominant, calcMedian, calcCoefficientOfVariation} from './helper'
import StatisticsModel from "./statistics.model";
class StatisticsService {
  static async getStatistics(currencyCode: string): Promise<CurrencyStatistic[]>{
    await CurrencyRefreshService.refreshCurrencyData(currencyCode);
    
    if(!validateCode(currencyCode)){
      throw new InvalidCurrencyError(currencyCode);
    }

    const data = await StatisticsModel.getStatisticsDesc(currencyCode);
    
    const dates: DateInfo[] = [];
    data.forEach(item => {
      dates.push({date: item.time, value:item.value});
    });

    const dateProcessor = new DateProcessor<CurrencyStatistic>()
      .setDates(dates)
      .setTimeBreakpoints(timeBreakpoints)
      .setCallback((tab: DateInfo[]): CurrencyStatistic => {
        const result: CurrencyStatistic = {
          median: calcMedian(tab),
          dominant: calcDominant(tab),
          deviation: calcStandardDeviation(tab),
          variation: calcCoefficientOfVariation(tab)
        }
        return result;
      })

    const output = dateProcessor.execute();

    return output;
  }
}

export default StatisticsService;