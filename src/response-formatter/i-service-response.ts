import { HttpStatus } from "@nestjs/common";

export class IServiceResponse<T>{
    status: boolean;
    data: any;
    message: string;
    
   constructor (obj : T){
        this.status = true;
        this.message = "";
        this.data = obj;
    }
}