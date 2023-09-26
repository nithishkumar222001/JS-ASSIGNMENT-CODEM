function Check(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
    } else if (char === ")" || char === "]" || char === "}") {
      if (isEmpty(stack)) {
        return false;
      }

      const top = stack.pop();
      if (
        (char === ")" && top !== "(") ||
        (char === "]" && top !== "[") ||
        (char === "}" && top !== "{")
      ) {
        return false;
      }
    }
  }

  return isEmpty(stack);
}

function isEmpty(stack) {
  return stack.length === 0;
}

const string = prompt("Enter the string:");
let calling = Check(string);
btn1 = document.querySelector("button");
let result1 = document.getElementById("message");
btn1.addEventListener("click", function () {
  result1.innerText = `The result is ${calling}`;
});
