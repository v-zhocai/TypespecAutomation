import { beforeEach } from "vitest"
import { preCheckExtension, retry, test } from "./common/utils"
import fs from "node:fs"
import path from "node:path"
import {
  closeVscode,
  contrastResult,
  preContrastResult,
  selectFolder,
  start,
} from "./common/commonSteps"

beforeEach(() => {
  const importTypespec = path.resolve(
    __dirname,
    "../ImportTypespecProjectOpenApi3"
  )
  if (fs.existsSync(importTypespec)) {
    let hasOpenapi3File = false
    for (const file of fs.readdirSync(importTypespec)) {
      if (file === "openapi.3.0.yaml") {
        hasOpenapi3File = true
      } else {
        const filePath = path.resolve(importTypespec, file)
        fs.rmSync(filePath, { recursive: true, force: true })
      }
    }
    if (!hasOpenapi3File) {
      throw new Error("Failed to find openapi3 file")
    }
  } else {
    throw new Error("Failed to find ImportTypespecProjectOpenApi3 directory")
  }

  preCheckExtension()
})

test("ImportTypespecFromOpenApi3", async ({ launch }) => {
  const workspacePath = path.resolve(
    __dirname,
    "../importTypespecProjectOpenApi3"
  )
  const { page } = await launch({
    workspacePath,
  })
  await start(page, {
    folderName: "importTypespecProjectOpenApi3",
    command: "Import TypeSpec from Openapi3",
  })
  await selectFolder()

  const yesBtn = page.locator("a").filter({ hasText: "Yes" }).first()
  await retry(
    5,
    async () => {
      return (await yesBtn.count()) > 0
    },
    "Failed to find yes button",
    1
  )
  await yesBtn.click()

  await selectFolder("openapi.3.0.yaml")
  await preContrastResult(
    page,
    "OpenAPI succeeded",
    "Failed to import project successfully",
    [10, 3]
  )
  await contrastResult(["openapi.3.0.yaml", "main.tsp"], workspacePath)
  await closeVscode(page)
})
