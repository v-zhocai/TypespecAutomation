import { beforeEach, describe } from "vitest";
import {
  closeVscode,
  contrastResult,
  installExtensionForCommand,
  preContrastResult,
  startWithRightClick,
  startWithCommandPalette,
} from "./common/common-steps";
import {
  emitSelectLanguage,
  emitSelectLanguageForOpenapi,
  emitSelectType,
  emiChooseEmitter
} from "./common/emit-steps";
import { screenShot, sleep, test, tempDir } from "./common/utils";
import path from "node:path";
import fs from "node:fs";

enum EmitProjectTriggerType {
  Command = "Command",
  Click = "Click",
};

type EmitConfigType = {
  caseName: string;
  selectType: string;
  selectTypeLanguage: string;
  triggerType: EmitProjectTriggerType;
  expectedResults: string[];
};

const EmitTypespecProjectFolderPath = path.resolve(tempDir, "EmitTypespecProject");
const EmitTypespecProjectFolderPathStubJs = path.resolve(tempDir, "EmitTypespecProjectStubJs");

const EmitcaseName = "EmitTypespecProject";
const EmitCasesConfigList: EmitConfigType[] = [
  {   
    caseName: "EmitTypespecProject-ClientCode-Python-CommandPallette",
    selectType: "Client Code",
    selectTypeLanguage: "Python",
    triggerType: EmitProjectTriggerType.Command,
    expectedResults: ["http-client-python"],
  },
  {
    caseName: "EmitTypespecProject-ClientCode-Java-CommandPallette",
    selectType: "Client Code",
    selectTypeLanguage: "Java",
    triggerType: EmitProjectTriggerType.Command,
    expectedResults: ["http-client-java"],
  },
  {
    caseName: "EmitTypespecProject-ClientCode-DotNet-RightClick",
    selectType: "Client Code",
    selectTypeLanguage: ".NET",
    triggerType: EmitProjectTriggerType.Click,
    expectedResults: ["http-client-csharp"],
  },
  {
    caseName: "EmitTypespecProject-ClientCode-Js-RightClick",
    selectType: "Client Code",
    selectTypeLanguage: "JavaScript",
    triggerType: EmitProjectTriggerType.Click,
    expectedResults: ["http-client-js"],
  },
  {
    caseName: "EmitTypespecProject-Openapi3-CommandPallette",
    selectType: "OpenAPI Document",
    selectTypeLanguage: "OpenAPI3",
    triggerType: EmitProjectTriggerType.Command,
    expectedResults: ["openapi3"],
  },
  {
    caseName: "EmitTypespecProject-Openapi3-RightClick",
    selectType: "OpenAPI Document",
    selectTypeLanguage: "OpenAPI3",
    triggerType: EmitProjectTriggerType.Click,
    expectedResults: ["openapi3"],
  },
  {
    caseName: "EmitTypespecProject-ServerStub-DotNet-CommandPallette",
    selectType: "Server Stub",
    selectTypeLanguage: ".NET",
    triggerType: EmitProjectTriggerType.Command,
    expectedResults: ["http-server-csharp"],
  },
  {
    caseName: "EmitTypespecProject-ServerStub-Js-RightClick",
    selectType: "Server Stub",
    selectTypeLanguage: "JavaScript",
    triggerType: EmitProjectTriggerType.Click,
    expectedResults: ["http-server-js"],
  },
]

beforeEach(() => {
  let dir = path.resolve(EmitTypespecProjectFolderPath, "tsp-output");
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.resolve(dir, file);
      fs.rmSync(filePath, { recursive: true, force: true });
    }
  }
  dir = path.resolve(EmitTypespecProjectFolderPathStubJs, "tsp-output");
  if (fs.existsSync(dir)) {
    for (const file of fs.readdirSync(dir)) {
      const filePath = path.resolve(dir, file);
      fs.rmSync(filePath, { recursive: true, force: true });
    }
  }
  const extensionDir = path.resolve(tempDir, "extensions");
  if (fs.existsSync(extensionDir)) {
    for (const file of fs.readdirSync(extensionDir)) {
      const filePath = path.resolve(extensionDir, file);
      fs.rmSync(filePath, { recursive: true, force: true });
    }
  }
});

describe.each(EmitCasesConfigList)("EmitTypespecProject", async (item) => {
  const {
    caseName,
    selectType,
    selectTypeLanguage,
    triggerType,
    expectedResults,
  } = item;
  test(caseName, async ({ launch }) => {
    screenShot.setCaseName(caseName);
    const isServerStubJS =
      selectType === "Server Stub" && selectTypeLanguage === "JavaScript"
    const workspacePath = !isServerStubJS ? EmitTypespecProjectFolderPath : EmitTypespecProjectFolderPathStubJs;  
    const { page, app, extensionDir } = await launch({
      workspacePath,
    });
    await sleep(3);
    // await installExtensionForCommand(page, extensionDir);
    if (triggerType === "Command") {
      await startWithCommandPalette(page, "Emit from Typespec");
    } else if (triggerType === "Click") {
      await startWithRightClick(page, "Emit from TypeSpec", "file");
    }

    await sleep(3);
    await emiChooseEmitter(page);
    await emitSelectType(page, selectType);
    if (selectTypeLanguage === "OpenAPI3") {
      await emitSelectLanguageForOpenapi(page);
    } else {
      await emitSelectLanguage(page, selectTypeLanguage, selectType);
    }

    const contrastMessage = selectTypeLanguage + "...Succeeded";
    await preContrastResult(
      page,
      contrastMessage,
      "Failed to emit project Successful",
      150000,
    );
    await screenShot.screenshot(page, "linux", "emit_result")

    app.close();

    const resultFilePath = path.resolve(workspacePath, "./tsp-output/@typespec");
    await contrastResult(page, expectedResults, resultFilePath);
  })
})