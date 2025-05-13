import { Page } from "playwright"
import { retry, screenShot } from "./utils"

/**
 * When creating, select emitters
 * @param page vscode project
 * @param emitters The emitters that need to be selected. If you need to select all, just do not transmit them.
 */
async function selectEmitters(page: Page, emitters?: string[]) {
  await page.getByRole("checkbox", { name: "Toggle all checkboxes" }).check()
  await screenShot.screenShot("select_emitter.png")
  await page.keyboard.press("Enter")
}

/**
 * When creating, select template
 * @param page vscode project
 * @param templateName The name of the template that needs to be selected.
 */
async function selectTemplate(page: Page, templateName: string, templateNameDesctiption: string) {
  let templateListName
  let templateListDescription
  await retry(
    3,
    async () => {
      templateListName = page.locator("a").filter({ hasText: templateName })
      templateListDescription = page.getByLabel(templateNameDesctiption, {exact: true }).locator("a")
      return (await templateListName.count() > 0 && await templateListDescription.count() > 0)
    },
    `Failed to find the correct templateName and templateNameDesctiption`
  )
  await templateListName!.first().click()
}

/**
 * When creating, input project name
 * @param page vscode project
 */
async function inputProjectName(page: Page) {
  await retry(
    3,
    async () => {
      const titleInfo = page.getByText(/Please .*name/).first()
      return (await titleInfo.count()) > 0
    },
    "Failed to find the project name input box"
  )
  await screenShot.screenShot("input_project_name.png")
  await page.keyboard.press("Enter")
}

/**
 * When creating, start with click
 */

async function startWithClick(page: Page) {
  await screenShot.screenShot("start_with_click.png")
  await page.getByLabel("Explorer (Ctrl+Shift+E) - 1").nth(2).click()
  await screenShot.screenShot("open_tabs.png")
  await page.getByRole("button", { name: "Create TypeSpec Project" }).click()
}
export { selectEmitters, selectTemplate, inputProjectName, startWithClick }
