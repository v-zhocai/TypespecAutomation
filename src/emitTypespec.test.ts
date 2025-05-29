import { beforeAll, beforeEach, describe } from "vitest"
import {
  closeVscode,
  contrastResult,
  installExtension,
  installExtensionForFile,
  installExtensionForCommand,
  preContrastResult,
  startWithCommandPalette,
  startWithRightClick,
} from "./common/commonSteps"
import { 
  emitSelectLanguage,
  emitSelectLanguageForOpenapi,
  emitSelectType,
  emiChooseEmitter
} from "./common/emiSteps"
import { screenShot, sleep, test } from "./common/utils"
import path from "node:path"
import fs from "node:fs"
import { EmitCasesConfigList } from "./config"

beforeAll(() => {
  screenShot.setCreateType("emit")
})

beforeEach(() => {
  let dir = path.resolve(__dirname, "../EmitTypespecProject/tsp-output")
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.resolve(dir, file)
      fs.rmSync(filePath, { recursive: true, force: true })
    }
  }
  dir = path.resolve(__dirname, "../EmitTypespecProjectStubJs/tsp-output")
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.resolve(dir, file)
      fs.rmSync(filePath, { recursive: true, force: true })
    }
  }
})

describe.each(EmitCasesConfigList)("EmitTypespecProject", async (item) => {
  const {
    caseName,
    selectType,
    selectTypeLanguage,
    triggerType,
    expectedResults,
  } = item
  test(caseName, async ({ launch }) => {
    console.log(`Running test: ${caseName}`)
    screenShot.setDir(caseName)
    const isServerStubJS =
      selectType === "Server Stub" && selectTypeLanguage === "JavaScript"
    const workspacePath = path.resolve(
      __dirname,
      `../EmitTypespecProject${isServerStubJS ? "StubJs" : ""}`
    )
    const { page, extensionDir } = await launch({
      workspacePath,
    })
    // await page.screenshot({ path: `vscode${+new Date()}.png` });

    console.log("launched")
    // await installExtensionForFile(
    //   page,
    //   path.resolve(__dirname, "../extension.vsix"),
    //   workspacePath
    // )
    // await page.pause()
    await installExtensionForCommand(page, extensionDir)
    console.log("installed extension")
    if (triggerType === "Command") {
      await startWithCommandPalette(page, {
        folderName: "EmitTypespecProject",
        command: "Emit from Typespec",
      })
    } else if (triggerType === "Click") {
      await startWithRightClick(page, "Emit from TypeSpec", "file")
    }
    console.log("start")

    // // await emitSelectProject(page, "TextTranslation")
    // await screenShot.screenShot("emitter_list.png")

    await screenShot.screenShot("emitter_list.png")

    await sleep(3)
    await emiChooseEmitter(page)
    await emitSelectType(page, selectType)
    if (selectTypeLanguage === "OpenAPI3") {
      await emitSelectLanguageForOpenapi(page)
    } else {
      await emitSelectLanguage(page, selectTypeLanguage, selectType)
    }

    const contrastMessage = selectTypeLanguage + "...Succeeded"
    await preContrastResult(
      page,
      contrastMessage,
      "Failed to emit project Successful",
      [30, 3]
    )

    await screenShot.screenShot("close_vscode.png")
    await closeVscode()

    const resultFilePath = path.resolve(workspacePath, "./tsp-output/@typespec")
    await contrastResult(expectedResults, resultFilePath)
  })
})
// test("EmitTypespec-OpenAPI Document 2", async ({ launch }) => {
//   screenShot.setDir("EmitTypespec-OpenAPI Document")
//   const workspacePath = path.resolve(__dirname, "../EmitTypespecProject")
//   const { page } = await launch({
//     workspacePath,
//   })

//   await installExtensionForFile(
//     page,
//     path.resolve(__dirname, "../extension.vsix")
//   )
//   await start(page, {
//     folderName: "EmitTypespecProject",
//     command: "Emit from Typespec",
//   })
//   // await emitSelectProject(page, "TextTranslation")
//   await screenShot.screenShot("emitter_list.png")

//   await page
//     .getByRole("option", { name: "Choose another emitter" })
//     .locator("a")
//     .click()
//   await emitSelectType(page, "OpenAPI Document")

//   await emitSelectLanguageForOpenapi(page)

//   await preContrastResult(
//     page,
//     "OpenAPI3...Succeeded",
//     "Failed to emit project Successful",
//     [10, 3]
//   )
//   await closeVscode()

//   await contrastResult(
//     ["openapi.3.0.yaml"],
//     path.resolve(workspacePath, "./tsp-output/@typespec/openapi3")
//   )
// })
