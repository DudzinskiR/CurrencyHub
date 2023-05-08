import { Request, Response } from 'express';
import AnalysisService from './analysis.service';

class AnalysisController {
  static async getAnalysis(req: Request, res: Response) 
  {
    const e = await AnalysisService.getAnalysis(`${req.query.code}`);
    res.status(200).json({ss: 1});
  }
}

export default AnalysisController