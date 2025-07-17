import { ExtensionContext } from "vscode";
import { ExtensionStateManager } from "../extension-state-manager.js";
export type InitTemplatesUrlSetting = {
    name: string;
    url: string;
};
export declare function registerInitTemplateUrls(items: InitTemplatesUrlSetting[]): void;
export declare function createTypeSpecProject(context: ExtensionContext, stateManager: ExtensionStateManager): Promise<void>;
//# sourceMappingURL=create-tsp-project.d.ts.map