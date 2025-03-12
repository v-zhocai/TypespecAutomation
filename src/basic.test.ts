import { readFileSync, rmSync } from "node:fs"
import { beforeAll, beforeEach, onTestFailed } from "vitest"
import { test } from "./helper"

// Vitst extension doesn't work with CI flag
beforeAll(() => {
  delete process.env.CI
  delete process.env.GITHUB_ACTIONS
})

beforeEach<{ logPath: string }>(({ logPath }) => {
  onTestFailed(() => {
    console.error(`Log during test:\n${readFileSync(logPath, "utf-8")}`)
    if (!process.env.CI) {
      rmSync(logPath)
    }
  })
})

test("typespec demo", async ({ launch }) => {
  const { page } = await launch({
    workspacePath: "./CreateTypespecProject"
  })
  await page
    .getByRole("tab", { name: "Extensions (Ctrl+Shift+X)" })
    .locator("a")
    .click()
  await page.locator(".view-line").click()
  await page
    .getByRole("textbox", { name: "The editor is not accessible" })
    .fill("typespec")
  await page
    .getByLabel("TypeSpec, 0.66.0, Verified")
    .getByRole("button", { name: "Install" })
    .click()
  await page.getByRole("button", { name: "Trust Publisher & Install" }).click()
  await page
    .locator("li")
    .filter({ hasText: "CreateTypespecProject" })
    .first()
    .click()
  await page
    .getByRole("textbox", { name: "input" })
    .fill(">Create Typespec Project")
  await page.waitForTimeout(3000)
  await page
    .locator("label div")
    .filter({ hasText: "TypeSpec: Create TypeSpec" })
    .nth(3)
    .click()
  await page.pause()
})
