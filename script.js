const display = document.getElementById('display')
let expression = ''
let lastResult = null

// Safe calculation function (replaces eval)
function calculate(expr) {
  const tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g)

  if (!tokens) return null

  let numbers = []
  let operators = []

  tokens.forEach((token) => {
    if (!isNaN(token)) {
      numbers.push(Number(token))
    } else {
      operators.push(token)
    }
  })

  // Handle * and /
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '*' || operators[i] === '/') {
      const a = numbers[i]
      const b = numbers[i + 1]

      if (operators[i] === '/' && b === 0) return null

      const result =
        operators[i] === '*' ? a * b : a / b

      numbers.splice(i, 2, result)
      operators.splice(i, 1)
      i--
    }
  }

  // Handle + and -
  let result = numbers[0]

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      result += numbers[i + 1]
    } else if (operators[i] === '-') {
      result -= numbers[i + 1]
    }
  }

  return result
}

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent

    if (value === 'AC') {
      expression = ''
      display.value = ''
      lastResult = null
    }

    else if (value === 'DEL' || value === '⌫') {
      expression = expression.slice(0, -1)
      display.value = expression
    }

    else if (value === '=') {
      try {
        const expr = expression
          .replace(/÷/g, '/')
          .replace(/×/g, '*')
          .replace(/−/g, '-')

        const result = calculate(expr)

        if (result === null || isNaN(result)) {
          throw new Error('Invalid')
        }

        display.value = `${expression} = ${result}`
        expression = result.toString()
        lastResult = result

      } catch (error) {
        display.value = 'Error'
        expression = ''
        lastResult = null
      }
    }

    else if (value === '+/-') {
      if (lastResult !== null) {
        lastResult = -lastResult
        display.value = lastResult.toString()
        expression = lastResult.toString()
      } 
      else if (expression) {
        expression = (-parseFloat(expression)).toString()
        display.value = expression
      }
    }

    else if (value === '%') {
      if (lastResult !== null) {
        lastResult = lastResult / 100
        display.value = lastResult.toString()
        expression = lastResult.toString()
      } 
      else if (expression) {
        expression = (parseFloat(expression) / 100).toString()
        display.value = expression
      }
    }

    else {
      expression += value
      display.value = expression
    }
  })
})
