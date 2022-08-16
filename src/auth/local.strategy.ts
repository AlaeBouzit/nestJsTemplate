import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IServiceResponse } from 'src/response-formatter/i-service-response';
import { GetUserDto } from 'src/dto/responses/get-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<IServiceResponse<GetUserDto>> {
    
    const user = await this.authService.validateUser(email, password);
    
    if (!user||!user.data) {
      throw new UnauthorizedException();
    }
    console.log();
    
    return new IServiceResponse(user.data);
  }
}