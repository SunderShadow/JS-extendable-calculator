import Calculator from "./Calculator"

const calc = new Calculator()

calc.addOperation('+',  (a, b) => a + b)
calc.addOperation('-',  (a, b) => a - b)
calc.addImportantOperation('*',  (a, b) => a * b)
calc.addImportantOperation('/',  (a, b) => a / b)
calc.addImportantOperation('**', (a, b) => a ** b)

const result = calc.calc("12 + (3 * 2) * 2 ** 5")

console.log(result)
