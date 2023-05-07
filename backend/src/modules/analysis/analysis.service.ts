import { Request, Response } from 'express';
import AnalysisModel from './analysis.model';

class AnalysisService {
  static getAnalysis(req: Request, res: Response) {
    return AnalysisModel.getAnalysis(req, res)
  }
}

export default AnalysisService;