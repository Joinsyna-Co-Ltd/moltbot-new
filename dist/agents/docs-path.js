import fs from "node:fs";
import path from "node:path";
import { resolveMoltbotPackageRoot } from "../infra/moltbot-root.js";
export async function resolveMoltbotDocsPath(params) {
    const workspaceDir = params.workspaceDir?.trim();
    if (workspaceDir) {
        const workspaceDocs = path.join(workspaceDir, "docs");
        if (fs.existsSync(workspaceDocs))
            return workspaceDocs;
    }
    const packageRoot = await resolveMoltbotPackageRoot({
        cwd: params.cwd,
        argv1: params.argv1,
        moduleUrl: params.moduleUrl,
    });
    if (!packageRoot)
        return null;
    const packageDocs = path.join(packageRoot, "docs");
    return fs.existsSync(packageDocs) ? packageDocs : null;
}
