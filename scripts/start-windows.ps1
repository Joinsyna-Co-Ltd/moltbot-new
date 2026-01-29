# Moltbot Windows 快速启动脚本
# 使用方法: 在 moltbot 目录下运行 .\scripts\start-windows.ps1

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Moltbot 快速启动" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否在正确的目录
if (-not (Test-Path "moltbot.mjs")) {
    Write-Host "[错误] 请在 moltbot 项目根目录下运行此脚本" -ForegroundColor Red
    exit 1
}

# 检查配置文件
$configDir = "$env:USERPROFILE\.clawdbot"
$configFile = "$configDir\moltbot.json"

if (-not (Test-Path $configFile)) {
    Write-Host "[提示] 首次运行，正在进行初始配置..." -ForegroundColor Yellow
    Write-Host ""
    
    # 创建配置目录
    if (-not (Test-Path $configDir)) {
        New-Item -ItemType Directory -Path $configDir -Force | Out-Null
    }
    
    # 运行 setup
    node moltbot.mjs setup
    
    # 设置 gateway 模式
    node moltbot.mjs config set gateway.mode local
    
    # 生成随机令牌
    $token = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
    node moltbot.mjs config set gateway.auth.token $token
    
    Write-Host ""
    Write-Host "[重要] 您的访问令牌: $token" -ForegroundColor Yellow
    Write-Host "请保存此令牌，访问控制面板时需要使用" -ForegroundColor Yellow
    Write-Host ""
    
    # 提示配置 AI 模型
    Write-Host "[提示] 请配置 AI 模型 API 密钥以启用聊天功能:" -ForegroundColor Yellow
    Write-Host "  Anthropic: node moltbot.mjs config set models.providers.anthropic.apiKey `"your-key`"" -ForegroundColor Gray
    Write-Host "  OpenAI:    node moltbot.mjs config set models.providers.openai.apiKey `"your-key`"" -ForegroundColor Gray
    Write-Host ""
    
    $continue = Read-Host "是否现在启动 Gateway? (Y/n)"
    if ($continue -eq "n" -or $continue -eq "N") {
        Write-Host "您可以稍后运行此脚本启动 Gateway" -ForegroundColor Cyan
        exit 0
    }
}

# 检查端口是否被占用
$port = 18789
$portInUse = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "[警告] 端口 $port 已被占用" -ForegroundColor Yellow
    $newPort = Read-Host "请输入新端口号 (默认 18790)"
    if ($newPort) {
        $port = $newPort
    } else {
        $port = 18790
    }
}

Write-Host ""
Write-Host "正在启动 Moltbot Gateway (端口: $port)..." -ForegroundColor Green
Write-Host "按 Ctrl+C 停止服务" -ForegroundColor Gray
Write-Host ""

# 启动 Gateway
node moltbot.mjs gateway run --port $port
