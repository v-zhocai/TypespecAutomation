import { Page } from "@playwright/test"
import { retry } from "./utils"

async function selectEmitters(page: Page, emitters: string[]) {
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

export { selectEmitters, selectTemplate, inputProjectName }
