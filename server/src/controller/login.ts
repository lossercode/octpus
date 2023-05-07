import { Body, Controller, Get, Post } from '@midwayjs/core';
import { Inject } from '@midwayjs/decorator';
import { LoginService } from '../service/loginService';
@Controller('/api/login')
export class UserRelated {
  @Inject()
  loginService: LoginService;

  @Get()
  async loginVerifyCode() {
    return {
      message: 'success',
      data: 1997,
      code: 200,
    };
  }

  @Post()
  async login(@Body('telephone') telephone: string) {
    const userInfo = await this.loginService.login(telephone);
    console.log(userInfo);
    return {
      code: 200,
      message: 'success',
      data: userInfo,
    };
  }
}
