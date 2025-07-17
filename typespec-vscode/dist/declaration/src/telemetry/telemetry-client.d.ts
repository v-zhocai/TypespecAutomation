import { ExtensionStateManager } from "../extension-state-manager.js";
import { ResultCode } from "../types.js";
import { OperationDetailPropertyName, OperationTelemetryEvent, TelemetryEventName } from "./telemetry-event.js";
export declare class TelemetryClient {
    private _client;
    private readonly MAX_LOG_TELEMETRY_ERROR;
    private _logTelemetryErrorCount;
    private _stateManager;
    constructor();
    /**
     *
     * @param stateManager the state manager to use for storing telemetry events which will been sent in delay (next time the extension starts) which
     * is useful when the extension will be re-initialized for some reason (i.e. open new window for created project) and can't send telemetry events in time.
     */
    Initialize(stateManager: ExtensionStateManager): void;
    private initClient;
    private getTelemetryKey;
    private sendEvent;
    private sendErrorEvent;
    doOperationWithTelemetry<T>(eventName: TelemetryEventName, 
    /**
     * The result will be set automatically if the return type is ResultCode or Result<T>
     * Otherwise, you can set the result manually by setting the opTelemetryEvent.result
     */
    operation: (opTelemetryEvent: OperationTelemetryEvent, 
    /** Call this function to send the telemetry event if you don't want to wait until the end of the operation for some reason*/
    sendTelemetryEvent: (result: ResultCode, delay: boolean) => void) => Promise<T>, activityId?: string): Promise<T>;
    logOperationTelemetryEvent(event: OperationTelemetryEvent, delay?: boolean): void;
    logOperationDetailTelemetry(activityId: string, detail: Partial<Record<keyof typeof OperationDetailPropertyName, string>>, delay?: boolean): void;
    /**
     * Create a operation telemetry event with following default values.
     * Please make sure the default values are updated properly as needed
     *     activityId: a new random guid will be generated if not provided
     *     eventName: the event name provided
     *     startTime: set to the current time
     *     endTime: undefined
     *     result: undefined
     *     lastStep: undefined
     */
    private createOperationTelemetryEvent;
    private logErrorWhenLoggingTelemetry;
    sendDelayedTelemetryEvents(): void;
    dispose(): Promise<void>;
}
declare const telemetryClient: TelemetryClient;
export default telemetryClient;
//# sourceMappingURL=telemetry-client.d.ts.map