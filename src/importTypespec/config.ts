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
  {
    caseName: "ImportTypespecProject-CommandPalette-NonEmptyFolder",
    triggerType: ImportProjectTriggerType.CommandPalette,
    selectFolderEmptyOrNonEmpty: "non-empty",
    expectedResults: ["openapi.3.0.yaml", "main.tsp","ImportTypespecProjectEmptyFolder"],
  },
  {
    caseName: "ImportTypespecProject-CommandPalette-EmptyFolder",
    triggerType: ImportProjectTriggerType.CommandPalette,
    selectFolderEmptyOrNonEmpty: "empty",
    expectedResults: ["openapi.3.0.yaml", "ImportTypespecProjectEmptyFolder"],
  },    
  {
    caseName: "ImportTypespecProject-RightClickonFile-NonEmptyFolder",
    triggerType: ImportProjectTriggerType.RightClickonFile,
    selectFolderEmptyOrNonEmpty: "non-empty",
    expectedResults: ["openapi.3.0.yaml", "main.tsp","ImportTypespecProjectEmptyFolder"],
  },
  {
    caseName: "ImportTypespecProject-RightClickonFile-EmptyFolder",
    triggerType: ImportProjectTriggerType.RightClickonFile,
    selectFolderEmptyOrNonEmpty: "empty",
    expectedResults: ["openapi.3.0.yaml", "ImportTypespecProjectEmptyFolder"],
  },
  {
    caseName: "ImportTypespecProject-RightClickonFolder-NonEmptyFolder",
    triggerType: ImportProjectTriggerType.RightClickonFolder,
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

export { ImportCasesConfigList }