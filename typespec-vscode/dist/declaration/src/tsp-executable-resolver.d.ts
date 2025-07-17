import { ExtensionContext } from "vscode";
import { Executable } from "vscode-languageclient/node.js";
/**
 *
 * @param absoluteTargetPath the path is expected to be absolute path and no further expanding or resolving needed.
 * @returns
 */
export declare function resolveTypeSpecCli(absoluteTargetPath: string): Promise<Executable | undefined>;
export declare function resolveTypeSpecServer(activityId: string, context: ExtensionContext): Promise<Executable | undefined>;
//# sourceMappingURL=tsp-executable-resolver.d.ts.map