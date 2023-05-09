import AnalysisModel from './analysis.model';
import CurrencyRefreshService from '../currency-refresh/currency-refresh.service';
import { getTableByCode, validateCode } from '../../common/currency-validator/currency-validator';
import InvalidCurrencyError from '../../exceptions/invalid-currency.exception';
import { currencyAnalysis } from '../../interfaces/currency-analysis';

class AnalysisService {
  static async getAnalysis(currencyCode: string) {
    await CurrencyRefreshService.refreshCurrencyData(currencyCode);

    if(!validateCode(currencyCode)){
      throw new InvalidCurrencyError(currencyCode);
    }

    const data = await AnalysisModel.getAnalysisDesc(currencyCode)
    
    const result: currencyAnalysis[] = [
      { up: 0, const: 0, down: 0 },
      { up: 0, const: 0, down: 0 },
      { up: 0, const: 0, down: 0 },
      { up: 0, const: 0, down: 0 },
      { up: 0, const: 0, down: 0 },
      { up: 0, const: 0, down: 0 },
    ];
    
    const timeBreakpoint = [7, 14, 30, 90, 180, 9999];
    let timeIndex = 0;
    
    const daysDiff = (start: Date, end: Date) => {
      return Math.floor((start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24))
    };
    
    for(let i = 1; i < data.length; i++){
      if(daysDiff(new Date(), data[i].time) > timeBreakpoint[timeIndex]) {
        timeIndex++;
      }
      
      const valueDiff = data[i].value - data[i - 1].value;

      if(valueDiff > 0) {
        result[timeIndex].up++;
      } else if(valueDiff === 0) {
        result[timeIndex].const++;
      } else {
        result[timeIndex].down++;
      }
    }
    const output: currencyAnalysis[] = [];

    for(let i = 0; i < result.length; i++) {
      const temp: currencyAnalysis = {up: 0, const: 0, down: 0};
      for(let j = 0; i >= j; j++){
        temp.up += result[j].up;
        temp.const += result[j].const;
        temp.down += result[j].down;
      }
      output.push(temp);
    }

    return output;
  }
}

export default AnalysisService;