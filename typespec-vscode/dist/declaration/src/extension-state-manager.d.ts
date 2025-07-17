import vscode from "vscode";
import type { LogLevel } from "./log/logger.js";
import { RawTelemetryEvent } from "./telemetry/telemetry-event.js";
export interface StartUpMessage {
    /**
     * the message to show in the popup notification
     */
    popupMessage: string;
    /**
     * the detail logged to the Output window
     */
    detail: string;
    /**
     * the level used to show notification and log
     */
    level: LogLevel;
}
interface DelayedTelemetryEvent {
    raw: RawTelemetryEvent;
    isError: boolean;
}
/** manage data stored in vscode extension's state (ExtensionContext.globalState/workspaceState) */
export declare class ExtensionStateManager {
    private vscodeContext;
    constructor(vscodeContext: vscode.ExtensionContext);
    private getValue;
    /**
     *
     * @param key
     * @param value must be JSON stringifyable, set to undefined to delete the key
     * @param isGlobal
     */
    private setValue;
    private getStartUpMessageKey;
    saveStartUpMessage(msg: StartUpMessage, workspaceFolder: string): void;
    loadStartUpMessage(workspaceFolder: string): StartUpMessage | undefined;
    cleanUpStartUpMessage(workspaceFolder: string): void;
    private TELEMETRY_DELAYED_EVENT_KEY;
    pushDelayedTelemetryEvent(raw: RawTelemetryEvent, isError: boolean): void;
    loadDelayedTelemetryEvents(): DelayedTelemetryEvent[];
    cleanUpDelayedTelemetryEvents(): void;
}
export {};
//# sourceMappingURL=extension-state-manager.d.ts.map