import { Request, Response } from 'express';

class AnalysisModel{
  static getAnalysis(req: Request, res: Response) {
    return({a: 1})
  }
}


export default AnalysisModel;