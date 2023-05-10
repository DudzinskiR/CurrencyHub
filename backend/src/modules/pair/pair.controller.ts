import { Request, Response } from 'express';
import Exception from "../../exceptions/exception";

class PairController {
  static async getPairDate(req: Request, res: Response) {
    try {
      res.status(200).json({"ok": "ok"});
    } catch(e) {
      if(e instanceof Exception){
        res.status(e.code).json({status: "error", message: e.message});
      }
    }
  }
}

export default PairController;