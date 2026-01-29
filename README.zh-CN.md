# 🦞 Moltbot — 个人 AI 助手

<p align="center">
  <img src="https://raw.githubusercontent.com/moltbot/moltbot/main/docs/whatsapp-clawd.jpg" alt="Clawdbot" width="400">
</p>

<p align="center">
  <strong>EXFOLIATE! EXFOLIATE!</strong>
</p>

<p align="center">
  <a href="https://github.com/moltbot/moltbot/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/moltbot/moltbot/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/moltbot/moltbot/releases"><img src="https://img.shields.io/github/v/release/moltbot/moltbot?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://deepwiki.com/moltbot/moltbot"><img src="https://img.shields.io/badge/DeepWiki-moltbot-111111?style=for-the-badge" alt="DeepWiki"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**Moltbot** 是一个运行在您自己设备上的*个人 AI 助手*。
它可以在您已经使用的渠道上回复您（WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、Microsoft Teams、WebChat），以及扩展渠道如 BlueBubbles、Matrix、Zalo 等。它可以在 macOS/iOS/Android 上进行语音交互，并可以渲染您控制的实时画布。Gateway 只是控制平面——产品是助手本身。

如果您想要一个本地化、快速、始终在线的个人单用户助手，这就是它。

**[English README](README.md)**

[官网](https://molt.bot) · [文档](https://docs.molt.bot) · [快速开始](https://docs.molt.bot/start/getting-started) · [更新指南](https://docs.molt.bot/install/updating) · [展示](https://docs.molt.bot/start/showcase) · [常见问题](https://docs.molt.bot/start/faq) · [向导](https://docs.molt.bot/start/wizard) · [Docker](https://docs.molt.bot/install/docker) · [Discord](https://discord.gg/clawd)

## 平台支持

| 平台 | 状态 | 说明 |
|------|------|------|
| macOS | ✅ 完全支持 | 推荐平台，包含菜单栏应用 |
| Linux | ✅ 完全支持 | 使用 systemd 服务 |
| Windows (原生) | ✅ 完全支持 | 使用 Windows 计划任务 |
| Windows (WSL2) | ✅ 完全支持 | 推荐用于高级用户 |

## 系统要求

- **Node.js ≥22**
- **pnpm**（推荐）或 npm/bun

## 快速安装

### 方法一：npm 全局安装（推荐）

```bash
npm install -g moltbot@latest
# 或: pnpm add -g moltbot@latest

moltbot onboard --install-daemon
```

### 方法二：从源码构建

```bash
git clone https://github.com/moltbot/moltbot.git
cd moltbot

pnpm install
pnpm build
pnpm ui:build

pnpm moltbot onboard --install-daemon
```

## Windows 原生支持

Moltbot 现在完全支持 **Windows 原生运行**（无需 WSL2）。

### 前置条件

1. 安装 **Node.js ≥22**：从 [nodejs.org](https://nodejs.org/) 下载
2. 安装 **pnpm**：
   ```powershell
   npm install -g pnpm
   ```

### Windows 快速开始

```powershell
# 克隆并构建
git clone https://github.com/moltbot/moltbot.git
cd moltbot

# 安装依赖
pnpm install

# 构建项目
pnpm build

# 构建控制面板 UI
pnpm ui:build

# 初始设置
node moltbot.mjs setup

# 配置 gateway 模式
node moltbot.mjs config set gateway.mode local

# 设置访问令牌（必需）
node moltbot.mjs config set gateway.auth.token "你的安全令牌"

# 启动 gateway
node moltbot.mjs gateway run --port 18789
```

### 访问控制面板

```powershell
# 获取带令牌的 URL
node moltbot.mjs dashboard --no-open
```

然后在浏览器中打开输出的 URL（例如：`http://127.0.0.1:18789/?token=你的令牌`）

### 配置 AI 模型

要使用聊天功能，您需要配置 AI 模型的 API 密钥：

#### 使用 Anthropic (Claude)

```powershell
node moltbot.mjs config set models.providers.anthropic.apiKey "你的API密钥"
```

#### 使用 OpenAI

```powershell
node moltbot.mjs config set models.providers.openai.apiKey "你的API密钥"
node moltbot.mjs config set agents.defaults.model "openai/gpt-4o"
```

### Windows 服务管理

```powershell
# 安装为 Windows 计划任务
node moltbot.mjs daemon install

# 查看服务状态
node moltbot.mjs daemon status

# 停止服务
node moltbot.mjs daemon stop

# 重启服务
node moltbot.mjs daemon restart

# 卸载服务
node moltbot.mjs daemon uninstall
```

### Windows 支持的功能

| 功能 | 状态 | 说明 |
|------|------|------|
| Gateway 服务 | ✅ | 使用 Windows 计划任务 |
| WhatsApp | ✅ | 完全支持 |
| Telegram | ✅ | 完全支持 |
| Discord | ✅ | 完全支持 |
| Slack | ✅ | 完全支持 |
| Signal | ✅ | 需要 signal-cli |
| Google Chat | ✅ | 完全支持 |
| LINE | ✅ | 完全支持 |
| iMessage | ❌ | 仅限 macOS |
| 浏览器控制 | ✅ | Chrome/Edge/Brave |
| 控制面板 UI | ✅ | 完全支持 |

### Windows 故障排除

#### 1. 构建时出现 "bash not found" 错误

项目现在使用跨平台的 Node.js 脚本。确保您使用的是最新版本。

#### 2. Gateway 令牌错误

启动前必须设置令牌：
```powershell
node moltbot.mjs config set gateway.auth.token "你的令牌"
```

#### 3. 无法聊天

需要配置 AI 模型 API 密钥（见上文"配置 AI 模型"部分）。

#### 4. 健康检查

```powershell
node moltbot.mjs doctor
```

#### 5. 查看状态

```powershell
node moltbot.mjs status
```

## 支持的消息渠道

### 核心渠道

- **[WhatsApp](https://docs.molt.bot/channels/whatsapp)** — 使用 Baileys，通过 QR 码链接
- **[Telegram](https://docs.molt.bot/channels/telegram)** — 使用 grammY，需要 Bot Token
- **[Discord](https://docs.molt.bot/channels/discord)** — 使用 discord.js，需要 Bot Token
- **[Slack](https://docs.molt.bot/channels/slack)** — 使用 Bolt，Socket Mode
- **[Google Chat](https://docs.molt.bot/channels/googlechat)** — 使用 Chat API
- **[Signal](https://docs.molt.bot/channels/signal)** — 使用 signal-cli
- **[iMessage](https://docs.molt.bot/channels/imessage)** — 仅限 macOS，使用 imsg
- **[LINE](https://docs.molt.bot/channels/line)** — 使用 LINE Bot SDK

### 扩展渠道

- **[BlueBubbles](https://docs.molt.bot/channels/bluebubbles)** — iMessage 替代方案
- **[Microsoft Teams](https://docs.molt.bot/channels/msteams)** — 企业通讯
- **[Matrix](https://docs.molt.bot/channels/matrix)** — 开源协议
- **[Zalo](https://docs.molt.bot/channels/zalo)** — 越南流行应用
- **[WebChat](https://docs.molt.bot/web/webchat)** — 网页聊天界面

## 配置示例

最小配置 `~/.clawdbot/moltbot.json`：

```json5
{
  "agents": {
    "defaults": {
      "model": "anthropic/claude-opus-4-5"
    }
  },
  "gateway": {
    "mode": "local",
    "auth": {
      "token": "你的安全令牌"
    }
  }
}
```

## 聊天命令

在 WhatsApp/Telegram/Slack/Discord 等渠道中发送：

- `/status` — 查看会话状态（模型 + 令牌数）
- `/new` 或 `/reset` — 重置会话
- `/compact` — 压缩会话上下文
- `/think <level>` — 设置思考级别：off|minimal|low|medium|high|xhigh
- `/verbose on|off` — 详细模式开关
- `/usage off|tokens|full` — 使用量显示
- `/restart` — 重启 gateway（群组中仅管理员可用）

## 安全说明

Moltbot 连接到真实的消息平台。将入站 DM 视为**不可信输入**。

默认行为：
- **DM 配对** (`dmPolicy="pairing"`)：未知发送者会收到配对码，机器人不会处理他们的消息
- 使用 `moltbot pairing approve <channel> <code>` 批准发送者
- 公开入站 DM 需要显式选择：设置 `dmPolicy="open"` 并在允许列表中包含 `"*"`

运行 `moltbot doctor` 检查风险配置。

## 常用命令

```bash
# 健康检查
moltbot doctor

# 查看状态
moltbot status

# 查看日志
moltbot logs --follow

# 发送消息
moltbot message send --to +1234567890 --message "你好"

# 与助手对话
moltbot agent --message "帮我写一个总结" --thinking high

# 配置管理
moltbot config get gateway.mode
moltbot config set gateway.mode local
```

## 文档

- [快速开始](https://docs.molt.bot/start/getting-started)
- [配置参考](https://docs.molt.bot/gateway/configuration)
- [安全指南](https://docs.molt.bot/gateway/security)
- [故障排除](https://docs.molt.bot/channels/troubleshooting)
- [Windows 指南](https://docs.molt.bot/platforms/windows)

## 社区

- [Discord](https://discord.gg/clawd)
- [GitHub Issues](https://github.com/moltbot/moltbot/issues)
- [贡献指南](CONTRIBUTING.md)

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

---

由 Peter Steinberger 和社区构建。🦞
