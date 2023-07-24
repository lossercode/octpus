import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';
import { Task } from '../entity/task';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1681524609191_1789',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
  },
  mongoose: {
    dataSource: {
      default: {
        uri: 'mongodb://192.168.200.130:27017/octopus',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        // 关联实体
        entities: ['**/entity/*{.ts,.js}'],
      },
    },
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'mysql',
        host: '192.168.200.130',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'octopus',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,

        // 配置实体模型
        entities: [User, Task],
      },
    },
  },
  jwt: {
    secret: 'mywebsite',
    expiresIn: '2d',
  },
  redis: {
    client: {
      port: 6379, // Redis port
      host: '192.168.200.130', // Redis host
      password: '',
      db: 0,
    },
  },
} as MidwayConfig;
