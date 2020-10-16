//GUI:
let displayValue = 0;
let firstOperand = 0;
let secondOperand = 0;
let operator = "";
let clearRequest = false;
let snarkyCount = 0;
const display = document.querySelector('#display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const printBtn = document.querySelector('#print');
const resetBtn = document.querySelector('#reset');

digitButtons.forEach(btn => btn.addEventListener('click',updateDisplayValue));
operatorButtons.forEach(btn => btn.addEventListener('click', setOperation));
printBtn.addEventListener('click',printResult);
resetBtn.addEventListener('click',resetAll);

function updateDisplayValue(e){
  if(clearRequest) clearDisplay();
  if(e) displayValue += "" + e.target.value;
  controlOverflow();
  displayValue = +displayValue;
  display.textContent = displayValue;
  if(display.textContent==="Infinity"|display.textContent==="NaN") beSnarky();
}
function setOperation(e){
  if(operator) printResult();
  firstOperand = displayValue;
  operator = e.target.value;
  clearRequest = true;
}
function printResult(){
  if(!operator) return;
  clearRequest = false;
  secondOperand = displayValue;
  console.log(firstOperand,secondOperand,operator);
  displayValue =  operate(firstOperand,secondOperand,operator);
  updateDisplayValue();
  operator = "";
  clearRequest = true;
}
function clearDisplay(){
  display.textContent = 0;
  displayValue = +display.textContent;
  clearRequest = false;
}
function resetAll(){
  clearDisplay();
  firstOperand = secondOperand = displayValue = 0;
  operator = "";
  snarkyCount = 0;
}
function controlOverflow(){
  displayValue = displayValue.toString()
                             .match(/^[\d|.]{0,10}/)
                             .join("");
}
function beSnarky(){
  switch(true){
    case snarkyCount<1:
      display.textContent = "That is weird";
      snarkyCount++;
      break;
    case snarkyCount<3:
      display.textContent = "You are weird";
      snarkyCount++;
      break;
    default:
      display.textContent = "C'mon just hit reset";
      snarkyCount++;
      break;
  }  
}



//calculator logic:
function operate(a,b,operator){
  switch(operator){
    case "+": return add(a,b);
    case "-": return subtract(a,b);
    case "*": return multiply(a,b);
    case "/": return divide(a,b);
    default: return "cmon brah";
  }
}

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;
