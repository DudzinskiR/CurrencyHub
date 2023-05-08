import { Request, Response } from 'express';
import AnalysisService from './analysis.service';
import Exception from '../../exceptions/exception';

class AnalysisController {
  static async getAnalysis(req: Request, res: Response) 
  {
    try {
      const data = await AnalysisService.getAnalysis(`${req.query.code}`);
      res.status(200).json({ss: 1});

    } catch(e) {
      if(e instanceof Exception){
        res.status(e.code).json({status: "error", message: e.message});
      }
    }
  }
}

export default AnalysisController