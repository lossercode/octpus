import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import * as crossDomain from '@midwayjs/cross-domain';
import * as typegoose from '@midwayjs/typegoose';
import * as orm from '@midwayjs/typeorm';
import * as jwt from '@midwayjs/jwt';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { NotFoundFilter } from './filter/notfound.filter';
import { DefaultErrorFilter } from './filter/default.filter';
import { UnauthorizedErrorFilter } from './filter/unauthorized';
import * as ws from '@midwayjs/ws';
import * as redis from '@midwayjs/redis';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    crossDomain,
    typegoose,
    orm,
    jwt,
    ws,
    redis,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    this.app.useMiddleware([JwtMiddleware]);
    // add filter
    this.app.useFilter([
      NotFoundFilter,
      DefaultErrorFilter,
      UnauthorizedErrorFilter,
    ]);
  }
}
