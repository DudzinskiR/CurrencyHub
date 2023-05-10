import AnalysisModel from './analysis.model';
import CurrencyRefreshService from '../currency-refresh/currency-refresh.service';
import { getTableByCode, validateCode } from '../../common/currency-validator/currency-validator';
import InvalidCurrencyError from '../../exceptions/invalid-currency.exception';
import { currencyAnalysis } from '../../interfaces/currency-analysis';
import DateProcessor, { DateInfo } from '../../common/date-processor/date-processor';
import { timeBreakpoints } from '../../common/const';

class AnalysisService {
  static async getAnalysis(currencyCode: string) {
    await CurrencyRefreshService.refreshCurrencyData(currencyCode);

    if(!validateCode(currencyCode)){
      throw new InvalidCurrencyError(currencyCode);
    }

    const data = await AnalysisModel.getAnalysisDesc(currencyCode)
    
    const dates: DateInfo[] = [];
    data.forEach(item => {
      dates.push({date: item.time, value:item.value});
    })

    const dateProcessor = new DateProcessor<currencyAnalysis>().setDates(dates).setTimeBreakpoints(timeBreakpoints);
    dateProcessor.setCallback((tab: DateInfo[]): currencyAnalysis => {
      const result = { up: 0, const: 0, down: 0 };

      for(let i = 1; i < tab.length; i++){
        const valueDiff = data[i].value - data[i - 1].value;

        if(valueDiff > 0) {
          result.up++;
        } else if(valueDiff === 0) {
          result.const++;
        } else {
          result.down++;
        }
      }
      return result;
    });
    return dateProcessor.execute();
  }
}

export default AnalysisService;