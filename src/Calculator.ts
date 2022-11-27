import CalculatorInterface, {Operation, MethodCb, OperationPriority, Statement} from "./interfaces/Calculator"


export default class Calculator implements CalculatorInterface {
    _operations: Array<Operation> = []

    public addOperation(keyWord: string, cb: MethodCb, priority: OperationPriority = 3) {
        this._operations.push({
            keyWord,
            cb,
            priority
        })
    }

    private getOperation(statement: Statement, i: number): Operation | undefined {
        let maxSuitableKeyWordSize = 0
        let suitableOperation: Operation | undefined = undefined

        for (const operation of this._operations) {
            if (
                operation.keyWord.length > maxSuitableKeyWordSize
                && statement.startsWith(operation.keyWord, i)
            ) {
                maxSuitableKeyWordSize = operation.keyWord.length
                suitableOperation = operation
            }
        }

        return suitableOperation
    }

    private statementHasOnlyNumbers(statement: Statement) {
        statement = statement.trim()
        return parseFloat(statement).toString() === statement
    }

    public calc(statement: Statement): number {
        if (this.statementHasOnlyNumbers(statement)) {
            return parseFloat(statement)
        }

        let operation: Operation | undefined
        let lNumI: number = -1
        let rNumI: number = -1

        let parenthesesDepth = 0
        let parenthesesStart = -1

        for (let i = 0; i < statement.length; ++i) {
            if (statement[i] === '(') {
                if (parenthesesDepth++ === 0) {
                    parenthesesStart = i
                }
            }

            if (statement[i] === ')') {
                if (--parenthesesDepth === 0) {
                    statement =
                        statement.substring(0, parenthesesStart) +
                        this.calc(statement.substring(parenthesesStart + 1, i)).toString() +
                        statement.substring(i + 1)
                    i = parenthesesStart
                }
            }
        }

        if (this.statementHasOnlyNumbers(statement)) {
            return parseFloat(statement)
        }

        if (parenthesesDepth !== 0) {
            throw Error("Parentheses must have pair")
        }

        for (let i = 0; i < statement.length; ++i) {
            let tmpOperation = this.getOperation(statement, i)

            if ( tmpOperation
                && !operation || (
                    tmpOperation
                    && (<Operation>operation).priority < tmpOperation.priority
                )
            ) {
                operation = tmpOperation
                lNumI = i
                rNumI = i += operation.keyWord.length

                if (operation.priority === 3) {
                    break
                }
            }
        }

        if (!operation || lNumI === -1 || rNumI === -1) {
            throw new Error("No registered operators found")
        }

        return operation.cb(
            this.calc(statement.substring(0, lNumI).trim()),
            this.calc(statement.substring(rNumI + 1).trim())
        )
    }
}
