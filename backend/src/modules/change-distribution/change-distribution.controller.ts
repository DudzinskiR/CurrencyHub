import { Request, Response } from 'express';
import Exception from "../../exceptions/exception";
import ChangeDistributionService from './change-distribution.service';

class ChangeDistributionController {
  static async getChangeDistribution(req: Request, res: Response) {
    try {
      const data = await ChangeDistributionService.getChangeDistribution(`${req.query.one}`, `${req.query.two}`, 5);
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

export default ChangeDistributionController;