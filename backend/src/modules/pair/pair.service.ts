import { CurrencyPair } from '../../interfaces/currency-pair';
import { validateCode } from '../../common/currency-validator/currency-validator';
import InvalidCurrencyException from '../../exceptions/invalid-currency.exception';
import CurrencyRefreshService from '../currency-refresh/currency-refresh.service';
import PairModel from './pair.model';
import DateProcessor, { DateInfo } from '../../common/date-processor/date-processor';
import { pairTimeBreakpoints, timeBreakpoints } from '../../common/const';

class PairService {
  static async getPairDate(codeOne: string, codeTwo: string, numBins: number): Promise<CurrencyPair[]> {
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

    const currencyOne = await PairModel.getCurrencyDataDesc(codeOne);
    const currencyTwo = await PairModel.getCurrencyDataDesc(codeTwo);

    const data: DateInfo[] = [];
    
    for(const item of currencyOne){
      const currencyFound = currencyTwo.find(curr => curr.time.toLocaleDateString("en-US") === item.time.toLocaleDateString("en-US"));
      
      if(!currencyFound)
        continue;
      
      data.push({
        date: item.time,
        value: item.value / currencyFound.value
      })
    };
    const dateProcessor = new DateProcessor<CurrencyPair>()
      .setDates(data)
      .setTimeBreakpoints(pairTimeBreakpoints)
      .setCallback((tab: DateInfo[]): CurrencyPair => {
        const output: CurrencyPair = { scopes: [], values: [] }
        
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


        output.values = histogram;
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

export default PairService;