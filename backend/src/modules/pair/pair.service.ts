import { Request, Response } from 'express';
import Exception from "../../exceptions/exception";
import { CurrencyPair } from '../../interfaces/currency-pair';

class PairService {
  static async getPairDate(codeOne: string, codeTwo: string): Promise<CurrencyPair[]> {
    return [];
  }
}

export default PairService;