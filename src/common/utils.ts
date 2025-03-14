import { Page, Project } from "@playwright/test"
import fs from "node:fs"
import os from "node:os"
import path, { resolve } from "node:path"
import { _electron } from "@playwright/test"
import { test as baseTest, inject } from "vitest"

interface Context {
  page: Page
}

type LaunchFixture = (options: {
  extensionPath?: string
  workspacePath?: string
  trace?: "on" | "off"
}) => Promise<Context>

const test = baseTest.extend<{
  launch: LaunchFixture
  taskName: string
  logPath: string
}>({
  taskName: async ({ task }, use) => use(`${task.name}-${task.id}`),
  logPath: async ({ taskName }, use) =>
    use(resolve(`./tests-logs-${taskName}.txt`)),
  launch: async ({ taskName, logPath }, use) => {
    const teardowns: (() => Promise<void>)[] = []

    await use(async (options) => {
      const executablePath = inject("executablePath")
      const workspacePath = options.workspacePath

      const tempDir = await fs.promises.mkdtemp(
        path.join(os.tmpdir(), "typespec-automation")
      )

      const app = await _electron.launch({
        executablePath,
        env: {
          ...process.env,
          VITEST_VSCODE_E2E_LOG_FILE: logPath,
          VITEST_VSCODE_LOG: "verbose"
        },
        args: [
          "--no-sandbox",
          "--disable-gpu-sandbox",
          "--disable-updates",
          "--skip-welcome",
          "--skip-release-notes",
          "--disable-workspace-trust",
          `--extensions-dir=${path.join(__dirname, "../../extension")}`,
          `--user-data-dir=${path.join(tempDir, "user-data")}`,
          workspacePath && `--folder-uri=file:${path.resolve(workspacePath)}`
        ].filter((v): v is string => !!v)
      })
      const page = await app.firstWindow()

      return { page }
    })

    for (const teardown of teardowns) await teardown()
  }
})

async function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000))
}

async function retry(
  count: number,
  fn: () => Promise<boolean>,
  errMessage: string
) {
  while (count > 0) {
    await sleep(2)
    if (await fn()) {
      return
    }
    count--
  }
  throw new Error(errMessage)
}

export { sleep, test, retry }
