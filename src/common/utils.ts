import fs from "node:fs";
import os from "node:os";
import path, { join } from "node:path";
import { ElectronApplication, Page, _electron } from "playwright";
import { test as baseTest, inject } from "vitest";
import { closeVscode } from "./common-steps";

const __dirname = import.meta.dirname;
const projectRoot = path.resolve(__dirname, "../../");
const imagesPath = path.resolve(projectRoot, "images-linux");
export const tempDir = path.resolve(projectRoot, "temp");

interface Context {
  page: Page;
  app: ElectronApplication;
  extensionDir: string;
}

type LaunchFixture = (options: {
  extensionPath?: string;
  workspacePath: string;
  trace?: "on" | "off";
}) => Promise<Context>;

/**
 * The core method of the test, this method is encapsulated.
 * With the help of the `_electron` object, you can open a vscode and get the page object
 */
const test = baseTest.extend<{
  launch: LaunchFixture;
}>({
  launch: async ({ task }, use) => {
    const teardowns: (() => Promise<void>)[] = [];

    await use(async (options) => {
      const executablePath = inject("executablePath");
      const workspacePath = options.workspacePath;
      let envOverrides = {};
      const codePath = path.join(executablePath, "../bin");
      envOverrides = {
        PATH: `${codePath}${path.delimiter}${process.env.PATH}`,
      };

      const app = await _electron.launch({
        executablePath,
        env: {
          ...process.env,
          ...envOverrides,
        },
        args: [
          "--no-sandbox",
          "--disable-gpu-sandbox",
          "--disable-updates",
          "--skip-welcome",
          "--skip-release-notes",
          "--disable-workspace-trust",
          `--extensions-dir=${path.resolve(tempDir, "extensions")}`,
          `--user-data-dir=${path.resolve(tempDir, "user-data")}`,
          `--folder-uri=file:${path.resolve(workspacePath)}`,
        ].filter((v): v is string => !!v),
      });
      const page = await app.firstWindow();
      const tracePath = join(projectRoot, "test-results", task.name, "trace.zip");
      const artifactsDir = join(tempDir, "playwright-artifacts");
      await fs.promises.mkdir(artifactsDir, { recursive: true }); // make sure the directory exists
      // process.env.TMPDIR = artifactsDir;
      await page.waitForLoadState("load");
      await page.waitForTimeout(3000);
      await page
        .context()
        .tracing.start({ screenshots: true, snapshots: true, title: task.name });
      teardowns.push(async () => {
        try {
          await page.context().tracing.stop({ path: tracePath });
        } catch (error) {
          console.error("Failed to stop tracing:", error);
        }
      });
      return { page, app , extensionDir: path.resolve(tempDir, "extensions")};
    });

    for (const teardown of teardowns) await teardown();
  },
});

async function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

/**
 * @param count Number of retries
 * @param fn Main process retry function, when this function returns true, retry ends
 * @param errMessage If the number of retries reaches 0, an error is thrown
 * @param gap
 * @returns Retry Interval
 */
async function retry(
  page: Page,
  count: number,
  fn: () => Promise<boolean>,
  errMessage: string,
  gap: number = 2,
) {
  while (count > 0) {
    await sleep(gap);
    if (await fn()) {
      return;
    }
    count--;
  }
  await screenShot.screenshot(page, "linux", "error");
  await closeVscode(page);
  throw new Error(errMessage);
}

/**
 * ScreenshotHelper is a utility class for managing and taking screenshots during tests.
 * It allows you to set a case name, and generates screenshot files with a consistent naming pattern
 * that includes the case name and a custom step name.
 */
class ScreenshotHelper {
  caseName: string;
  counter: number = 1;

  constructor(caseName: string) {
    this.caseName = caseName;
  }

  async setCaseName(caseName: string) {
    this.caseName = caseName;
    this.counter = 1;
  }

  /**
   * Take a screenshot with a consistent path pattern.
   * @param page playwright page
   * @param os operating system, e.g. "linux"
   * @param name screenshot name, without extension
   */
  async screenshot(page: Page, os: "linux", name: string) {
    const dirPath = path.join(imagesPath, this.caseName);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, `${this.counter ++}_${name}.png`);
    await page.screenshot({ path: filePath });
  }
}

const screenShot = new ScreenshotHelper("default");

export { retry, screenShot, sleep, test };
