import { Request, Response } from 'express';
import Exception from "../../exceptions/exception";
import PairService from './pair.service';

class PairController {
  static async getPairDate(req: Request, res: Response) {
    try {
      const data = await PairService.getPairDate(`${req.query.one}`, `${req.query.two}`, 5);
      res.status(200).json(data);
    } catch(e) {
      if(e instanceof Exception){
        res.status(e.code).json({status: "error", message: e.message});
      }
    }
  }
}

export default PairController;