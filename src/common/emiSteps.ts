import { Page } from "@playwright/test"

async function emitSelectProject(page: Page, text: string) {
  await page
    .getByRole("option", { name: new RegExp(text) })
    .locator("a")
    .click()
}

async function emitSelectType(page: Page, type: string) {
  await page.locator("a").filter({ hasText: type }).click()
}

async function emitSelectLanguageForOpenapi(page: Page) {
  await page
    .locator("a")
    .filter({ hasText: /^OpenAPI3$/ })
    .click()
}

export { emitSelectProject, emitSelectType, emitSelectLanguageForOpenapi }
