import { NextFunction } from "express";
import users from "../db";
import { Request, Response } from "express";

function checkExistsUserAccount(req:Request, res:Response, next:NextFunction){
    const {username} : {username:string} = req.headers as {username:string};
    if((users.findIndex((value) => username == value.username)) !== -1){
      next()
    }
    res.status(404).json("NOT FOUND")
  }



  export default checkExistsUserAccount;