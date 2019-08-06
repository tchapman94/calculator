var numBtns = document.getElementById('num-btns');
var operatorBtns = document.getElementById('operator-btns');
var equalsBtn = document.getElementById('equal');
var allClearBtn = document.getElementById('clear');
var decimalBtn = document.getElementById('decimal');
var negPosBtn = document.getElementById('neg-pos')
var calcScreen = document.getElementById('calc-screen');

var currNum = '';
var currOp = '';
var components = [];
var canDecimal = true;
var canOperator = false;
var isAnswer = false; 

// HANDLES NUMBERS
function handleNumber(num) {
    if (currNum) {
        console.log('yes');
        calcScreen.innerText += num;
        currNum += num;
    }
    else{
        console.log('no');
        calcScreen.innerText += num;
        currNum = num;
        components.push(currOp);
        console.log(components);
        currOp = null;
    }
}

numBtns.addEventListener('click', function (event) {
    var btnVal = event.target.value;
    if (isAnswer) {
        calcScreen.innerText = '';
        isAnswer = false;
        currNum = '';
    }
    if (event.target.matches('.nums')) {
        handleNumber(btnVal);
    }
});

// HANDLES OPERATOR

function handleOperator(op){
    if (currOp) {
        var firstPart = calcScreen.innerText.slice(0,calcScreen.innerText.length - 1)
        calcScreen.innerText = firstPart + op;
        currOp = op;
    }
    else{
        calcScreen.innerText += op;
        components.push(currNum);
        console.log(components);
        currOp = op;
        currNum = null;
    } 
        canDecimal = true;
        isAnswer = false;
        currNum = null;
}

operatorBtns.addEventListener('click', function (event) {
    var btnVal = event.target.value;
    if (event.target.matches('.operators')) {
        handleOperator(btnVal)
    }
});

// HANDLES DECIMAL
decimalBtn.addEventListener('click', function (event) {
    var btnVal = event.target.value;
    if (event.target.matches('#decimal')) {
        if (canDecimal)
            calcScreen.innerText = calcScreen.innerText + btnVal;
        canDecimal = false;
        currNum = null;
    }
})

// GIVES ANSWER
function handleEval(){
    if(currNum){
        components.push(currNum);
    }
    var answer = eval(components.map(function (c){
        if(c.length && c.length > 1 && c[0]=== '-'){
            return '(' + c + ')';
        }
        return c;
    }).join(''));
    calcScreen.innerText = answer;
    isAnswer = true;
    components = [];
    currNum = answer;
    if(answer % 1 !== 0){
        canDecimal = false;
    }
    console.log('currNum:', currNum);
    console.log('comp:', components);
}
equalsBtn.addEventListener('click', function (event) {
    handleEval();
});

// CLEARS CALCULATOR SCREEN
allClearBtn.addEventListener('click', function (event) {
    if (event.target.matches('#clear')) {
        calcScreen.innerText = ' ';
        canOperator = false;
        components = [];
        currNum = null;
        canDecimal = true;
        console.log('comp:', components);
    }
});

// CHANGES TO NEGITIVE OR TO POSITIVE
function handlePosNeg(){
    console.log('true')
    if (currNum ){
        if(currNum > 0 ){
            console.log('changed to negative');
            currNum = currNum * -1;
            currNum = currNum.toString();
            console.log('currNum:',currNum);
            var firstPart = calcScreen.innerText.slice(0,calcScreen.innerText.length + 1 - currNum.length);
            console.log('firstPart:',firstPart);
            calcScreen.innerText = firstPart + currNum;
        }
        else if (currNum < 0){
            console.log('changed to positive')
            // firstPart = '';
            currNum = currNum * -1;
            currNum = currNum.toString();
            console.log('currNum:',currNum);
            var changeFirstPart = calcScreen.innerText.slice(0,calcScreen.innerText.length - 3 - currNum.length);
            console.log('changeFirstPart:',changeFirstPart);
            calcScreen.innerText = changeFirstPart + currNum;
        }
    }
    console.log('comp:', components);
}
negPosBtn.addEventListener('click', function (event) {
    var btnVal = event.target.value;
    if (event.target.matches('#neg-pos')) {
        handlePosNeg(btnVal);
    }
});

document.addEventListener("keyup", function(event){
    console.log('KEYUP', event);
    if(event.keyCode >= 48 && event.keyCode <= 57){
        console.log(event.key);
        handleNumber(event.key);
        canDecimal = true;
    }
    if(event.keyCode >= 96 && event.keyCode <= 105){
        handleNumber(event.key);
        canDecimal = true;
    }
    if(event.key === "+"){
        currOp = '+';
        addKeytoScrn(event);
        console.log('currOp:',currOp);
    }
    if(event.key === "*"){
        currOp = '*';
        addKeytoScrn(event);
        console.log('currOp:',currOp);
        
    }
    if(event.key === "-"){
        currOp = '-'
        addKeytoScrn(event);
        console.log('currOp:',currOp);
    }
    if(event.key === "/"){
        currOp = '/'
        addKeytoScrn(event);
        console.log('currOp:',currOp);
    }
    if(event.key === "."){
        if(canDecimal){
            addKeytoScrn(event);
            canDecimal = false;
            currNum = null;
        }
    }
    if(event.key === "Enter"){
        handleEval()
    }
    if(event.key === "Backspace"){
        calcScreen.innerText = ' ';
        canOperator = false;
        components = [];
        currNum = null;
        canDecimal = true;
    }
  });

  function addKeytoScrn(event){
    calcScreen.innerText = calcScreen.innerText + event.key;
  }