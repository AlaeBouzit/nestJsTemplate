import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import * as bcrypt from "bcrypt";
import { IServiceResponse } from 'src/response-formatter/i-service-response';
import { GetUserDto } from 'src/dto/responses/get-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService { 
    constructor(private usersService: UserService, private jwtService:JwtService) {}

async validateUser(email: string, pass: string): Promise<IServiceResponse<GetUserDto>> {
    try{
        console.log("dzt mnhna");
        
        const userResponse = await this.usersService.getUserByEmail(email);
        console.log(userResponse);
        
        if (userResponse && userResponse.data) {
          const user = userResponse.data;
          const isPasswordValid = await bcrypt.compare(pass, user.password);
          console.log(isPasswordValid);
          
          if(isPasswordValid){
            const result = new GetUserDto(user);
            console.log(result);
            
            return new IServiceResponse(result);
          }
        }
        throw new BadRequestException("user dosn't exist")
    }
    catch(execption){
        throw new BadRequestException(execption)
    }
}

async login(user: any) {
  const payload = { username: user.username, sub: user.id };
  return new IServiceResponse({
    ...user.data,
    access_token: this.jwtService.sign(payload),
  });
}
}
