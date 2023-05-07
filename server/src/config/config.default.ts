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
        uri: 'mongodb://localhost:27017/octopus',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        // 关联实体
        entities: [Task],
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
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'octopus',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,

        // 配置实体模型
        entities: [User],
      },
    },
  },
  jwt: {
    secret: 'mywebsite',
    expiresIn: '2d',
  },
} as MidwayConfig;
