/**
 * Resolve some of the VSCode variables.
 * Simpler aLternative until https://github.com/microsoft/vscode/issues/46471 is supported.
 */
export declare class VSCodeVariableResolver {
    private variables;
    static readonly VARIABLE_REGEXP: RegExp;
    constructor(variables: Record<string, string>);
    resolve(value: string): string;
}
//# sourceMappingURL=vscode-variable-resolver.d.ts.map