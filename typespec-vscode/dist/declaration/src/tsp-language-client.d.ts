import type { CompilerOptions, InitProjectConfig, InitProjectContext, InitProjectTemplate, ServerInitializeResult } from "@typespec/compiler";
import { InternalCompileResult } from "@typespec/compiler/internals";
import { ExtensionContext, LogOutputChannel } from "vscode";
import { Executable, LanguageClient, TextDocumentIdentifier } from "vscode-languageclient/node.js";
import { ExecOutput } from "./utils.js";
export declare class TspLanguageClient {
    private client;
    private exe;
    constructor(client: LanguageClient, exe: Executable);
    private initProjectContext?;
    get state(): import("vscode-languageclient").State;
    get initializeResult(): ServerInitializeResult | undefined;
    getInitProjectContext(): Promise<InitProjectContext | undefined>;
    validateInitProjectTemplate(template: InitProjectTemplate): Promise<boolean>;
    initProject(config: InitProjectConfig): Promise<boolean>;
    compileProject(doc: TextDocumentIdentifier, options?: CompilerOptions): Promise<InternalCompileResult | undefined>;
    runCliCommand(args: string[], cwd: string): Promise<ExecOutput | undefined>;
    restart(): Promise<void>;
    stop(): Promise<void>;
    start(activityId: string): Promise<void>;
    dispose(): Promise<void>;
    /**
     * resolve the tsp server location and create a tsp language client from it.
     * undefined will be returned if the tsp server location can't be resolved.
     */
    static create(activityId: string, context: ExtensionContext, outputChannel: LogOutputChannel): Promise<TspLanguageClient | undefined>;
    compileOpenApi3(mainTspFile: string, srcFolder: string, outputFolder: string): Promise<ExecOutput | undefined>;
}
//# sourceMappingURL=tsp-language-client.d.ts.map