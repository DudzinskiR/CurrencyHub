import { Request, Response } from 'express';
import Exception from "../../exceptions/exception";
import StatisticsService from './statistics.service';

class StatisticsController {
  static async getStatistics(req: Request, res: Response){
    try {
      const data = await StatisticsService.getStatistics(`${req.query.code}`);
      res.status(200).json({ok: "ok"});
    } catch (e) {
      if(e instanceof Exception){
        res.status(e.code).json({status: "error", message: e.message});
      }
    }
  }
}

export default StatisticsController;

