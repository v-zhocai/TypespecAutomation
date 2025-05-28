import { beforeAll, beforeEach, describe } from "vitest"
import { screenShot, sleep, test } from "./common/utils"
import { keyboard, Key } from "@nut-tree-fork/nut-js"
import fs from "node:fs"
import path from "node:path"
import {
  closeVscode,
  contrastResult,
  installExtension,
  installExtensionForFile,
  installExtensionForCommand,
  notEmptyFolderContinue,
  preContrastResult,
  selectFolder,
  startWithCommandPalette,
  startWithRightClick,
} from "./common/commonSteps"
import { ImportProjectTriggerType, ImportCasesConfigList } from "./config"

beforeAll(() => {
  screenShot.setCreateType("import")
})

beforeEach(() => {
  const importTypespec = path.resolve(
    __dirname,
    "../ImportTypespecProjectOpenApi3"
  )
  const importTypespecEmptyFolder = path.resolve(
    __dirname,
    "../ImportTypespecProjectOpenApi3/ImportTypespecProjectOpenApi3EmptyFolder"
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
  if (fs.existsSync(importTypespecEmptyFolder)) {
    for (const file of fs.readdirSync(importTypespecEmptyFolder)) {
      const filePath = path.resolve(importTypespecEmptyFolder, file)
      fs.rmSync(filePath, { recursive: true, force: true })
    }
  } else if (!fs.existsSync(importTypespecEmptyFolder)){
    fs.mkdirSync(importTypespecEmptyFolder, { recursive: true })
  }
})

describe.each(ImportCasesConfigList) ("ImportTypespecFromOpenApi3", async ( item ) => {
  const { caseName, triggerType, selectFolderEmptyOrNonEmpty, expectedResults } = item
  test(caseName, async ({ launch }) => {
    screenShot.setDir(caseName)
    const workspacePath = path.resolve(
      __dirname,
      "../ImportTypespecProjectOpenApi3"
    )
    const { page, extensionDir } = await launch({
      workspacePath,
    })
    // await installExtensionForFile(
    //   page,
    //   path.resolve(__dirname, "../extension.vsix"),
    //   workspacePath
    // )
    // await installExtension(page)
    await installExtensionForCommand(page, extensionDir)
    console.log("install extension")
    if (triggerType == ImportProjectTriggerType.CommandPalette) {
      await startWithCommandPalette(page, {
          folderName: "importTypespecProjectOpenApi3",
          command: "Import TypeSpec from OpenAPI 3",
      })
    } else if (triggerType == ImportProjectTriggerType.RightClickonFile) {
      await startWithRightClick(page, "Import TypeSpec from Openapi 3", "file")
    } else if (triggerType == ImportProjectTriggerType.RightClickonFolder) {
      await startWithRightClick(page, "Import TypeSpec from Openapi 3", "emptyfolder")
    }
    console.log("top input")

    await selectFolder()
    console.log("selected folder")

    if (selectFolderEmptyOrNonEmpty === "non-empty") {
      await notEmptyFolderContinue(page)
    }
    console.log("yes")
    if (selectFolderEmptyOrNonEmpty == "non-empty") {
      await sleep(3)
      await keyboard.pressKey(Key.Down)
      await keyboard.releaseKey(Key.Down)
    }
    await selectFolder()

    console.log("selected file")
    await preContrastResult(
        page,
        "OpenAPI succeeded",
        "Failed to import project successfully",
        [10, 10]
    )
    await contrastResult(expectedResults, workspacePath)
  })
})
