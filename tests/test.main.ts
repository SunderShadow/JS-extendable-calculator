import {describe} from "mocha"
import Calculator from "../src/Calculator"
import * as assert from "assert"

const calculator = new Calculator()
type Operation = {
    keyWord: string,
    cb: (a: number, b: number) => number
}

const registeredOperations = {
    add: <Operation>{
        keyWord: '+',
        cb: (a, b) => a + b
    },
    mod: <Operation>{
        keyWord: "mod",
        cb: (a, b) => a % b
    },
    to1: <Operation>{
        keyWord: "to",
        cb: () => 1
    }
}

calculator.addOperation(registeredOperations.add.keyWord, registeredOperations.add.cb)
calculator.addOperation(registeredOperations.mod.keyWord, registeredOperations.mod.cb)

describe("Calculator", function () {
    describe("Parsing", function () {
        it("Should calc without spaces", function () {
            let a = 123
            let b = 5

            const operation = registeredOperations.add
            const result = calculator.calc(a.toString() + operation.keyWord + b.toString())
            assert.equal(operation.cb(a, b), result)
        })

        it("Should calc with spaces between numbers and operator", function () {
            let a = 123
            let b = 5

            const operation = registeredOperations.add
            const result = calculator.calc(a.toString() + " " + operation.keyWord + " " + b.toString())
            assert.equal(operation.cb(a, b), result)
        })

        it("Should calc with spaces MANY between numbers and operator", function () {
            let a = 123
            let b = 5

            const operation = registeredOperations.add
            const result = calculator.calc(a.toString() + "    " + operation.keyWord + "    " + b.toString())
            assert.equal(operation.cb(a, b), result)
        })
    })

    describe("Custom operations", function () {
        it('Word operator', function () {
            let a = 5
            let b = 10

            const result = calculator.calc(a.toString() + registeredOperations.mod.keyWord + b.toString())
            assert.equal(registeredOperations.mod.cb(a, b), result)
        })
    })

    it('Word operator with nums', function () {
        let a = 5
        let b = 10

        const operation = registeredOperations.to1
        const result = calculator.calc(a.toString() + ' ' + operation.keyWord + ' ' + b.toString())
        assert.equal(operation.cb(a, b), result)
    })
})
