import { rm } from "fs/promises";
import fs from "node:fs";
import path from "node:path";
import { Locator, Page } from "playwright";
import { retry, screenShot, sleep } from "./utils";

/**
 * Waits for the specified text to appear on the page before proceeding.
 * @param page The Playwright Page object representing the current browser page.
 * @param text The text content to wait for on the page.
 * @param errorMessage The error message to throw if the text does not appear within the timeout.
 * @param timeout The maximum time (in milliseconds) to wait for the text to appear. Default is 10 seconds.
 */
export async function preContrastResult(
  page: Page,
  text: string,
  errorMessage: string,
  timeout: number = 10000,
) {
  try {
    await page.waitForSelector(`:text("${text}")`, { timeout });
  } catch (e) {
    throw new Error(errorMessage);
  }
}

/**
 * Results comparison
 * @param res List of expected files
 * @param dir The directory to be compared needs to be converted into an absolute path using path.resolve
 */
export async function contrastResult(page: Page, res: string[], dir: string) {
  let resLength = 0;
  if (fs.existsSync(dir)) {
    resLength = fs.readdirSync(dir).length;
    // await rm(imagesPath, { recursive: true });
  }
  if (resLength !== res.length) {
    await screenShot.screenshot(page, "linux", "error");
    throw new Error("Failed to matches all files");
  }
}

/**
 * All cases need to execute the steps. Click the top input box and enter the command
 * @param page vscode object
 * @param command After the top input box pops up, the command to be executed
 */
export async function startWithCommandPalette(page: Page, command: string) {
  await page.keyboard.press("ControlOrMeta+Shift+P");
  await page.waitForSelector('input[aria-label="Type the name of a command to run."]', {
    state: "visible",
  });
  await screenShot.screenshot(page, "linux", "open_top_panel");
  await page
    .getByRole("textbox", { name: "Type the name of a command to run." })
    .first()
    .fill(`>TypeSpec: ${command}`);
  let listForCreate: Locator;
  await retry(
    page,
    5,
    async () => {
      listForCreate = page
        .locator("a")
        .filter({ hasText: `TypeSpec: ${command}` })
        .first();
      return (await listForCreate.count()) > 0;
    },
    "Failed to find the specified option",
  );
  await screenShot.screenshot(page, "linux", "input_command");
  await listForCreate!.click();
}

/**
 * Start the Project with Right click on the file
 * @param page vscode object
 * @param command create, emit or import
 * @param type specify whether the click is on file, folder or empty folder
 * command: specify which command to execute to the project
 */
export async function startWithRightClick(page: Page, command: string, type?: string) {
  if (
    command == "Emit from TypeSpec" ||
    command == "Preview API Documentation"
  ) {
    await sleep(3);
    const target = page.getByRole("treeitem", { name: "main.tsp" }).locator("a")
    await target.click({ button: "right" })
    await screenShot.screenshot(page, "linux", "click_main")
    await page.getByRole("menuitem", { name: command }).click()
    await screenShot.screenshot(page, "linux",
      `${command == "Emit from TypeSpec" ? "emit" : "preview"}_typespec.png`
    )
  } else if (command == "Import TypeSpec from Openapi 3") {
    const targetName =
      type === "emptyfolder"
        ? "ImportTypespecProjectEmptyFolder"
        : "openapi.3.0.yaml"
    const target = page.getByRole("treeitem", { name: targetName }).locator("a")
    await target.click({ button: "right" })
    await screenShot.screenshot(page, "linux", "openapi.3.0")
    await sleep(3)
    await page
      .getByRole("menuitem", { name: "Import TypeSpec from OpenAPI" })
      .click()
    await screenShot.screenshot(page, "linux", "import_typespec")
  }
}

/**
 * If the current folder is not empty, sometimes a pop-up will appear
 * asking "Do you want to continue selecting the current folder as the root directory?".
 * In this method, select "yes" because selecting "no" does not make sense.
 * @param page vscode object
 */
export async function notEmptyFolderContinue(page: Page) {
  let yesBtn: Locator;
  await retry(
    page,
    5,
    async () => {
      yesBtn = page
        .getByRole("option", { name: "Yes" })
        .locator("label")
        .filter({ hasText: "Yes" })
        .first();
      const noBtn = page
        .getByRole("option", { name: "No" })
        .locator("label")
        .filter({ hasText: "No" })
        .first();
      return (await yesBtn.count()) > 0 && (await noBtn.count()) > 0;
    },
    "Failed to find yes/no button",
    1,
  );
  await retry(
    page,
    5,
    async () => {
      const yesdescriptionBox = page.getByRole("option", { name: "Yes" }).locator("label");
      const yesdescriptionText = await yesdescriptionBox.textContent();
      return yesdescriptionText !== null && yesdescriptionText.includes("YesSelected folder");
    },
    "Failed to match the description for the non-empty folder cases",
    1,
  );
  await screenShot.screenshot(page, "linux", "not_empty_folder_continue");
  await yesBtn!.click();
}

/**
 * Install plugins directly from vscode
 * @param page vscode object
 */
export async function installExtension(page: Page) {
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
  await sleep(20)
  await page
    .getByRole("tab", { name: /Explorer/ })
    .locator("a")
    .click()
}

/**
 * Install Typespec extension using the command line in VSCode's terminal.
 */
export async function installExtensionForCommand(page: Page, extensionDir: string) {
  console.log("extensionDir", extensionDir);
  const vsixPath =
    process.env.VSIX_PATH || path.resolve(__dirname, "../../extension.vsix");
  console.log("vsixPath", vsixPath);
  await screenShot.screenshot(page, "linux", "before_open_terminal");
  await sleep(5);
  await page.keyboard.press("Control+Backquote");
  await sleep(5);
  const cmd = page.getByRole("textbox", { name: /Terminal/ }).first();
  await sleep(5);
  await cmd.click();
  await screenShot.screenshot(page, "linux", "open_terminal");
  await sleep(5);
  await cmd.fill(`code --install-extension ${vsixPath} --extensions-dir ${extensionDir}`);
  await page.keyboard.press("Enter");
  await sleep(5);
  await screenShot.screenshot(page, "linux", "start_install_extension");
  await page.getByRole('tab', { name: 'Extensions (Ctrl+Shift+X)' }).locator('a').click();
  await sleep(5);
  await page.getByRole('tab', { name: 'Explorer (Ctrl+Shift+E)' }).locator('a').click();
}

export async function closeVscode(page: Page) {
  await page.getByRole("menuitem", { name: "File" }).click();
  await sleep(1);
  await page.getByRole("menuitem", { name: "Exit" }).click();
}

/**
 * If the current scenario is: the folder is not empty, you need to call this method
 * @param page vscode project
 * @param folderName The name of the folder that needs to be selected.
 */
export function createTestFile(folderName: string) {
  const filePath = path.join(folderName, "test.txt");
  fs.writeFileSync(filePath, "test");
}

/**
 * Placeholder file, need to be deleted
 * @param folderName The name of the folder that needs to be selected.
 */
export function deleteTestFile(folderName: string) {
  const filePath = path.join(folderName, "test.txt");
  fs.rmSync(filePath);
}
