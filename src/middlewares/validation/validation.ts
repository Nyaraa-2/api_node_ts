import { NextFunction } from "connect";
import { validationResult } from "express-validator";
import {Request, Response} from 'express';

const validate  = (req: Request, res: Response, next: NextFunction) : void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json(errors);
    else next();
  }

export {validate}