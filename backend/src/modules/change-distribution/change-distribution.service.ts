import { ChangeDistribution } from './change-distribution.interface';
import { validateCode } from '../../common/currency-validator/currency-validator';
import InvalidCurrencyException from '../../exceptions/invalid-currency.exception';
import CurrencyRefreshService from '../currency-refresh/currency-refresh.service';
import ChangeDistributionModel from './change-distribution.model';
import DateProcessor, { DateInfo } from '../../common/date-processor/date-processor';
import { pairTimeBreakpoints } from '../../common/const';

class ChangeDistributionService {
  static async getChangeDistribution(codeOne: string, codeTwo: string, numBins: number): Promise<ChangeDistribution[]> {
    if(!validateCode(codeOne)){
      throw new InvalidCurrencyException(codeOne);
    }

    if(!validateCode(codeTwo)){
      throw new InvalidCurrencyException(codeTwo);
    }
    
    if(numBins < 1)
      numBins = 1;

    await CurrencyRefreshService.refreshCurrencyData(codeOne);
    await CurrencyRefreshService.refreshCurrencyData(codeTwo);

    const currencyOne = await ChangeDistributionModel.getCurrencyDataDesc(codeOne);
    const currencyTwo = await ChangeDistributionModel.getCurrencyDataDesc(codeTwo);

    const data: DateInfo[] = [];
    
    for(const item of currencyOne){
      const currencyFound = currencyTwo.find(curr => curr.time.getTime() === item.time.getTime());
      
      if(!currencyFound)
        continue;
      
      data.push({
        date: item.time,
        value: item.value / currencyFound.value
      })
    };
    const dateProcessor = new DateProcessor<ChangeDistribution>()
      .setDates(data)
      .setTimeBreakpoints(pairTimeBreakpoints)
      .setCallback((tab: DateInfo[]): ChangeDistribution => {
        const output: ChangeDistribution = { scopes: [], values: [] }
        
        const currencyRatio: DateInfo[] = [];        
        for(let i = 1; i < tab.length; i++){
          currencyRatio.push({
            date: tab[i].date,
            value: (tab[i - 1].value - tab[i].value) / tab[i].value
          })
        }
        
        const values = currencyRatio.map(item => item.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        
        const binWidth = (maxValue - minValue) / (numBins);
        
        const histogram: number[] = new Array(numBins).fill(0);
         
        for(const item of currencyRatio){
          let binIndex = Math.floor((item.value - minValue) / binWidth);
          if(binIndex > numBins - 1) {
            binIndex -= 1;
          }
          histogram[binIndex]++;
        }

        const sum = histogram.reduce((acc, value) => acc += value);
        output.values = histogram.map(item => Math.round((item / sum) * 100));
        for(let i = 0; i < numBins; i++){
          output.scopes.push({
            start: Number((minValue + (binWidth * i)).toFixed(6)) || 0,
            end: Number((minValue + (binWidth * (i + 1))).toFixed(6)) || 0,
          })
        }
        return output;
      })

    const result = dateProcessor.execute()
    return result;
  }
}

export default ChangeDistributionService;