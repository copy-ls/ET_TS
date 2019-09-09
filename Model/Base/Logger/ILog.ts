export interface ILog {
    Trace(message: any, ...args: any[]): void

    Debug(message: any, ...args: any[]): void

    Info(message: any, ...args: any[]): void

    Warning(message: any, ...args: any[]): void

    Error(message: any, ...args: any[]): void

    Fatal(message: any, ...args: any[]): void
}