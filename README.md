# Extendable calculator

yes extendable

## Where is extend

```js
import Calculator from "extendable-calculator"

const calculator = new Calculator()

calculator.addOperation('+', (a, b) => a + b)

calculator.calc("12 + 4") // 16

// Unregistered operations will throw exception
calculator.calc("12 * 4") // Error: undefined operation

calculator.addOperation('*', (a, b) => a * b)
calculator.calc("12 * 4") // 48

// We can use words as operation keyword
calculator.addOperation('mod', (a, b) => a % b)
calculator.calc("12 mod 4") // 0

// But be carefully keywords with numbers can not be calculated
calculator.addOperation('s0meNum0perat1on', (a, b) => a % b)
calculator.calc("12 s0meNum0perat1on 4") // Error: undefined operation
```
