import { CancellationToken, Progress, QuickPick, QuickPickItem, QuickPickItemButtonEvent, QuickPickOptions } from "vscode";
import { Result } from "./types.js";
export interface QuickPickOptionsWithExternalLink extends QuickPickItem {
    externalLink?: string;
}
export interface ConfirmOptions<T extends QuickPickOptionsWithExternalLink, P extends QuickPickOptionsWithExternalLink> {
    title?: string;
    placeholder?: string;
    yesQuickPickItem?: T;
    noQuickPickItem?: P;
}
export declare function confirm<T extends QuickPickOptionsWithExternalLink, P extends QuickPickOptionsWithExternalLink>(confirmOptions: ConfirmOptions<T, P>): Promise<boolean | undefined>;
export declare function checkAndConfirmEmptyFolder(targetFolder: string, placeholder?: string, title?: string): Promise<boolean | undefined>;
export declare function selectFolder(dlgTitle: string, btnLabel: string): Promise<string | undefined>;
/**
 *
 * @param dlgTitle
 * @param btnLabel
 * @param filters refer to {@link OpenDialogOptions.filters} .
    A set of file filters that are used by the dialog. Each entry is a human-readable label
        like "TypeScript", and an array of extensions, for example:
        ```ts
        {
            'Images': ['png', 'jpg'],
            'TypeScript': ['ts', 'tsx']
        }
        ```
 * @returns
 */
export declare function selectFile(dlgTitle: string, btnLabel: string, filters: {
    [name: string]: string[];
}): Promise<string | undefined>;
interface ProgressOptions {
    title: string;
    withCancelAndTimeout: boolean;
    /** Only take effect when {@link ProgressOptions.withCancelAndTimeout} is true */
    timeoutInMs: number;
}
export interface ExecuteWithUiOptions<T extends QuickPickOptionsWithExternalLink, P extends QuickPickOptionsWithExternalLink> {
    /**
     * The name of the execution. Only used for logging now
     */
    name: string;
    /**
     * Confirm options. No confirm step when undefined
     */
    confirm?: ConfirmOptions<T, P>;
    /**
     * Progress options. No progress when undefined
     */
    progress?: ProgressOptions;
}
export declare function tryExecuteWithUi<T, P extends QuickPickOptionsWithExternalLink, Q extends QuickPickOptionsWithExternalLink>(options: ExecuteWithUiOptions<P, Q>, func: (progress: Progress<{
    message?: string;
    increment?: number;
}> | undefined, token: CancellationToken | undefined) => Promise<T>): Promise<Result<T>>;
export declare function showQuickPickWithButtons<T extends QuickPickItem>(items: T[], options: QuickPickOptions, onItemButtonTriggered: (quickpick: QuickPick<T>, item: QuickPickItemButtonEvent<T>) => void): Promise<T[] | undefined>;
export {};
//# sourceMappingURL=ui-utils.d.ts.map