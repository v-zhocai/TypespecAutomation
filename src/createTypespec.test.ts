import { beforeEach } from "vitest"
import {
  contrastResult,
  start,
  selectFolder,
  preContrastResult,
  closeVscode,
  notEmptyFolderContinue,
} from "./common/commonSteps"
import { preCheckExtension, test } from "./common/utils"
import fs from "node:fs"
import path from "node:path"
import {
  inputProjectName,
  selectEmitters,
  selectTemplate,
} from "./common/createSteps"

beforeEach(() => {
  const dir = path.resolve(__dirname, "../CreateTypespecProject")
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.resolve(dir, file)
      fs.rmSync(filePath, { recursive: true, force: true })
    }
  } else {
    throw new Error("Failed to find workspace directory")
  }
  preCheckExtension()
})

test("CreateTypespec-Generic REST API", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await start(page, {
    folderName: "CreateTypespecProject",
    command: "Create Typespec Project",
  })
  await selectFolder()
  await selectTemplate(page, "Generic REST API")
  await inputProjectName(page)
  await selectEmitters(page, ["OpenAPI"])
  await preContrastResult(
    page,
    "Project created!",
    "Failed to create project Successful"
  )
  await contrastResult(
    [
      ".gitignore",
      "main.tsp",
      "node_modules",
      "package-lock.json",
      "package.json",
      "tspconfig.yaml",
    ],
    workspacePath
  )
  await closeVscode(page)
})

test("CreateTypespec-Special scenarios-button", async ({ launch }) => {
  const { page } = await launch({ workspacePath: "./test" })
  await page
    .getByLabel(/Explorer/)
    .first()
    .click()
  await page.getByRole("button", { name: "Create TypeSpec Project" }).click()
  await selectFolder()
  await notEmptyFolderContinue(page)
  await closeVscode(page)
})
