export enum CreateProjectTriggerType {
  Click = "RightClick",
  Command = "CommandPalette",
}

type CreateConfigType = {
  caseName: string
  triggerType: CreateProjectTriggerType
  templateName: string
  templateNameDesctiption: string
  isEmptyFolder: boolean
  expectedResults: string[]
}

const createCase = "CreateTypespecProject"
let templateName = "Generic Rest API"
let templateNameDesctiption = "Create a project representing a generic REST API service."
let expectedResults = [
  ".gitignore",
  "main.tsp",
  "node_modules",
  "package-lock.json",
  "package.json",
  "tspconfig.yaml",
]

const CreateCasesConfigList: CreateConfigType[] = [
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-EmptyFolder`,
    templateName,
    templateNameDesctiption,
    isEmptyFolder: true,
    expectedResults,
  },
]

templateName = "Typespec library"
templateNameDesctiption = "Build your own TypeSpec library with custom types, decorators or linters."
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
]

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-EmptyFolder`,
    templateName,
    templateNameDesctiption,
    isEmptyFolder: true,
    expectedResults,
  },
)

templateName = "Typespec emitter"
templateNameDesctiption = "Create a new package that emits artifacts from TypeSpec."
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
]

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-NonEmptyFolder`,
    templateName,
    templateNameDesctiption,
    isEmptyFolder: false,
    expectedResults,
  }
)

templateName = "(rest-api-spec repo) Azure Data Plane Service Project"
templateNameDesctiption = "Create a project in rest-api-spec repo, representing an Azure service Data Plane API"
expectedResults = [
  "examples",
  ".gitignore",
  "client.tsp",
  "main.tsp",
  "tspconfig.yaml",
]

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-EmptyFolder`,
    templateName,
    templateNameDesctiption,
    isEmptyFolder: true,
    expectedResults,
  },
)

templateName = "(rest-api-spec repo) Azure Resource Manager Service Project"
templateNameDesctiption = "Create a project in rest-api-spec repo, representing an Azure service ARM API"
expectedResults = [
  "examples",
  ".gitignore",
  "employee.tsp",
  "main.tsp",
  "tspconfig.yaml",
]

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-NonEmptyFolder`,
    templateName,
    templateNameDesctiption,
    isEmptyFolder: false,
    expectedResults,
  },
)

templateName = "(stand alone) Azure Data Plane Service Project"
templateNameDesctiption = "Create a stand alone project representing an Azure service Data Plane API"
expectedResults = [
  "examples",
  "node_modules",
  ".gitignore",
  "client.tsp",
  "main.tsp",
  "package.json",
  "package-lock.json",
  "tspconfig.yaml",
]

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-EmptyFolder`,
    templateName,
    templateNameDesctiption,
    isEmptyFolder: true,
    expectedResults,
  },
)

templateName = "(stand alone) Azure Resource Manager Service Project"
templateNameDesctiption = "Create a stand alone project representing an Azure service ARM API"
expectedResults = [
  "examples",
  "node_modules",
  ".gitignore",
  "employee.tsp",
  "main.tsp",
  "package.json",
  "package-lock.json",
  "tspconfig.yaml",
]

CreateCasesConfigList.push(
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-NonEmptyFolder`,
    templateName,
    templateNameDesctiption,
    isEmptyFolder: false,
    expectedResults,
  }
)

const DataPlaneAPIProviderNameTemplates = [
  "(rest-api-spec repo) Azure Data Plane Service Project",
  "(stand alone) Azure Data Plane Service Project",
]

const ARMAPIProviderNameTemplates = [
  "(rest-api-spec repo) Azure Resource Manager Service Project",
  "(stand alone) Azure Resource Manager Service Project"
]

export { CreateCasesConfigList, DataPlaneAPIProviderNameTemplates, ARMAPIProviderNameTemplates }

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
