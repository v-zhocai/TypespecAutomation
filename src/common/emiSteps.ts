import { Page } from "playwright"
import { screenShot } from "./utils"

/**
 * When emitting a select project event, it will select the project with the given name.
 * @param page vscode project
 * @param text project name
 */
async function emitSelectProject(page: Page, text: string) {
  await page
    .getByRole("option", { name: new RegExp(text) })
    .locator("a")
    .click()
}

/**
 * When emitting a select emit type.
 * @param page vscode project
 * @param type emit type
 */
async function emitSelectType(page: Page, type: string) {
  await screenShot.screenShot("select_emitter_type.png")
  if (type == "OpenAPI Document" || type == "DefaultEmitterType") {
    await page.locator("a").filter({ hasText: type }).click()
  } else if (type == "Client Code") {
    await page.locator("a").filter({ hasText: "Client Code"}).first().click()
  } else if (type == "Server Stub") {
    await page.locator("a").filter({ hasText: /^Server Stub$/}).click()
  } else {
    await screenShot.screenShot("select_emitter_type_error.png")
    screenShot.save()
    throw new Error("Unsupported emit type")
  }
}

/**
 * If the emit type is `OpenApiDocument`, the language will be selected next. Call this method to select
 * @param page vscode project
 */
async function emitSelectLanguageForOpenapi(page: Page) {
  await screenShot.screenShot("select_language_openapi.png")
  await page
    .locator("a")
    .filter({ hasText: /^OpenAPI3$/ })
    .click()
}

/**
 * If the emit type is chosen, the language will be selected next. Call this method to select
 * @param page vscode project
 * @param language language name (OpenAPI3, Python, Java, .NET, JavaScript)
 */
async function emitSelectLanguage(page: Page, language: string = "") {
  await screenShot.screenShot("select_language_" + language + ".png")
  const languageList = ["OpenAPI3", "Python", "Java", ".NET", "JavaScript"]
  if (languageList.indexOf(language) != -1) {
    await page
      .locator("a")
      .filter({ hasText: language })
      .first()
      .click()    
  } else {
    await screenShot.screenShot("select_emitter_type_error.png")
    screenShot.save()
    throw new Error("Unsupported language")
  }
}

export { emitSelectProject, emitSelectType, emitSelectLanguageForOpenapi, emitSelectLanguage }
