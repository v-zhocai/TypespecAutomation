import { Page } from "@playwright/test"
import { retry, sleep } from "./utils"
import { keyboard, Key } from "@nut-tree/nut-js"

async function selectEmitters(page: Page, emitters: string[]) {
  await page.keyboard.press("Enter")
}

async function inputProjectName(page: Page) {
  let titleInfo = page.getByText(/Please .*name/).first()
  await retry(
    3,
    async () => {
      return (await titleInfo.count()) > 0
    },
    "Failed to find the project name input box"
  )
  await page.keyboard.press("Enter")
}

async function selectTemplate(page: Page, templateName: string) {
  const templateList = page.locator("a").filter({ hasText: templateName })
  await retry(
    3,
    async () => {
      return (await templateList.count()) > 0
    },
    `Failed to find ${templateName} template`
  )
  await templateList.first().click()
}

async function startCreateProject(page: Page) {
  await page
    .locator("li")
    .filter({ hasText: "CreateTypespecProject" })
    .first()
    .click()
  await page
    .getByRole("textbox", { name: "input" })
    .fill(">Typespec: Create TypeSpec Project")
  const listForCreate = page
    .locator("a")
    .filter({ hasText: "TypeSpec: Create TypeSpec Project" })
    .first()

  await retry(
    5,
    async () => {
      return (await listForCreate.count()) > 0
    },
    "Failed to find the specified option"
  )

  await sleep(5)
  await listForCreate.click()
  await sleep(8)
  await keyboard.pressKey(Key.Enter)
}
export { startCreateProject, selectTemplate, inputProjectName, selectEmitters }
