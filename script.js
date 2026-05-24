const passwordBox = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}";

lengthSlider.addEventListener("input", () => {
  lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", () => {
  let allChars = "";

  if (uppercase.checked) allChars += upperChars;
  if (lowercase.checked) allChars += lowerChars;
  if (numbers.checked) allChars += numberChars;
  if (symbols.checked) allChars += symbolChars;

  if (allChars === "") {
    alert("Please select at least one option!");
    return;
  }

  let password = "";

  for (let i = 0; i < lengthSlider.value; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  passwordBox.value = password;
});


copyBtn.addEventListener("click", () => {
  if (passwordBox.value === "") {
    alert("Generate a password first!");
    return;
  }

  navigator.clipboard.writeText(passwordBox.value);

  copyBtn.innerText = "Copied!";

  setTimeout(() => {
    copyBtn.innerText = "Copy";
  }, 2000);
});