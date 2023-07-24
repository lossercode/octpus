import { Body, Controller, Post } from '@midwayjs/core';
import { Inject } from '@midwayjs/decorator';
import { LoginService } from '../service/loginService';
@Controller('/api/user')
export class UserRelated {
  @Inject()
  loginService: LoginService;

  @Post('/verify')
  async loginVerifyCode(@Body('userAccount') userAccount: string) {
    const verifyCode = await this.loginService.generateVerifyCode(userAccount);
    return {
      message: 'success',
      data: {
        code: verifyCode,
      },
      code: 200,
    };
  }

  @Post('/login')
  async login(
    @Body('userAccount') userAccount: string,
    @Body('verifyCode') code: string
  ) {
    const userInfo = await this.loginService.login(userAccount, code);
    if (!userInfo) {
      return {
        code: 200,
        message: '验证码错误',
        data: '',
      };
    }
    return {
      code: 200,
      message: 'success',
      data: userInfo,
    };
  }
}
