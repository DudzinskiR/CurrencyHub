import { CurrencyPairData } from "../../interfaces/currency-pair-data";

class PairModel {
  static async getCurrencyDataDesc(code: string): Promise<CurrencyPairData[]>{
    return [];
  }
}

export default PairModel