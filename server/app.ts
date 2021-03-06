import path from "path";

import Koa from "koa";
import logger from "koa-logger";
import Router from "koa-router";
import compress from "koa-compress";
import render from "koa-ejs";
import koaStatic from "koa-static";
import koaHtmlMinifier from "koa-html-minifier";
import zlib from "zlib";

import { log } from "./utils";

import { PORT, zUtils, zUtilsStylePath, zUtilsSdkPath } from "./constants";

const app = new Koa(),
  router = new Router<
    any,
    {
      zUtils: { sdk: string; style: string };
    }
  >(),
  staticPath = path.resolve(__dirname, "../"),
  ejsPath = path.resolve(staticPath, "client");

app.context.zUtils = {
  sdk: zUtilsSdkPath,
  style: zUtilsStylePath,
};

render(app, {
  root: ejsPath,
  layout: false,
  viewExt: "ejs",
  cache: true,
  debug: false,
});

app.on("error", (err) => {
  console.error("server error", err);
});

app.use(
  compress({
    filter(content_type) {
      return /text|application|image/i.test(content_type);
    },
    threshold: 1024,
    gzip: {
      flush: zlib.constants.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: zlib.constants.Z_SYNC_FLUSH,
    },
    br: false, // disable brotli
  })
);

app.use(
  koaStatic(staticPath, {
    extensions: ["css", "js"],
  })
);

app.use(
  koaHtmlMinifier({
    collapseWhitespace: true,
  })
);

app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

router.get(`/`, async (ctx, next) => {
  await ctx.render(zUtils, {
    title: "zUtils 测试服务器 首页",
    type: "home",
    ...ctx.zUtils,
  });
});

router.get(`/test`, async (ctx, next) => {
  await ctx.render(zUtils, {
    title: "ZUtil 测试服务器 test 页面",
    type: "test",
    ...ctx.zUtils,
  });
});

router.get(`/report`, async (ctx, next) => {
  ctx.body = "str";
});

router.get(
  zUtils,
  `/${zUtils}`,
  async (ctx, next) => {
    ctx.state[zUtils] = ctx.query;
    await next();
  },
  (ctx) => {
    ctx.body = "";
  }
);

app.listen(PORT, () => {
  log(`zUtils test server working on http://localhost:${PORT}`);
});
