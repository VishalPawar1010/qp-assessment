import { Request } from "express";
export interface IGetUserAuthInfoRequest extends Request {
  headers: {
    authorization: string;
  };
  user: any;
}


