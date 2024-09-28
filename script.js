const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox");
const symbols = '~!@#$%^&*()_+-=`.,{}[]|\:;"">?/';


let password = "";
let passwordLength = 10;
let checkCount = 0;

handleSlider();
setIndicator("#ccc");


//set password length
function handleSlider() {   
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const max = inputSlider.max;
    const min = inputSlider.min;
    inputSlider.style.backgroundSize = ((passwordLength- min) * 100/(max-min)) +"% 100%"

}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;

}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;

}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowercase() {
    return String.fromCharCode(getRndInteger(97,123));
        
}

function generateUppercase() {
    return String.fromCharCode(getRndInteger(65,91));
        
}

function generateRndSymbol(){
    const randNum = generateRandomNumber(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum||hasSym) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if((hasUpper||hasLower) && (hasNum||hasSym) && passwordLength >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }

}

async function copyContent() {
    const copyBtn = document.querySelector("[data-copy]");
    const copyMsg = document.querySelector("[data-copyMsg]");

    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}



function shufflePassword(array){
//Fisher yates Method

    for (let i = 0; i < array.length; i++) {
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => {str += el});
    return str;
}



function handleCheckboxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();     
    }
}

allCheckBox.forEach((checkbox) =>
{
    checkbox.addEventListener('change',handleCheckboxChange);
})

inputSlider.addEventListener('input',(e) =>{
    passwordLength = e.target.value;
    handleSlider(); 

})

copyBtn.addEventListener('click',() =>{

    if(passwordDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener('click', () => {

    if (checkCount <= 0) {
        return;
    }

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();     
    }

    password = "";
     
    //  if(uppercaseCheck.checked){
    //     password += generateUppercase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowercase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password += generateRndSymbol();
    // }

    let funcArr = [];

    if (uppercaseCheck.checked) {
        funcArr.push(generateUppercase);
    }

    if (lowercaseCheck.checked) {
        funcArr.push(generateLowercase);
    }
    
    if (numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }

    if (symbolsCheck.checked) {
        funcArr.push(generateRndSymbol);
    }

    for (let i = 0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }

    console.log("Compulsun addn done");

    for (let i = 0; i < passwordLength-funcArr.length; i++) {
        let rndIndex = getRndInteger(0,funcArr.length);
        password += funcArr[rndIndex]();
    }

    console.log("remain addn done");
  

    password = shufflePassword(Array.from(password));
    console.log("Shuffle done");
    
    passwordDisplay.value = password;

    calcStrength();
    
});
