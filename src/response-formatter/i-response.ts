import { IServiceResponse } from "./i-service-response";
import { response } from 'express';

export class IResponse<T>{
    status: number;
    data: any;
    message: string;
    
   constructor (obj : IServiceResponse<T>){    
    console.log(typeof obj);
    
        this.status = 200;
        this.message = "";
        this.data = obj?.data;

        
    }
}