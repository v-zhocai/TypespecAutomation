import {
  contrastResult,
  installExtension,
  installExtensionForFile,
  preContrastResult,
  start,
} from "../common/commonSteps"
import {
  emitSelectLanguageForOpenapi,
  emitSelectProject,
  emitSelectType,
} from "../common/emiSteps"
import { sleep, test } from "../common/utils"
import path from "node:path"

test("EmitTypespec-OpenAPI Document", async ({ launch }) => {
  const workspacePath = path.resolve(__dirname, "../../EmitTypespecProject")
  const { page } = await launch({
    workspacePath,
  })
  await installExtensionForFile(
    page,
    path.resolve(__dirname, "../../extension.vsix")
  )
  await start(page, {
    folderName: "EmitTypespecProject",
    command: "Emit from Typespec",
  })
  await emitSelectProject(page, "TextTranslation")

  await page
    .getByRole("option", { name: "Choose another emitter" })
    .locator("a")
    .click()

  await emitSelectType(page, "OpenAPI Document")

  await emitSelectLanguageForOpenapi(page)

  await preContrastResult(
    page,
    "OpenAPI3...Succeeded",
    "Failed to emit project Successful",
    [10, 3]
  )
  await contrastResult(
    ["openapi.3.0.yaml"],
    path.resolve(
      workspacePath,
      "./Azure.AI.TextTranslation/tsp-output/@typespec/openapi3"
    )
  )
})
