export enum CreateProjectTriggerType {
  Click = "RightClick",
  Command = "CommandPalette",
}

type CreateConfigType = {
  caseName: string
  triggerType: CreateProjectTriggerType
  templateName: string
  isEmptyFolder: boolean
  expectedResults: string[]
}

const createCase = "CreateTypespecProject"
let templateName = "Generic Rest API"
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
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  },
]

templateName = "Typespec library"
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
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  }
)
templateName = "Typespec emitter"
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
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  }
)

templateName = "(rest-api-spec repo) Azure Data Plane Service Project"
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
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  }
)

templateName = "(rest-api-spec repo) Azure Resource Manager Service Project"
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
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  }
)

templateName = "(stand alone) Azure Data Plane Service Project"
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
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  }
)

templateName = "(stand alone) Azure Resource Manager Service Project"
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
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Click,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Click}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-EmptyFolder`,
    templateName,
    isEmptyFolder: true,
    expectedResults,
  },
  {
    triggerType: CreateProjectTriggerType.Command,
    caseName: `${createCase}-${templateName.replaceAll(" ", "")}-Trigger_${CreateProjectTriggerType.Command}-NonEmptyFolder`,
    templateName,
    isEmptyFolder: false,
    expectedResults,
  }
)

const ProviderNameTemplates = [
  "(rest-api-spec repo) Azure Data Plane Service Project",
  "(rest-api-spec repo) Azure Resource Manager Service Project",
  "(stand alone) Azure Data Plane Service Project",
  "(stand alone) Azure Resource Manager Service Project",
]

export { CreateCasesConfigList, ProviderNameTemplates }
