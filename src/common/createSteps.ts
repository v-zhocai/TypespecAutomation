import { Page } from "playwright"
import { retry, screenShot } from "./utils"

/**
 * When creating, select emitters
 * @param page vscode project
 * @param emitters The emitters that need to be selected. If you need to select all, just do not transmit them.
 */
async function selectEmitters(page: Page, emitters?: string[]) {
  let EmitterNameOpenAPI
  let EmitterDescriptionOpenAPI
  await retry(
    3,
    async () => {
      const EmitterNameOpenAPI = page.locator("a").filter({ hasText: 'OpenAPI 3.1 document' })
      const EmitterDescriptionOpenAPI = page.getByLabel('@typespec/openapi3', {exact: true }).locator("a")

      const EmitterNameCSharpClient = page.locator("a").filter({ hasText: 'C# client' })
      const EmitterDescriptionCSharpClient = page.getByLabel('@typespec/http-client-csharp', {exact: true }).locator("a")

      const EmitterNameJavaClient = page.locator("a").filter({ hasText: 'Java client' })
      const EmitterDescriptionJavaClient = page.getByLabel('@typespec/http-client-java', {exact: true }).locator("a")

      const EmitterNameJavaScriptClient = page.locator("a").filter({ hasText: 'JavaScript client' })
      const EmitterDescriptionJavaScriptClient = page.getByLabel('@typespec/http-client-js', {exact: true }).locator("a")

      const EmitterNamePythonClient = page.locator("a").filter({ hasText: 'Python client' })
      const EmitterDescriptionPythonClient = page.getByLabel('@typespec/http-client-python', {exact: true }).locator("a")

      const EmitterNameCSharpServer = page.locator("a").filter({ hasText: 'C# server stubs' })
      const EmitterDescriptionCSharpServer = page.getByLabel('@typespec/http-server-csharp', {exact: true }).locator("a")

      const EmitterNameJavaScriptServer = page.locator("a").filter({ hasText: 'JavaScript server stubs' })
      const EmitterDescriptionJavaScriptServer = page.getByLabel('@typespec/http-server-js', {exact: true }).locator("a")

      return (await EmitterNameOpenAPI.count() > 0 && await EmitterDescriptionOpenAPI.count() > 0 
        && await EmitterNameCSharpClient.count() > 0 && await EmitterDescriptionCSharpClient.count() > 0
        && await EmitterNameJavaClient.count() > 0 && await EmitterDescriptionJavaClient.count() > 0
        && await EmitterNameJavaScriptClient.count() > 0 && await EmitterDescriptionJavaScriptClient.count() > 0
        && await EmitterNamePythonClient.count() > 0 && await EmitterDescriptionPythonClient.count() > 0
        && await EmitterNameCSharpServer.count() > 0 && await EmitterDescriptionCSharpServer.count() > 0
        && await EmitterNameJavaScriptServer.count() > 0 && await EmitterDescriptionJavaScriptServer.count() > 0
      )
    },
    `Failed to find ${EmitterNameOpenAPI} template. Fail to match ${EmitterDescriptionOpenAPI} template description`
  )
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
    `Failed to find ${templateName} template. Fail to match ${templateNameDesctiption} template description`
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
      const titleInfoDescription = page.getByText('Please input the project name')
      return (await titleInfo.count() > 0 && await titleInfoDescription.count() > 0)
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
