import { Body, Controller, ExecutionContext, Get, Param, ParseIntPipe, Post, Req, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/dto/requests/create-user.dto';
import { GetUserDto } from 'src/dto/responses/get-user.dto';
import { User } from 'src/entities/user.entity';
import { IResponse } from 'src/response-formatter/i-response';
import { IServiceResponse } from 'src/response-formatter/i-service-response';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  
  constructor(private readonly userService: UserService) {}
  
  @Get('/')
  async getUsers(): Promise<GetUserDto[]> {
    return this.userService.getUsers();
  }

  @Post('/')
  async postUser(@Body() userInfo: CreateUserDto): Promise<CreateUserDto> {    
    return this.userService.createUser(userInfo);
  }

  @Get('/:id')
   async getUser(@Param('id',ParseIntPipe) id: number, @Res() res: Response): Promise<any>{           
    return new IResponse(await this.userService.getUser(id))
  }

  
}
