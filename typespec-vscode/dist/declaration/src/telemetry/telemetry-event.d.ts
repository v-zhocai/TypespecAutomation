import { ResultCode } from "../types.js";
export interface RawTelemetryEvent {
    eventName: string;
    properties?: {
        [key: string]: string;
    };
    measurements?: {
        [key: string]: number;
    };
}
export declare enum TelemetryEventName {
    StartExtension = "start-extension",
    StartServer = "start-server",
    CreateProject = "create-project",
    InstallGlobalCompilerCli = "install-global-compiler-cli",
    RestartServer = "restart-server",
    EmitCode = "emit-code",
    ImportFromOpenApi3 = "import-from-openapi3",
    ServerPathSettingChanged = "server-path-changed",
    OperationDetail = "operation-detail",
    PreviewOpenApi3 = "preview-openapi3"
}
export interface TelemetryEventBase {
    activityId: string;
    eventName: TelemetryEventName;
}
export interface OperationTelemetryEvent extends TelemetryEventBase {
    startTime: Date;
    endTime?: Date;
    result?: ResultCode;
    lastStep?: string;
}
export declare enum OperationDetailPropertyName {
    error = 0,
    emitterName = 1,
    emitterVersion = 2,
    emitResult = 3,
    compilerLocation = 4,
    compilerVersion = 5,
    CompileStartTime = 6,
    CompileEndTime = 7
}
export declare function generateActivityId(): `${string}-${string}-${string}-${string}-${string}`;
export declare const emptyActivityId = "00000000-0000-0000-0000-000000000000";
//# sourceMappingURL=telemetry-event.d.ts.map