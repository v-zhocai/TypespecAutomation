import { download } from "@vscode/test-electron"
import type { GlobalSetupContext } from "vitest/node"

/**
 * The global method will download a brand new vscode to your local computer.
 * Subsequent cases will be executed in this vscode.
 */
export default async function downloadVscode({ provide }: GlobalSetupContext) {
  if (process.platform.includes("win")){
    const version = "1.100.2";
    const platform = "win32-x64-archive";

    if (process.env.VSCODE_E2E_DOWNLOAD_PATH) {
      provide("executablePath", process.env.VSCODE_E2E_DOWNLOAD_PATH);
    } else {
      provide("executablePath", await download({ version, platform }));
    }
  } else {
    if (process.env.VSCODE_E2E_DOWNLOAD_PATH)
      provide("executablePath", process.env.VSCODE_E2E_DOWNLOAD_PATH)
    else provide("executablePath", await download())
  }
}

declare module "vitest" {
  export interface ProvidedContext {
    executablePath: string
  }
}
