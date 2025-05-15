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
  let checks: any[] = [];
  await retry(
    3,
    async () => {
      checks = await Promise.all(
        emittersConfig.map(async (emitter, index) => {
          const nameLocator = page.locator("a").filter({ hasText: emitter.name });
          const nameExists = await nameLocator.count() > 0;

          const nameBoxLocator = page.getByRole("checkbox", { name: `${emitter.name}, @`})
          let nameBoxLocatorText = await nameBoxLocator.textContent()
          let nameDescription = nameBoxLocatorText?.slice(emitter.name.length)
          // to deal with @typespec/http-client-java case
          if (nameDescription && nameDescription.endsWith("Azure")) {
            nameDescription = nameDescription.slice(0, -5)
          }
          // to deal with @typespec/http-server-js case
          if (nameDescription && nameDescription.endsWith("Settings")) {
            nameDescription = nameDescription.slice(0, -8)
          }

          if (!nameExists) {
            throw new Error(`Failed to find the following emitter name: "${emitter.name}".`);
          }
          if (nameDescription != emitter.description) {
            throw new Error(`Description mismatched, expected "${emitter.description}", got "${nameDescription}".`);
          }
          return checks.every((result) => result);
        })
      );
      return true;
    },
    "Failed to find the selectEmitter box"
  );
  await page.getByRole("checkbox", { name: "Toggle all checkboxes" }).check()
  await screenShot.screenShot("select_emitter.png")
  await page.keyboard.press("Enter")
}

/**
 * When creating, select template
 * @param page vscode project
 * @param templateName The name of the template that needs to be selected.
 * @param templateNameDesctiption The description of the template that needs to be selected.
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
    `Failed to find the following template: "${templateName}".`
  )
  await retry(
    3,
    async () => {
      let templateListBox = page.getByRole("option", { name: templateName}).locator('label')
      let templateListDescriptionArr = await templateListBox.allTextContents();
      templateListDescription = templateListDescriptionArr[0].slice(templateName.length)
      if (templateNameDesctiption == templateListDescription){
        return true
      } else {
        throw new Error(`Description mismatched, expected "${templateNameDesctiption}", got "${templateListDescription}".`)
      }
    },
    "Failed to find the selectTemplate box"
  )
  await templateListName!.first().click()
}

/**
 * When creating, verify the descripton below, then input project name
 * @param page vscode project
 */
async function inputProjectName(page: Page) {
  let titleInfoDescription = "Please input the project name (Press 'Enter' to confirm or 'Escape' to cancel)" 
  await retry(
    3,
    async () => {
      let titleBox = page.locator('div').filter({ hasText: '0 Results0 SelectedPlease' }).nth(2)
      let titleBoxText = await titleBox.textContent()
      if (titleBoxText && titleBoxText.startsWith("0 Results0 Selected")) {
        titleBoxText = titleBoxText.slice(19)
      }
      if (titleBoxText && titleBoxText.endsWith("OK")) {
        titleBoxText = titleBoxText.slice(0, -2)
      }

      if (titleBoxText === titleInfoDescription){
        return true
      } else {
        throw new Error(`Description mismatched, expected "${titleInfoDescription}", got "${titleBoxText}".`)
      }
    },
    "Failed to find the project name input box"
  )
  await screenShot.screenShot("input_project_name.png")
  await page.keyboard.press("Enter")
}

/**
 * When creating, verify the description below, then input service namespace
 * @param page vscode project
 */
async function inputServiceNameSpace(page: Page) {
  let titleInfoDescription = "Please provide service namespace in Pascal case: (Press 'Enter' to confirm or 'Escape' to cancel)" 
  await retry(
    3,
    async () => {
      let titleBox = page.locator('div').filter({ hasText: '0 Results0 SelectedPlease' }).nth(2)
      let titleBoxText = await titleBox.textContent()
      if (titleBoxText && titleBoxText.startsWith("0 Results0 Selected")) {
        titleBoxText = titleBoxText.slice(19)
      } 
      if (titleBoxText && titleBoxText.endsWith("OK")) {
        titleBoxText = titleBoxText.slice(0, -2)
      }
      if (titleBoxText === titleInfoDescription){
        return true
      } else {
        throw new Error(`Description mismatched, expected "${titleInfoDescription}", got "${titleBoxText}".`)
      }
    },
    "Failed to find the service namespace input box"
  )
  await screenShot.screenShot("input_service_namespace.png")
  await page.keyboard.press("Enter")
}

/**
 * When creating, verify the description below, then input ARM Resource Provider name
 * @param page vscode project
 */
async function inputARMResourceProviderName(page: Page) {
  let titleInfoDescription = "Please provide ARM Resource Provider Name in Pascal case, excluding the 'Microsoft.' prefix: (Press 'Enter' to confirm or 'Escape' to cancel)" 
  await retry(
    3,
    async () => {
      let titleBox = page.locator('div').filter({ hasText: '0 Results0 SelectedPlease' }).nth(2)
      let titleBoxText = await titleBox.textContent()
      if (titleBoxText && titleBoxText.startsWith("0 Results0 Selected")) {
        titleBoxText = titleBoxText.slice(19)
      } 
      if (titleBoxText && titleBoxText.endsWith("OK")) {
        titleBoxText = titleBoxText.slice(0, -2)
      }
      if (titleBoxText === titleInfoDescription){
        return true
      } else {
        throw new Error(`Description mismatched, expected "${titleInfoDescription}", got "${titleBoxText}".`)
      }
    },
    "Failed to find the ARM Resource Provider name input box"
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