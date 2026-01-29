# Moltbot Windows 一键安装脚本
# 使用方法: 以管理员身份运行 PowerShell，执行:
# irm https://raw.githubusercontent.com/Joinsyna-Co-Ltd/moltbot-new/main/scripts/install-windows.ps1 | iex

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Moltbot Windows 一键安装脚本" -ForegroundColor Cyan
Write-Host "   https://github.com/Joinsyna-Co-Ltd/moltbot-new" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否以管理员身份运行
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "[警告] 建议以管理员身份运行以获得最佳体验" -ForegroundColor Yellow
}

# 检查 Node.js
Write-Host "[1/6] 检查 Node.js..." -ForegroundColor Green
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        $versionNum = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
        if ($versionNum -ge 22) {
            Write-Host "  ✓ Node.js $nodeVersion 已安装" -ForegroundColor Green
        } else {
            Write-Host "  ✗ Node.js 版本过低 ($nodeVersion)，需要 v22+" -ForegroundColor Red
            Write-Host "  请从 https://nodejs.org/ 下载安装 Node.js 22+" -ForegroundColor Yellow
            exit 1
        }
    }
} catch {
    Write-Host "  ✗ Node.js 未安装" -ForegroundColor Red
    Write-Host "  请从 https://nodejs.org/ 下载安装 Node.js 22+" -ForegroundColor Yellow
    exit 1
}

# 检查 Git
Write-Host "[2/6] 检查 Git..." -ForegroundColor Green
try {
    $gitVersion = git --version 2>$null
    if ($gitVersion) {
        Write-Host "  ✓ $gitVersion 已安装" -ForegroundColor Green
    }
} catch {
    Write-Host "  ✗ Git 未安装" -ForegroundColor Red
    Write-Host "  请从 https://git-scm.com/download/win 下载安装 Git" -ForegroundColor Yellow
    exit 1
}

# 检查/安装 pnpm
Write-Host "[3/6] 检查 pnpm..." -ForegroundColor Green
try {
    $pnpmVersion = pnpm --version 2>$null
    if ($pnpmVersion) {
        Write-Host "  ✓ pnpm $pnpmVersion 已安装" -ForegroundColor Green
    }
} catch {
    Write-Host "  pnpm 未安装，正在安装..." -ForegroundColor Yellow
    npm install -g pnpm
    Write-Host "  ✓ pnpm 安装完成" -ForegroundColor Green
}

# 设置安装目录
$installDir = "$env:USERPROFILE\moltbot"
Write-Host "[4/6] 克隆项目到 $installDir..." -ForegroundColor Green

if (Test-Path $installDir) {
    Write-Host "  目录已存在，正在更新..." -ForegroundColor Yellow
    Set-Location $installDir
    git pull origin main
} else {
    git clone https://github.com/Joinsyna-Co-Ltd/moltbot-new.git $installDir
    Set-Location $installDir
}
Write-Host "  ✓ 项目克隆/更新完成" -ForegroundColor Green

# 安装依赖
Write-Host "[5/6] 安装依赖..." -ForegroundColor Green
pnpm install
Write-Host "  ✓ 依赖安装完成" -ForegroundColor Green

# 构建项目
Write-Host "[6/6] 构建项目..." -ForegroundColor Green
pnpm build
if (Test-Path "ui") {
    pnpm ui:build 2>$null
}
Write-Host "  ✓ 构建完成" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   安装完成！" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "下一步操作:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 进入安装目录:" -ForegroundColor White
Write-Host "   cd $installDir" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 初始配置:" -ForegroundColor White
Write-Host "   node moltbot.mjs setup" -ForegroundColor Gray
Write-Host "   node moltbot.mjs config set gateway.mode local" -ForegroundColor Gray
Write-Host "   node moltbot.mjs config set gateway.auth.token `"your-token`"" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 配置 AI 模型 (选择一个):" -ForegroundColor White
Write-Host "   # Anthropic Claude:" -ForegroundColor Gray
Write-Host "   node moltbot.mjs config set models.providers.anthropic.apiKey `"your-key`"" -ForegroundColor Gray
Write-Host "   # 或 OpenAI:" -ForegroundColor Gray
Write-Host "   node moltbot.mjs config set models.providers.openai.apiKey `"your-key`"" -ForegroundColor Gray
Write-Host ""
Write-Host "4. 启动 Gateway:" -ForegroundColor White
Write-Host "   node moltbot.mjs gateway run --port 18789" -ForegroundColor Gray
Write-Host ""
Write-Host "5. 访问控制面板:" -ForegroundColor White
Write-Host "   node moltbot.mjs dashboard --no-open" -ForegroundColor Gray
Write-Host ""
Write-Host "更多信息请访问: https://github.com/Joinsyna-Co-Ltd/moltbot-new" -ForegroundColor Cyan
Write-Host ""
