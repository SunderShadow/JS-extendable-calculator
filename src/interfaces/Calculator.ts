export type Statement = string

export type OperationPriority = number
export type MethodCb = (a: number, b: number) => number

export type Operation = {
    keyWord: string
    cb: MethodCb,
    priority: OperationPriority
}

export default interface Calculator {
    addOperation(operation: string, cb: MethodCb, isImportant: OperationPriority): void
    calc(statement: Statement): number
}
