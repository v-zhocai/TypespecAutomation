import {
  inputProjectName,
  selectEmitters,
  selectTemplate,
  startCreateProject
} from "./common/steps"
import { test } from "./common/utils"

test("CreateTypespec-Generic REST API", async ({ launch }) => {
  const { page } = await launch({
    workspacePath: "./CreateTypespecProject"
  })
  await startCreateProject(page)
  await selectTemplate(page, "Generic REST API")
  await inputProjectName(page)
  await selectEmitters(page, ["OpenAPI", "C# client"])
})
