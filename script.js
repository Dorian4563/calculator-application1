const display = document.getElementById("display");
let expression = "";
let lastResult = null;

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") {
      expression = "";
      display.value = "";
      lastResult = null;
    }

    else if (value === "DEL" || value === "⌫") {
      expression = expression.slice(0, -1);
      display.value = expression;
    }

    else if (value === "=") {
      try {
        let expr = expression
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/−/g, "-");

        if (expr.includes("/0")) {
          throw new Error("Division by zero");
        }

        const result = eval(expr);

        display.value = `${expression} = ${result}`;
        expression = result.toString();
        lastResult = result;

      } catch (error) {
        display.value = "Error";
        expression = "";
        lastResult = null;
      }
    }

    else if (value === "+/-") {
      if (lastResult !== null) {
        lastResult = -lastResult;
        display.value = lastResult.toString();
        expression = lastResult.toString();
      } 
      else if (expression) {
        expression = (-parseFloat(expression)).toString();
        display.value = expression;
      }
    }

    else if (value === "%") {
      if (lastResult !== null) {
        lastResult = lastResult / 100;
        display.value = lastResult.toString();
        expression = lastResult.toString();
      } 
      else if (expression) {
        expression = (parseFloat(expression) / 100).toString();
        display.value = expression;
      }
    }

    else {
      expression += value;
      display.value = expression;
    }

  });
});
