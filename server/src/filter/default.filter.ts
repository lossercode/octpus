import { Catch } from '@midwayjs/core';
// import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error) {
    console.log(err);
    // 所有的未分类错误会到这里
    return {
      code: 500,
      message: err.message,
      data: null,
    };
  }
}
