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
//    await installExtensionForCommand(page, extensionDir);
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

    app.close();

    const resultFilePath = path.resolve(workspacePath, "./tsp-output/@typespec");
    await contrastResult(page, expectedResults, resultFilePath);
  })
})