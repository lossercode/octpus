import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { JwtService } from '@midwayjs/jwt';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class LoginService {
  @Inject()
  jwtService: JwtService;

  @Inject()
  redisService: RedisService;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  async generateVerifyCode(userAccount: string) {
    const code = Math.floor(Math.random() * (10000 - 1000) + 1000);
    // 设置验证码过期时间 5分钟
    await this.redisService.set(userAccount, code, 'EX', 60 * 5);
    return code;
  }

  async login(userAccount: string, code: string) {
    // 判断验证码是否正确
    const verifyCode = await this.redisService.get(userAccount);
    if (verifyCode !== code) {
      throw new Error('验证码错误');
    }

    let userOne = await this.userModel.findOne({
      where: {
        userAccount: userAccount,
      },
    });

    //生成jwt返回
    const jwt = await this.jwtService.sign({
      userAccout: userAccount,
      date: Math.floor(Date.now() / 1000) - 30,
    });

    if (!userOne) {
      userOne = new User();
      userOne.userAccount = userAccount;
      await this.userModel.save(userOne);
    }

    return {
      token: jwt,
      userId: userOne.id,
      userAccount: userOne.userAccount,
      userAvatar: userOne.userAvatar,
      userRole: userOne.userRole,
    };
  }
}
