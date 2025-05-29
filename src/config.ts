enum EmitProjectTriggerType {
  Command = "Command",
  Click = "Click",
}

type EmitConfigType = {
  caseName: string
  selectType: string
  selectTypeLanguage: string
  triggerType: EmitProjectTriggerType
  expectedResults: string[]
}

const EmitcaseName = `EmitTypespecProject`
const EmitCasesConfigList: EmitConfigType[] = []

EmitCasesConfigList.push(
  // {
  //   caseName: "EmitTypespecProject-ClientCode-Python-CommandPallette",
  //   selectType: "Client Code",
  //   selectTypeLanguage: "Python",
  //   triggerType: EmitProjectTriggerType.Command,
  //   expectedResults: ["http-client-python"],
  // },
  // {
  //   caseName: "EmitTypespecProject-ClientCode-Java-CommandPallette",
  //   selectType: "Client Code",
  //   selectTypeLanguage: "Java",
  //   triggerType: EmitProjectTriggerType.Command,
  //   expectedResults: ["http-client-java"],
  // },
  // {
  //   caseName: "EmitTypespecProject-ClientCode-DotNet-RightClick",
  //   selectType: "Client Code",
  //   selectTypeLanguage: ".NET",
  //   triggerType: EmitProjectTriggerType.Click,
  //   expectedResults: ["http-client-csharp"],
  // },
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
  // {
  //   caseName: "EmitTypespecProject-ServerStub-DotNet-CommandPallette",
  //   selectType: "Server Stub",
  //   selectTypeLanguage: ".NET",
  //   triggerType: EmitProjectTriggerType.Command,
  //   expectedResults: ["http-server-csharp"],
  // },
  {
    caseName: "EmitTypespecProject-ServerStub-Js-RightClick",
    selectType: "Server Stub",
    selectTypeLanguage: "JavaScript",
    triggerType: EmitProjectTriggerType.Click,
    expectedResults: ["http-server-js"],
  },
)

export { EmitProjectTriggerType, EmitCasesConfigList }

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
