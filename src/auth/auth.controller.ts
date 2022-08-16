import { Body, Controller, Inject, Injectable, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IResponse } from 'src/response-formatter/i-response';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('validate-user')
    async checkUser(@Body() userInfo) {
        return new IResponse(await this.authService.validateUser(userInfo.email, userInfo.password))
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return new IResponse(await this.authService.login(req.user));
    }
}
