import { Page } from "playwright"
import { retry, screenShot } from "./utils"

/**
 * When creating, select emitters
 * @param page vscode project
 * @param emitters The emitters that need to be selected. If you need to select all, just do not transmit them.
 */
async function selectEmitters(page: Page, emitters?: string[]) {
  const emittersConfig = [
    { name: 'OpenAPI 3.1 document', description: '@typespec/openapi3' },
    { name: 'C# client', description: '@typespec/http-client-csharp' },
    { name: 'Java client', description: '@typespec/http-client-java' },
    { name: 'JavaScript client', description: '@typespec/http-client-js' },
    { name: 'Python client', description: '@typespec/http-client-python' },
    { name: 'C# server stubs', description: '@typespec/http-server-csharp' },
    { name: 'JavaScript server stubs', description: '@typespec/http-server-js' },
  ];
 
  await retry(
    3,
    async () => {
      const checks = await Promise.all(
        emittersConfig.map(async (emitter) => {
          const nameLocator = page.locator("a").filter({ hasText: emitter.name });
          const descriptionLocator = page.getByLabel(emitter.description, { exact: true }).locator("a");
          return (await nameLocator.count() > 0 && await descriptionLocator.count() > 0);
        })
      );
      return checks.every((result) => result);
    },
    `Failed to find emitters or their descriptions as defined in the configuration`
  );
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
      return (await templateListName.count() > 0)
    },
    `Failed to find ${templateName} template.`
  )
  await retry(
    3,
    async () => {
      templateListDescription = page.getByLabel(templateNameDesctiption, {exact: true }).locator("a")
      return (await templateListDescription.count() > 0)
    },
    `Fail to match ${templateNameDesctiption} template description`
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
 * When creating, input service namespace
 * @param page vscode project
 */
async function inputServiceNameSpace(page: Page) {
  await retry(
    3,
    async () => {
      const titleInfoDescription = page.getByText('Please provide service')
      return (await titleInfoDescription.count() > 0)
    },
    "Failed to find the service namespace input box"
  )
  await screenShot.screenShot("input_service_namespace.png")
  await page.keyboard.press("Enter")
}

/**
 * When creating, input ARM Resource Provider name
 * @param page vscode project
 */
async function inputARMResourceProviderName(page: Page) {
  await retry(
    3,
    async () => {
      const titleInfoDescription = page.getByText('Please provide ARM Resource')
      return (await titleInfoDescription.count() > 0)
    },
    "Failed to find the ARM resource name input box"
  )
  await screenShot.screenShot("input_ARM_Resource_name.png")
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
export { selectEmitters, selectTemplate, inputProjectName, inputServiceNameSpace, inputARMResourceProviderName, startWithClick }