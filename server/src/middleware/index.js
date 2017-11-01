'use strict';

import compose from 'koa-compose';
import convert from 'koa-convert';
import logger from 'koa-logger';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
//import session from 'koa-generic-session';

export default function middleware() {
  return compose([
    convert(logger()),
    convert(cors()),
    convert(bodyParser())
  ]);
}