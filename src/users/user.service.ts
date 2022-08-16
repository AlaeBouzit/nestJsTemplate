import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'express';
import { ServerResponse } from 'http';
import { CreateUserDto } from 'src/dto/requests/create-user.dto';
import { GetUserDto } from 'src/dto/responses/get-user.dto';
import { User } from 'src/entities/user.entity';
import { IServiceResponse } from 'src/response-formatter/i-service-response';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User)private readonly userDao:Repository<User>){
    
  }
  async getUsers(): Promise<GetUserDto[]> {
    try{
      const userResult: GetUserDto[] = await this.userDao.find({});
      if(userResult){
        return Promise.resolve(userResult);
      }
      return Promise.resolve([])
    }
    catch(exeptions){
      return Promise.reject(new BadRequestException("some things goes wrong"))
    }
  }
  
  async createUser(userInfo: CreateUserDto): Promise<CreateUserDto>{
    try{
      console.log(userInfo);
      const salt = await bcrypt.genSalt();
      const userClone= {...userInfo};
      userClone.password=await bcrypt.hash(userClone.password, salt);
      const userResult = await this.userDao.save(userClone);
      if(userResult){
        return userResult;
      }
      throw new BadRequestException("some things goes wrong")
    }
    catch(exeptions){      
      throw new BadRequestException(exeptions.sqlMessage || "some things goes wrong 1")
    }
  
  }
  async getUser(id:number): Promise<IServiceResponse<GetUserDto>> {
    try{
      const userResult = await this.userDao.findOneBy({id});
      
      
      if(userResult){
        console.log(userResult);
        const user = new GetUserDto({...userResult})
        return Promise.resolve(new IServiceResponse(user));
      }
      throw new  BadRequestException("some things goes wrong")

    }
    catch(exeptions){
      throw new BadRequestException("some things goes wrong")
    }
  }
  async getUserByEmail(email:string): Promise<IServiceResponse<User>> {
    try{
      const userResult = await this.userDao.findOneBy({email});
      
      
      if(userResult){
        console.log(userResult);
        console.log("hadi");
        
        const user = new GetUserDto({...userResult})
        return Promise.resolve(new IServiceResponse(user));
      }
      throw new  BadRequestException("some things goes wrong")

    }
    catch(exeptions){
      throw new BadRequestException("some things goes wrong")
    }
  }
}
