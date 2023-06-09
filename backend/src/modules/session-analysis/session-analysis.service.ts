import SessionAnalysisModel from './session-analysis.model';
import CurrencyRefreshService from '../currency-refresh/currency-refresh.service';
import { validateCode } from '../../common/currency-validator/currency-validator';
import InvalidCurrencyException from '../../exceptions/invalid-currency.exception';
import { SessionAnalysis } from './session-analysis.interface';
import DateProcessor, { DateInfo } from '../../common/date-processor/date-processor';
import { timeBreakpoints } from '../../common/const';

class SessionAnalysisService {
  static async getSessionAnalysis(code: string): Promise<SessionAnalysis[]> {
    await CurrencyRefreshService.refreshCurrencyData(code);

    if(!validateCode(code)){
      throw new InvalidCurrencyException(code);
    }

    const data = await SessionAnalysisModel.getSessionAnalysisDesc(code)
    
    const dates: DateInfo[] = [];
    data.forEach(item => {
      dates.push({date: item.time, value:item.value});
    })

    const dateProcessor = new DateProcessor<SessionAnalysis>().setDates(dates).setTimeBreakpoints(timeBreakpoints);
    dateProcessor.setCallback((tab: DateInfo[]): SessionAnalysis => {
      const result = { up: 0, const: 0, down: 0 };

      for(let i = 1; i < tab.length; i++){
        const valueDiff = data[i].value - data[i - 1].value;

        if(valueDiff > data[i - 1].value * 0.05 / 100) {
          result.up++;
        } else if(valueDiff < -data[i - 1].value * 0.05 / 100) {
          result.down++;
        } else {
          result.const++;
        }
      }
      return result;
    });
    return dateProcessor.execute();
  }
}

export default SessionAnalysisService;