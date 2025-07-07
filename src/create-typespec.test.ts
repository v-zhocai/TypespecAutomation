import { mkdir, rm } from "fs/promises";
import path from "node:path";
import { beforeEach, describe } from "vitest";
import {
  closeVscode,
  contrastResult,
  createTestFile,
  deleteTestFile,
  installExtensionForCommand,
  notEmptyFolderContinue,
  preContrastResult,
  selectFolder,
  startWithCommandPalette,
} from "./common/common-steps";
import {
  inputProjectName,
  selectEmitters,
  selectTemplate,
  inputServiceNameSpace,
  inputARMResourceProviderName,
  startWithClick,
} from "./common/create-steps";
import { test, screenShot } from "./common/utils";

const __dirname = import.meta.dirname;
const projectRoot = path.resolve(__dirname, "../");
const tempDir = path.resolve(projectRoot, "./temp");

enum CreateProjectTriggerType {
  Click = "RightClick",
  Command = "CommandPalette",
};

type CreateConfigType = {
  caseName: string;
  triggerType: CreateProjectTriggerType;
  templateName: string;
  templateNameDescription: string;
  isEmptyFolder: boolean;
  expectedResults: string[];
};

const CreateTypespecProjectFolderPath = path.resolve(tempDir, "CreateTypespecProject");

const createCase = "CreateTypespecProject";
let templateName = "Generic Rest API";
let templateNameDescription = "Create a project representing a generic REST API service.";
let expectedResults = [
  ".gitignore",
  "main.tsp",
  "node_modules",
  "package-lock.json",
  "package.json",
  "tspconfig.yaml",
];

const CreateCasesConfigList: CreateConfigType[] = [
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase} ${templateName.replaceAll(" ", "")} Trigger ${CreateProjectTriggerType.Command} EmptyFolder`,
    templateName,
    templateNameDescription,
    isEmptyFolder: true,
    expectedResults,
  },
];

templateName = "Typespec library";
templateNameDescription = "Build your own TypeSpec library with custom types, decorators or linters.";
expectedResults = [
  "lib",
  "node_modules",
  "src",
  "test",
  ".gitignore",
  "eslint.config.js",
  "package.json",
  "package-lock.json",
  "prettierrc.yaml",
  "tsconfig.json",
];

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase} ${templateName.replaceAll(" ", "")} Trigger ${CreateProjectTriggerType.Click} EmptyFolder`,
    templateName,
    templateNameDescription,
    isEmptyFolder: true,
    expectedResults,
  },
);

templateName = "Typespec emitter";
templateNameDescription = "Create a new package that emits artifacts from TypeSpec.";
expectedResults = [
  "node_modules",
  "src",
  "test",
  ".gitignore",
  "eslint.config.js",
  "package.json",
  "package-lock.json",
  "prettierrc.yaml",
  "tsconfig.json",
];

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase} ${templateName.replaceAll(" ", "")} Trigger ${CreateProjectTriggerType.Command} NonEmptyFolder`,
    templateName,
    templateNameDescription,
    isEmptyFolder: false,
    expectedResults,
  },
);

templateName = "(rest-api-spec repo) Azure Data Plane Service Project";
templateNameDescription = "Create a project in rest-api-spec repo, representing an Azure service Data Plane API";
expectedResults = [
  "examples",
  ".gitignore",
  "client.tsp",
  "main.tsp",
  "tspconfig.yaml",
];

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase} ${templateName.replaceAll(" ", "")} Trigger ${CreateProjectTriggerType.Click} EmptyFolder`,
    templateName,
    templateNameDescription,
    isEmptyFolder: true,
    expectedResults,
  },
);

templateName = "(rest-api-spec repo) Azure Resource Manager Service Project";
templateNameDescription = "Create a project in rest-api-spec repo, representing an Azure service ARM API";
expectedResults = [
  "examples",
  ".gitignore",
  "employee.tsp",
  "main.tsp",
  "tspconfig.yaml",
];

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase} ${templateName.replaceAll(" ", "")} Trigger ${CreateProjectTriggerType.Click} NonEmptyFolder`,
    templateName,
    templateNameDescription,
    isEmptyFolder: false,
    expectedResults,
  },
);

const DataPlaneAPIProviderNameTemplates = [
  "(rest-api-spec repo) Azure Data Plane Service Project",
  "(stand alone) Azure Data Plane Service Project",
];

const ARMAPIProviderNameTemplates = [
  "(rest-api-spec repo) Azure Resource Manager Service Project",
  "(stand alone) Azure Resource Manager Service Project"
];

beforeEach(async () => {
  const dir = CreateTypespecProjectFolderPath;
  try {
    await rm(dir, { recursive: true });
  } catch {}
  await mkdir(dir, { recursive: true });
});

describe.each(CreateCasesConfigList)("CreateTypespecProject", async (item) => {
  const {
    caseName,
    triggerType,
    templateName,
    templateNameDescription,
    isEmptyFolder,
    expectedResults,
  } = item;

  test(caseName, async ({ launch }) => {
    screenShot.setCaseName(caseName);
    const workspacePath = CreateTypespecProjectFolderPath;
    const { page, extensionDir } = await launch({
      workspacePath: triggerType === CreateProjectTriggerType.Command ? workspacePath : "test",
    });
    if (!isEmptyFolder) {
      createTestFile(workspacePath);
    }

    await installExtensionForCommand(page, extensionDir);

    if (triggerType === CreateProjectTriggerType.Command) {
      await startWithCommandPalette(page, {
        folderName: path.basename(CreateTypespecProjectFolderPath),
        command: "Create Typespec Project",
      });
    } else {
      await startWithClick(page);
    }

    await selectFolder(page, triggerType === CreateProjectTriggerType.Command ? "" : workspacePath);

    if (!isEmptyFolder) {
      await notEmptyFolderContinue(page);
      deleteTestFile(workspacePath);
    }

    await selectTemplate(page, templateName, templateNameDescription);

    await inputProjectName(page);

    if (templateName === "Generic Rest API") {
      await selectEmitters(page);
    } else if (DataPlaneAPIProviderNameTemplates.includes(templateName)) {
      await inputServiceNameSpace(page);
    } else if (ARMAPIProviderNameTemplates.includes(templateName)) {
      await inputARMResourceProviderName(page);
    }

    await preContrastResult(
      page,
      "Project created",
      "Failed to create project Successful",
      [10, 15],
    );
    await closeVscode();
    await contrastResult(page, expectedResults, workspacePath);
  });
});
