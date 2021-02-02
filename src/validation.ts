import {validationResult}from 'express-validator';
import {Request,Response,NextFunction} from 'express';
const validator = (req:Request, res:Response, next:NextFunction)=>{
    const errors = validationResult(req)
    errors.array().length > 0 ? res.status(400).json({Error: "Bad request"}) : next()
}

module.exports = validator