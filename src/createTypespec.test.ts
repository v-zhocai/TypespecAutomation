import { beforeAll, beforeEach } from "vitest"
import {
  contrastResult,
  start,
  selectFolder,
  preContrastResult,
  installExtensionForFile,
  closeVscode,
  installExtension,
} from "./common/commonSteps"
import { screenShot, sleep, test } from "./common/utils"
import fs from "node:fs"
import path from "node:path"
import {
  inputProjectName,
  selectEmitters,
  selectTemplate,
} from "./common/createSteps"
import { afterEach } from "node:test"

beforeAll(() => {
  screenShot.setCreateType("create")
})

beforeEach(() => {
  const dir = path.resolve(__dirname, "../CreateTypespecProject")
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.resolve(dir, file)
      fs.rmSync(filePath, { recursive: true, force: true })
    }
  } else {
    fs.mkdirSync(dir, { recursive: true })
  }
})

test("CreateTypespec-Generic REST API", async ({ launch }) => {
  screenShot.setDir("CreateTypespec-Generic REST API1")
  const workspacePath = path.resolve(__dirname, "../CreateTypespecProject")
  const { page } = await launch({
    workspacePath,
  })

  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../extension.vsix"),
    workspacePath
  )
  
  console.log("installed extension")
  await start(page, {
    folderName: "CreateTypespecProject",
    command: "Create Typespec Project",
  })
  console.log("top input")

  await selectFolder()
  console.log("selected folder")

  await selectTemplate(page, "Generic REST API")
  console.log("selected template")

  await inputProjectName(page)
  console.log("input projectName")

  await selectEmitters(page, ["OpenAPI"])
  console.log("selected emitters")

  await preContrastResult(
    page,
    "Project created!",
    "Failed to create project Successful",
    [20, 10]
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
})
