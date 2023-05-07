import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
// import { Context } from '@midwayjs/koa';

@Catch(httpError.UnauthorizedError)
export class UnauthorizedErrorFilter {
  async catch(err: MidwayHttpError) {
    // 未登录错误
    return {
      code: err.status,
      message: '请先登录',
      data: '',
    };
  }
}
