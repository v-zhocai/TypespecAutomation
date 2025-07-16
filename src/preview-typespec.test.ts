import { beforeEach, describe } from "vitest"
import { retry, screenShot, test, tempDir } from "./common/utils"
import path from "node:path"
import {
  closeVscode,
  installExtensionForCommand,
  startWithCommandPalette,
  startWithRightClick,
} from "./common/common-steps"
import fs from "node:fs"

export enum PreviewProjectTriggerType {
  Command = "Command",
  Click = "Click",
}

type PreviewConfigType = {
  caseName: string
  triggerType: PreviewProjectTriggerType
}

const PreviewTypespecProjectFolderPath = path.resolve(tempDir, "PreviewTypespecProject")

const PreviewCaseName = `PreviewTypespecProject`
const PreviewCasesConfigList: PreviewConfigType[] = []

PreviewCasesConfigList.push(
  {
    caseName: `${PreviewCaseName}-Trigger_${PreviewProjectTriggerType.Click}`,
    triggerType: PreviewProjectTriggerType.Click,
  },
  {
    caseName: `${PreviewCaseName}_Trigger_${PreviewProjectTriggerType.Command}`,
    triggerType: PreviewProjectTriggerType.Command,
  }
)

beforeEach(() => {
  const previewTypespec = PreviewTypespecProjectFolderPath;
  if (fs.existsSync(previewTypespec)) {
    let hasMainTsp = false
    for (const file of fs.readdirSync(previewTypespec)) {
      if (file === "main.tsp") {
        hasMainTsp = true
      } else {
        const filePath = path.resolve(previewTypespec, file)
        fs.rmSync(filePath, { recursive: true, force: true })
      }
    }
    if (!hasMainTsp) {
      throw new Error("Failed to find main.tsp file")
    }
  } else {
    throw new Error("Failed to find PreviewTypespecProject directory")
  }
})

describe.each(PreviewCasesConfigList)("PreviewAPIDocument", async (item) => {
  const { caseName, triggerType } = item
  test(caseName, async ({ launch }) => {
    screenShot.setCaseName(caseName);
    const workspacePath = PreviewTypespecProjectFolderPath
    const { page, app, extensionDir } = await launch({
      workspacePath,
    })
    await installExtensionForCommand(page, extensionDir)
    if (triggerType === PreviewProjectTriggerType.Command) {
      await page
        .getByRole("treeitem", { name: "main.tsp" })
        .locator("a")
        .click()
      await startWithCommandPalette(page, "Preview API Documentation");
    } else {
      await startWithRightClick(page, "Preview API Documentation")
    }
    await screenShot.screenshot(page, "linux", "preview_api_document.png")
    await retry(
      page,
      10,
      async () => {
        const previewContent = page
          .locator("iframe")
          .contentFrame()
          .locator("html")
          .first()

        return (await previewContent.count()) > 0
      },
      "Failed to compilation completed successfully",
      3
    )
    app.close();
  })
})