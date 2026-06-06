const passwordBox = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const toggleBtn = document.getElementById("toggleBtn");
const themeBtn = document.getElementById("themeBtn");

const strengthText = document.getElementById("strengthText");
const historyList = document.getElementById("history");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}<>?/";

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function checkStrength(password) {

    let strength = 0;

    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[a-z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;

    if(strength <= 2){
        strengthText.textContent = "Weak 🔴";
    }
    else if(strength <= 4){
        strengthText.textContent = "Medium 🟡";
    }
    else{
        strengthText.textContent = "Strong 🟢";
    }
}

function addToHistory(password){

    const li = document.createElement("li");

    li.textContent = password;

    historyList.prepend(li);

    if(historyList.children.length > 5){
        historyList.removeChild(historyList.lastChild);
    }
}

generateBtn.addEventListener("click", () => {

    let allChars = "";

    if(uppercase.checked) allChars += upperChars;
    if(lowercase.checked) allChars += lowerChars;
    if(numbers.checked) allChars += numberChars;
    if(symbols.checked) allChars += symbolChars;

    if(allChars === ""){
        alert("Select at least one option!");
        return;
    }

    let password = "";

    for(let i = 0; i < lengthSlider.value; i++){

        const randomIndex =
        Math.floor(Math.random() * allChars.length);

        password += allChars[randomIndex];
    }

    passwordBox.value = password;

    checkStrength(password);

    addToHistory(password);

    localStorage.setItem("savedPassword", password);
});

copyBtn.addEventListener("click", () => {

    if(passwordBox.value === ""){
        alert("Generate password first!");
        return;
    }

    navigator.clipboard.writeText(passwordBox.value);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 2000);
});

toggleBtn.addEventListener("click", () => {

    if(passwordBox.type === "password"){
        passwordBox.type = "text";
        toggleBtn.textContent = "🙈";
    }
    else{
        passwordBox.type = "password";
        toggleBtn.textContent = "👁";
    }
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});

const savedPassword = localStorage.getItem("savedPassword");

if(savedPassword){
    passwordBox.value = savedPassword;
    checkStrength(savedPassword);
}

generateBtn.click();