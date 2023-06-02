import {
  WSController,
  OnWSConnection,
  Inject,
  WSBroadCast,
  OnWSMessage,
  OnWSDisConnection,
} from '@midwayjs/core';
import { Context } from '@midwayjs/ws';
import * as http from 'http';

@WSController()
export class HelloSocketController {
  @Inject()
  ctx: Context;

  @OnWSConnection()
  async onConnectionMethod(socket: Context, request: http.IncomingMessage) {
    console.log(socket.readyState);
    console.log(request.method);
    console.log(`namespace / got a connection ${this.ctx.readyState}`);
  }

  @OnWSMessage('message')
  @WSBroadCast()
  async gotMyMessage(data: string) {
    //根据id判断是哪一个任务
    //下面是模拟测试
    console.log(data);
    if (Math.round(Math.random() * 1000) < 10) {
      return {
        statu: 'end',
      };
    }
    return {
      statu: 'ok',
      category: new Date().getTime(),
      seriesData: Math.round(Math.random() * 1000),
    };
  }

  @OnWSDisConnection()
  async disconnect(id: number) {
    console.log('disconnect ' + id);
  }
}
