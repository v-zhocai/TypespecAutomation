enum ImportProjectTriggerType {
  CommandPalette = "CommandPalette",
  RightClickOnFile = "RightClickOnFile",
  RightClickOnFolder = "RightClickOnFolder",
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
    caseName: "ImportTypespecProject-RightClickOnFile-NonEmptyFolder",
    triggerType: ImportProjectTriggerType.RightClickOnFile,
    selectFolderEmptyOrNonEmpty: "non-empty",
    expectedResults: ["openapi.3.0.yaml", "main.tsp","ImportTypespecProjectEmptyFolder"],
  },
  {
    caseName: "ImportTypespecProject-RightClickOnFile-EmptyFolder",
    triggerType: ImportProjectTriggerType.RightClickOnFile,
    selectFolderEmptyOrNonEmpty: "empty",
    expectedResults: ["openapi.3.0.yaml", "ImportTypespecProjectEmptyFolder"],
  },
  {
    caseName: "ImportTypespecProject-RightClickOnFolder-NonEmptyFolder",
    triggerType: ImportProjectTriggerType.RightClickOnFolder,
    selectFolderEmptyOrNonEmpty: "non-empty",
    expectedResults: ["openapi.3.0.yaml", "main.tsp","ImportTypespecProjectEmptyFolder"],
  },
  {
    caseName: "ImportTypespecProject-RightClickOnFolder-EmptyFolder",
    triggerType: ImportProjectTriggerType.RightClickOnFolder,
    selectFolderEmptyOrNonEmpty: "empty",
    expectedResults: ["openapi.3.0.yaml", "ImportTypespecProjectEmptyFolder"],
  },
)

export { ImportCasesConfigList }