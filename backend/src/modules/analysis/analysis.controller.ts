import { Request, Response } from 'express';
import AnalysisService from './analysis.service';

class AnalysisController {
  static getAnalysis(req: Request, res: Response) {
    res.json(AnalysisService.getAnalysis(req, res))
  }
}

export default AnalysisController