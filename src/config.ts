enum ImportProjectTriggerType {
  CommandPalette = "CommandPalette",
  RightClickonFile = "RightClickonFile",
  RightClickonFolder = "RightClickonFolder",
}

type ImportConfigType = {
  caseName: string
  triggerType: ImportProjectTriggerType
  selectFolderEmptyOrNonEmpty: string
  expectedResults: string[]
}

const ImportCasesConfigList: ImportConfigType[] = []

ImportCasesConfigList.push(
  // {
  //   caseName: "ImportTypespecProject-CommandPalette-EmptyFolder",        
  //   triggerType: ImportProjectTriggerType.CommandPalette,
  //   selectFolderEmptyOrNonEmpty: "empty",
  //   expectedResults: ["openapi.3.0.yaml", "ImportTypespecProjectEmptyFolder"],
  // },    
  {
    caseName: "ImportTypespecProject-RightClickonFile-NonEmptyFolder",
    triggerType: ImportProjectTriggerType.RightClickonFile,
    selectFolderEmptyOrNonEmpty: "non-empty",
    expectedResults: ["openapi.3.0.yaml", "main.tsp","ImportTypespecProjectEmptyFolder"],
  },
  {
    caseName: "ImportTypespecProject-RightClickonFolder-EmptyFolder",
    triggerType: ImportProjectTriggerType.RightClickonFolder,
    selectFolderEmptyOrNonEmpty: "empty",
    expectedResults: ["openapi.3.0.yaml", "ImportTypespecProjectEmptyFolder"],
  },
)

export { ImportProjectTriggerType, ImportCasesConfigList }

enum PreviewProjectTriggerType {
  Command = "Command",
  Click = "Click",
}

type PreviewConfigType = {
  caseName: string
  triggerType: PreviewProjectTriggerType
}

const PreviewCaseName = `PreviewTypespecProject`
const PreviewCasesConfigList: PreviewConfigType[] = []

PreviewCasesConfigList.push(
  {
    caseName: `${PreviewCaseName}-Trigger_${PreviewProjectTriggerType.Click}`,
    triggerType: PreviewProjectTriggerType.Click,
  },
  {
    caseName: `${PreviewCaseName}_Trigger_${PreviewProjectTriggerType.Command}`,
    triggerType: PreviewProjectTriggerType.Command,
  }
)

export { PreviewProjectTriggerType, PreviewCasesConfigList }
