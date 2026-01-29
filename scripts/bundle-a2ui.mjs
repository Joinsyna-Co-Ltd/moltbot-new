#!/usr/bin/env node
/**
 * A2UI bundling script - cross-platform Node.js version
 */
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const HASH_FILE = path.join(ROOT_DIR, "src/canvas-host/a2ui/.bundle.hash");
const OUTPUT_FILE = path.join(ROOT_DIR, "src/canvas-host/a2ui/a2ui.bundle.js");
const A2UI_RENDERER_DIR = path.join(ROOT_DIR, "vendor/a2ui/renderers/lit");
const A2UI_APP_DIR = path.join(ROOT_DIR, "apps/shared/MoltbotKit/Tools/CanvasA2UI");

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(entryPath) {
  const files = [];
  const st = await fs.stat(entryPath);
  if (st.isDirectory()) {
    const entries = await fs.readdir(entryPath);
    for (const entry of entries) {
      const subFiles = await walk(path.join(entryPath, entry));
      files.push(...subFiles);
    }
  } else {
    files.push(entryPath);
  }
  return files;
}

function normalize(p) {
  return p.split(path.sep).join("/");
}

async function computeHash(inputPaths) {
  const files = [];
  for (const input of inputPaths) {
    if (await exists(input)) {
      const walked = await walk(input);
      files.push(...walked);
    }
  }

  files.sort((a, b) => normalize(a).localeCompare(normalize(b)));

  const hash = createHash("sha256");
  for (const filePath of files) {
    const rel = normalize(path.relative(ROOT_DIR, filePath));
    hash.update(rel);
    hash.update("\0");
    hash.update(await fs.readFile(filePath));
    hash.update("\0");
  }

  return hash.digest("hex");
}

async function main() {
  // Docker builds exclude vendor/apps via .dockerignore.
  // In that environment we must keep the prebuilt bundle.
  if (!(await exists(A2UI_RENDERER_DIR)) || !(await exists(A2UI_APP_DIR))) {
    console.log("A2UI sources missing; keeping prebuilt bundle.");
    process.exit(0);
  }

  const INPUT_PATHS = [
    path.join(ROOT_DIR, "package.json"),
    path.join(ROOT_DIR, "pnpm-lock.yaml"),
    A2UI_RENDERER_DIR,
    A2UI_APP_DIR,
  ];

  const currentHash = await computeHash(INPUT_PATHS);

  if (await exists(HASH_FILE)) {
    const previousHash = (await fs.readFile(HASH_FILE, "utf8")).trim();
    if (previousHash === currentHash && (await exists(OUTPUT_FILE))) {
      console.log("A2UI bundle up to date; skipping.");
      process.exit(0);
    }
  }

  console.log("Building A2UI bundle...");

  // Run TypeScript compilation
  const tsconfig = path.join(A2UI_RENDERER_DIR, "tsconfig.json");
  try {
    execSync(`pnpm exec tsc -p "${tsconfig}"`, {
      cwd: ROOT_DIR,
      stdio: "inherit",
    });
  } catch (err) {
    console.error("TypeScript compilation failed");
    process.exit(1);
  }

  // Run rolldown
  const rolldownConfig = path.join(A2UI_APP_DIR, "rolldown.config.mjs");
  try {
    execSync(`pnpm exec rolldown -c "${rolldownConfig}"`, {
      cwd: ROOT_DIR,
      stdio: "inherit",
    });
  } catch (err) {
    console.error("Rolldown bundling failed");
    process.exit(1);
  }

  // Write hash file
  await fs.writeFile(HASH_FILE, currentHash, "utf8");
  console.log("A2UI bundle complete.");
}

main().catch((err) => {
  console.error("A2UI bundling failed:", err.message);
  console.error("Re-run with: pnpm canvas:a2ui:bundle");
  process.exit(1);
});
