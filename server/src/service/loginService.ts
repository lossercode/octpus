import { Inject, Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class LoginService {
  @Inject()
  jwtService: JwtService;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  async login(telephone: string) {
    console.log(telephone);
    const userOne = await this.userModel.findOne({
      where: {
        user_phone: telephone,
      },
    });
    const userName = userOne?.user_name || 'user';
    const userAvatar =
      userOne?.user_avatar ||
      'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
    const role = userOne?.role || 'user';
    if (!userOne) {
      const newUser = new User();
      newUser.registry_time = '2023-04-19 19:00:00';
      newUser.user_phone = telephone;
      await this.userModel.save(newUser);
    }
    //生成jwt返回
    const jwt = await this.jwtService.sign({
      telephone: telephone,
      date: Math.floor(Date.now() / 1000) - 30,
    });
    return {
      token: jwt,
      userName: userName,
      userAvatar: userAvatar,
      role: role,
    };
  }
}
