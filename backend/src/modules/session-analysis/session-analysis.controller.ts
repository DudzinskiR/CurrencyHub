import { Request, Response } from 'express';
import AnalysisService from './session-analysis.service';
import Exception from '../../exceptions/exception';

class SessionAnalysisController {
  static async getSessionAnalysis(req: Request, res: Response) 
  {
    try {
      const data = await AnalysisService.getSessionAnalysis(`${req.query.code}`);
      res.status(200).json(data);

    } catch(e) {
      if(e instanceof Exception){
        res.status(e.code).json({status: "error", message: e.message});
      } else {
        res.status(500).json({status: "error", message: "Unknown error"})
      }
    }
  }
}

export default SessionAnalysisController