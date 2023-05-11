import { timeBreakpoints } from "../../common/const";
import { validateCode } from "../../common/currency-validator/currency-validator";
import DateProcessor, { DateInfo } from "../../common/date-processor/date-processor";
import InvalidCurrencyException from "../../exceptions/invalid-currency.exception";
import { Statistic } from "./statistics.interface";
import CurrencyRefreshService from "../currency-refresh/currency-refresh.service";
import {calcStandardDeviation, calcDominant, calcMedian, calcCoefficientOfVariation} from './helper'
import StatisticsModel from "./statistics.model";
class StatisticsService {
  static async getStatistics(currencyCode: string): Promise<Statistic[]>{
    
    if(!validateCode(currencyCode)){
      throw new InvalidCurrencyException(currencyCode);
    }

    await CurrencyRefreshService.refreshCurrencyData(currencyCode);
  
    const data = await StatisticsModel.getStatisticsDesc(currencyCode);
    
    const dates: DateInfo[] = [];
    data.forEach(item => {
      dates.push({date: item.time, value:item.value});
    });

    const dateProcessor = new DateProcessor<Statistic>()
      .setDates(dates)
      .setTimeBreakpoints(timeBreakpoints)
      .setCallback((tab: DateInfo[]): Statistic => {
        const result: Statistic = {
          median: Number(calcMedian(tab).toFixed(6)),
          dominant: calcDominant(tab),
          deviation: Number(calcStandardDeviation(tab).toFixed(6)),
          variation: Number(calcCoefficientOfVariation(tab).toFixed(6))
        }
        return result;
      })

    const output = dateProcessor.execute();

    return output;
  }
}

export default StatisticsService;