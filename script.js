let display = document.getElementById("display");

function appendValue(value) {
  let lastChar = display.value.slice(-1);

  if ("+-*/%".includes(lastChar) && "+-*/%".includes(value)) {
    return;
  }

  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    if (display.value.trim() === "") return;

    if (/[\+\-\*\/\.]{2,}/.test(display.value)) {
      display.value = "Error";
      return;
    }

    display.value = Function("return " + display.value)();
  } catch {
    display.value = "Error";
  }
}

document.addEventListener("keydown", function(event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});