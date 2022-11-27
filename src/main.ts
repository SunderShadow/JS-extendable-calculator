import Calculator from "./Calculator"

const calc = new Calculator()

calc.addOperation('+',  (a, b) => a + b)
calc.addOperation('-',  (a, b) => a - b)
calc.addOperation('*',  (a, b) => a * b, 2)
calc.addOperation('/',  (a, b) => a / b, 2)
calc.addOperation('**', (a, b) => a ** b, 1)

const result = calc.calc("12 + (3 * 2) * 2 ** 3")

console.log(result)
