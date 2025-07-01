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

const DataPlaneAPIProviderNameTemplates = [
  "(rest-api-spec repo) Azure Data Plane Service Project",
  "(stand alone) Azure Data Plane Service Project",
]

const ARMAPIProviderNameTemplates = [
  "(rest-api-spec repo) Azure Resource Manager Service Project",
  "(stand alone) Azure Resource Manager Service Project"
]

export { CreateCasesConfigList, DataPlaneAPIProviderNameTemplates, ARMAPIProviderNameTemplates }
