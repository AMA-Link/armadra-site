---
title: 自托管部署与远程访问
description: 在自己的服务器上常开 Armadra，从电脑和手机浏览器访问，与他人共享工作空间。
group: guides
order: 3
---

需要远程访问或多人协作时，可以把 Armadra 部署到自己的服务器上。下文把这种没有窗口、常开的部署方式称为**服务器壳**；只想临时让手机连上桌面，用桌面的「对外服务」即可。

## 桌面对外服务还是服务器壳

| | 桌面「对外服务」 | 服务器壳 |
| --- | --- | --- |
| 跑在哪 | 你的桌面，开着桌面应用才在 | 服务器或 NAS，常开 |
| 证书 | 本地 CA，手机装一次 | 自签名；对公网用 ACME 或自有证书 |
| 适合 | 自己的手机、局域网里临时给别人看 | 多人长期共享、离开桌面也要用、对公网 |
| Agent 在哪跑 | 桌面上 | 服务器上，CLI 要在服务器里装好并登录 |

## 桌面对外服务

在「设置 → 远程访问 → 局域网直连」打开。运行后出现配对卡：二维码、链接与两分钟倒计时。手机浏览器扫码后按引导安装证书，再点「连接」。

## 服务器壳

推荐用容器：

```sh
mkdir -p /srv/armadra && cd /srv/armadra
curl -fsSLO https://raw.githubusercontent.com/AMA-Link/Armadra/main/apps/server/docker/compose.yml
# 改 compose.yml 里的 ARMADRA_PUBLIC_ORIGIN 与 ARMADRA_ACME_EMAIL
docker compose up -d
docker compose logs armadra | grep "armadra-server pairing"
```

`ARMADRA_PUBLIC_ORIGIN` 必须和浏览器地址栏里的地址一致。启动日志里的配对链接两分钟内有效，第一个兑换的人成为管理员；之后在「设置 → 账号与共享」邀请成员、建组、按工作空间共享。

桌面安装包里也带着服务器壳，可以用 `Armadra serve` 直接起服务，不需要 Node 与源码。

## 从外网访问

不想开公网端口时，可以用 Tailscale、WireGuard、Cloudflare Tunnel 等方案，或登记到个人中转。`--public-origin` 一律写用户实际访问的地址。

## 账号安全

服务器壳支持口令、passkey、TOTP 与恢复码、GitHub / OIDC 登录，带限流与锁定。撤销共享会立即断开对方的连接。

## 手机

手机浏览器打开同一份页面，有底部导航、单节点焦点页与软键盘工具条。手机只是客户端，终端、Git 与 Agent 仍在电脑或服务器上执行。Android 应用见[安装](/docs/install/)；iOS 应用在路线图上，目前在模拟器中验证。

完整步骤（证书、反向代理、备份、升级回滚）见 Armadra 仓库的[服务器部署指南](https://github.com/AMA-Link/Armadra/blob/main/docs/guides/server-deployment.md)。
