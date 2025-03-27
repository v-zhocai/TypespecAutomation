import { Locator, Page } from "@playwright/test"
import { retry, sleep } from "./utils"
import { keyboard, Key } from "@nut-tree/nut-js"
import fs from "node:fs"

async function preContrastResult(
  page: Page,
  text: string,
  errorMessage: string,
  [count, sleep]: number[] = [10, 5]
) {
  await retry(
    count,
    async () => {
      const contrastResult = page.getByText(new RegExp(text)).first()
      return (await contrastResult.count()) > 0
    },
    errorMessage,
    sleep
  )
}

async function contrastResult(res: string[], dir: string) {
  let resLength = 0
  if (fs.existsSync(dir)) {
    console.log(fs.readdirSync(dir))
    resLength = fs.readdirSync(dir).length
  }
  if (resLength !== res.length) {
    throw new Error("Failed to matches all files")
  }
}

async function start(
  page: Page,
  { folderName, command }: { folderName: string; command: string }
) {
  await page.locator("li").filter({ hasText: folderName }).first().click()

  await page
    .getByRole("textbox", { name: "input" })
    .first()
    .fill(`>Typespec: ${command}`)
  let listForCreate: Locator = page
    .locator("a")
    .filter({ hasText: `TypeSpec: ${command}` })
    .first()
  await retry(
    5,
    async () => {
      listForCreate = page
        .locator("a")
        .filter({ hasText: `TypeSpec: ${command}` })
        .first()
      return (await listForCreate.count()) > 0
    },
    "Failed to find the specified option"
  )

  await listForCreate.click()
}

async function selectFolder(file: string = "") {
  await sleep(10)
  if (file) {
    if (!process.env.CI) {
      await keyboard.pressKey(Key.CapsLock)
    }
    await keyboard.type(file)
  }
  await keyboard.pressKey(Key.Enter)
}

async function notEmptyFolderContinue(page: Page) {
  let yesBtn = page.locator("a").filter({ hasText: "Yes" }).first()
  await retry(
    5,
    async () => {
      yesBtn = page.locator("a").filter({ hasText: "Yes" }).first()
      return (await yesBtn.count()) > 0
    },
    "Failed to find yes button",
    1
  )
  await yesBtn.click()
}

async function installExtension(page: Page) {
  await page
    .getByRole("tab", { name: /Extensions/ })
    .locator("a")
    .click()
  await page.keyboard.type("Typespec")
  await page
    .getByLabel(/TypeSpec/)
    .getByRole("button", { name: "Install" })
    .click()
  await page.getByRole("button", { name: "Trust Publisher & Install" }).click()
  await sleep(10)
  await page
    .getByRole("tab", { name: /Explorer/ })
    .locator("a")
    .click()
}

export {
  start,
  contrastResult,
  selectFolder,
  preContrastResult,
  notEmptyFolderContinue,
  installExtension,
}
