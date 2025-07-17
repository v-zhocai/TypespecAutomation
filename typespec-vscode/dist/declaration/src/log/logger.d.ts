export type LogLevel = "info" | "warn" | "error" | "debug" | "trace";
export type LogOptions = Record<string, any>;
export interface LogItem {
    message: string;
    level: LogLevel;
    details?: any[];
    options?: LogOptions;
}
export interface LogListener {
    Log(item: LogItem): void;
}
export declare class Logger {
    private _listeners;
    private logInternal;
    registerLogListener(name: string, listener: LogListener): void;
    unregisterLogListener(name: string): void;
    log(level: LogLevel, message: string, details?: any[], options?: LogOptions): void;
    error(message: string, details?: any[], options?: LogOptions): void;
    warning(message: string, details?: any[], options?: LogOptions): void;
    info(message: string, details?: any[], options?: LogOptions): void;
    debug(message: string, details?: any[], options?: LogOptions): void;
    trace(message: string, details?: any[], options?: LogOptions): void;
    profile<T>(actionName: string, action: () => Promise<T>): Promise<T>;
}
declare const logger: Logger;
export default logger;
//# sourceMappingURL=logger.d.ts.map