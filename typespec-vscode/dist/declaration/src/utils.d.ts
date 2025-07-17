import type { ModuleResolutionResult, PackageJson } from "@typespec/compiler";
import { SpawnOptions } from "child_process";
import { CancellationToken } from "vscode";
import { Executable } from "vscode-languageclient/node.js";
export declare function isFile(path: string): Promise<boolean>;
export declare function isDirectory(path: string): Promise<boolean>;
export declare function createTempDir(tmpRoot: string, prefix: string): Promise<string | undefined>;
export declare function isWhitespaceStringOrUndefined(str: string | undefined): boolean;
export declare function listParentFolder(folder: string, includeSelf: boolean): Generator<string, void, unknown>;
/**
 *
 * @param exe
 * @param win32Only only use Shell when the process.platform is "win32"
 * @returns
 */
export declare function useShellInExec(exe: Executable, win32Only?: boolean): Executable;
export declare function loadModule(baseDir: string, packageName: string): Promise<ModuleResolutionResult | undefined>;
export declare function tryParseJson(str: string): any | undefined;
export declare function tryReadFileOrUrl(pathOrUrl: string): Promise<{
    content: string;
    url: string;
} | undefined>;
export declare function tryReadFile(path: string): Promise<string | undefined>;
export declare function tryReadDir(path: string): Promise<string[] | undefined>;
export declare function tryReadUrl(url: string): Promise<{
    content: string;
    url: string;
} | undefined>;
export declare function tryParseYaml(str: string): any | undefined;
export interface ExecOutput {
    stdout: string;
    stderr: string;
    exitCode: number;
    error: any;
    spawnOptions: SpawnOptions;
}
export interface spawnExecutionEvents {
    onStdioOut?: (data: string) => void;
    onStdioError?: (error: string) => void;
    onError?: (error: any, stdout: string, stderr: string) => void;
    onExit?: (code: number | null, stdout: string, stderror: string) => void;
}
/**
 * The promise will be rejected if the process exits with non-zero code or error occurs. Please make sure the rejection is handled property with try-catch
 *
 * @param exe
 * @param args
 * @param cwd
 * @returns
 */
export declare function spawnExecutionAndLogToOutput(exe: string, args: string[], cwd: string, env?: NodeJS.ProcessEnv, logStderrAsError?: boolean): Promise<ExecOutput>;
/**
 * The promise will be rejected if the process exits with non-zero code or error occurs. Please make sure the rejection is handled property with try-catch
 *
 * @param exe
 * @param args
 * @param cwd
 * @param on
 * @returns
 */
export declare function spawnExecution(exe: string, args: string[], cwd: string, env?: NodeJS.ProcessEnv, on?: spawnExecutionEvents): Promise<ExecOutput>;
export declare function isExecOutputCmdNotFound(output: ExecOutput): boolean;
/**
 * if the operation is cancelled, the promise will be rejected with {@link ResultCode.Cancelled}
 * if the operation is timeout, the promise will be rejected with {@link ResultCode.Timeout}
 *
 * @param action
 * @param token
 * @param timeoutInMs
 * @returns
 */
export declare function createPromiseWithCancelAndTimeout<T>(action: Promise<T>, token: CancellationToken, timeoutInMs: number): Promise<T>;
export declare function listParentFolders(from: string, includeSelf: boolean): Generator<string, void, unknown>;
/**
 *
 * @param folder the folder (inclusive) to start searching (up) for package.json
 * @returns
 */
export declare function searchAndLoadPackageJson(folder: string): Promise<{
    packageJsonFolder?: string;
    packageJsonFile?: string;
    packageJson?: PackageJson;
}>;
/**
 *
 * @param rootPackageJsonFolder the folder containing package.json.
 * @param depPackageName
 * @returns
 */
export declare function loadDependencyPackageJson(rootPackageJsonFolder: string, depPackageName: string): Promise<PackageJson | undefined>;
/**
 *
 * @param packageJsonPath the path to the package.json file. Please be aware that it's the caller's responsibility to ensure the path given is package.json, no further check will be done.
 * @returns
 */
export declare function loadPackageJsonFile(packageJsonPath: string): Promise<PackageJson | undefined>;
/**
 * @returns the path to the installed node executable, or empty string if not found.
 */
export declare function checkInstalledNode(): Promise<string>;
export declare function checkInstalledTspCli(): Promise<string>;
export declare function checkInstalledNpm(): Promise<string>;
export declare function checkInstalledExecutable(exe: string): Promise<string>;
export declare function parseJsonFromFile(filePath: string): Promise<string | undefined>;
/**
 * Throttle the function to be called at most once in every blockInMs milliseconds. This utility
 * is useful when your event handler will trigger the same event multiple times in a short period.
 *
 * @param fn Underlying function to be throttled
 * @param blockInMs Block time in milliseconds
 * @returns a throttled function
 */
export declare function throttle<T extends (...args: any[]) => any>(fn: T, blockInMs: number): T;
export declare function getVscodeUriFromPath(path: string): string;
export declare function distinctArray<T>(arr: T[], compare: (a: T, b: T) => boolean): T[];
//# sourceMappingURL=utils.d.ts.map