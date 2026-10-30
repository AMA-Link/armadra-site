# 部署指南

站点是纯静态产物（`dist/`），托管在 **Cloudflare Workers 静态资源**，没有 Worker 脚本。配置在 [`wrangler.jsonc`](../../wrangler.jsonc)。

## 构建产物

`pnpm build` = `astro build` + `scripts/write-headers.mjs`：后者扫描 `dist/` 里的内联脚本，按内容算 sha256 写进 `dist/_headers` 的 CSP，再加上 `nosniff`、`Referrer-Policy`、`Permissions-Policy`、HSTS 与 `/_astro/*` 的长缓存。`public/_redirects` 处理少量重定向。

本地预检（不需要登录）：

```sh
pnpm deploy:dry
```

## 首次部署

1. 在 Cloudflare 控制台「我的个人资料 → API 令牌」创建令牌，模板选 **Edit Cloudflare Workers**，账户资源限定到 `armadra.com` 所在账户，区域资源限定到 `armadra.com`（绑定自定义域名需要）。
2. 本地发布一次确认能跑通：

   ```sh
   CLOUDFLARE_API_TOKEN=… CLOUDFLARE_ACCOUNT_ID=… pnpm deploy
   ```

   成功后会打印 `https://armadra-site.<子域>.workers.dev`，先在这个地址检查页面与响应头。
3. GitHub 仓库已配好 secret `CLOUDFLARE_ACCOUNT_ID` 与变量 `DEPLOY_ENABLED=true`、`SITE_URL=https://armadra.com`；只差令牌，在本机运行后粘贴第 1 步的令牌：

   ```sh
   gh secret set CLOUDFLARE_API_TOKEN -R AMA-Link/armadra-site
   ```

4. 之后每次合并到 `main`，`.github/workflows/deploy.yml` 自动构建、检查站内链接并发布；也可以在 Actions 页手动运行。令牌缺失时工作流只打一条提示并跳过，不会失败。

## 绑定 armadra.com

`armadra.com` 的 zone 已在同一个 Cloudflare 账号里（`relay.armadra.com` 指向中转，**不要动它**）。

1. 确认根域与 `www` 上没有冲突的 DNS 记录（自定义域名会自己建记录；已有的 A / CNAME 需要先删掉）。
2. 取消 `wrangler.jsonc` 里 `routes` 的注释：

   ```jsonc
   "routes": [
     { "pattern": "armadra.com", "custom_domain": true },
     { "pattern": "www.armadra.com", "custom_domain": true }
   ]
   ```

3. 开 PR 合并后由 deploy 工作流发布（或本地 `pnpm deploy`）。Cloudflare 自动签发证书，通常几分钟内生效。
4. `www` 跳转到根域：在 Cloudflare 控制台「规则 → 重定向规则」加一条 `www.armadra.com/*` → `https://armadra.com/${1}`（301，保留查询串）。
5. 绑定后可以把 `workers_dev` 改为 `false`，只保留正式域名。

## Armadra 发版后

Armadra 每发一个版本（GitHub Releases 上非草稿的 Latest），在站点仓库：

1. `pnpm sync:release`：从 GitHub 取最新发布写入 `src/data/release.json`。首页版本标签、页脚与安装页的版本号、下载链接都从这个文件渲染，不手写。
2. `pnpm changelog:draft <版本> --write`，按 [开发指南](development.md) 改写英文与标题。
3. `pnpm check && pnpm build`，确认 `dist/index.html` 与 `dist/docs/install/index.html` 是同一个版本号，然后开 PR；合并即发布。

## 回滚

Cloudflare 控制台 Workers → `armadra-site` → 部署，选上一个版本「回滚」；或本地：

```sh
pnpm exec wrangler rollback
```

代码层面的回滚走普通 PR（revert）后重新发布。

## 排错

| 现象 | 原因与处理 |
| --- | --- |
| deploy 工作流显示 skipped | 仓库变量 `DEPLOY_ENABLED` 不是 `true` |
| `Authentication error [code: 10000]` | 令牌缺少 Workers Scripts 编辑权限或账户不对 |
| 绑定域名报已有 DNS 记录 | 先删掉根域 / `www` 上的旧记录 |
| 页面脚本被 CSP 拦截 | 内联脚本改了但 `_headers` 不是同一次构建生成的；重新 `pnpm build` 后发布 |
