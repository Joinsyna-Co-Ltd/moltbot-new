# A2UI bundling script for Windows
$ErrorActionPreference = "Stop"

$ROOT_DIR = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
if (-not $ROOT_DIR) {
    $ROOT_DIR = (Get-Location).Path
}

$HASH_FILE = Join-Path $ROOT_DIR "src\canvas-host\a2ui\.bundle.hash"
$OUTPUT_FILE = Join-Path $ROOT_DIR "src\canvas-host\a2ui\a2ui.bundle.js"
$A2UI_RENDERER_DIR = Join-Path $ROOT_DIR "vendor\a2ui\renderers\lit"
$A2UI_APP_DIR = Join-Path $ROOT_DIR "apps\shared\MoltbotKit\Tools\CanvasA2UI"

# Docker builds exclude vendor/apps via .dockerignore.
# In that environment we must keep the prebuilt bundle.
if (-not (Test-Path $A2UI_RENDERER_DIR) -or -not (Test-Path $A2UI_APP_DIR)) {
    Write-Host "A2UI sources missing; keeping prebuilt bundle."
    exit 0
}

# Check if bundle already exists and is up to date
if ((Test-Path $HASH_FILE) -and (Test-Path $OUTPUT_FILE)) {
    Write-Host "A2UI bundle exists; skipping rebuild for Windows."
    exit 0
}

Write-Host "Building A2UI bundle..."

# Run TypeScript compilation
$tsconfig = Join-Path $A2UI_RENDERER_DIR "tsconfig.json"
& pnpm exec tsc -p $tsconfig
if ($LASTEXITCODE -ne 0) {
    Write-Error "TypeScript compilation failed"
    exit 1
}

# Run rolldown
$rolldownConfig = Join-Path $A2UI_APP_DIR "rolldown.config.mjs"
& rolldown -c $rolldownConfig
if ($LASTEXITCODE -ne 0) {
    Write-Error "Rolldown bundling failed"
    exit 1
}

# Write hash file (simplified - just use current timestamp)
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
Set-Content -Path $HASH_FILE -Value $timestamp

Write-Host "A2UI bundle complete."
