var numBtns = document.getElementById('num-btns');
var operatorBtns = document.getElementById('operator-btns');
var equalsBtn = document.getElementById('equal');
var allClearBtn = document.getElementById('clear');
var decimalBtn = document.getElementById('decimal');
var negPosBtn = document.getElementById('neg-pos')
var calcScreen = document.getElementById('calc-screen');

var currNum = null;
var currOp = null;
var components = []
var canDecimal = true;
var canOperator = false;
var isAnswer = false;
var isNum = false;

numBtns.addEventListener('click',function(event){
    var btnVal = event.target.value;
    if(isAnswer){
        calcScreen.innerText = '';
        isAnswer = false;
    }
    if(event.target.matches('.nums')){
        calcScreen.innerText = calcScreen.innerText + btnVal;
        canOperator = true;
        isNum = true;
        components.push(currOp);
        currOp = null;
        currNum = btnVal;
    }
});

operatorBtns.addEventListener('click', function(event){
    var btnVal = event.target.value;
    if(event.target.matches('.operators')){
        if(canOperator){
            calcScreen.innerText = calcScreen.innerText + btnVal;
            canOperator = false;
            canDecimal = true;
            isAnswer = false;
            isNum = false;
            components.push(currNum);
            currNum = null;
            currOp = btnVal;

        }
    }
});

decimalBtn.addEventListener('click', function(event){
    var btnVal = event.target.value;
    if(event.target.matches('#decimal')){
        if(canDecimal)
        calcScreen.innerText = calcScreen.innerText + btnVal;
        canDecimal = false;
        isNum = false;
        currNum = null;
    }
})


equalsBtn.addEventListener('click', function(event){
    var answer = eval(calcScreen.innerText)
    calcScreen.innerText = answer;
    isAnswer = true;
    isNum =false;
    currNum = null;
});


allClearBtn.addEventListener('click', function(event){
    if(event.target.matches('#clear')){
        calcScreen.innerText = ' ';
        canOperator = false;
        isNum = false;
        currNum = null;
    }
});

negPosBtn.addEventListener('click', function(event){
    var btnVal = event.target.value;
    if(event.target.matches('#negtopos')){
        if(canDecimal)
        calcScreen.innerText = calcScreen.innerText + btnVal;
        canDecimal = false;
        isNum = false;
        currNum = null;
    }
// if(isNum){
//     currNum = currNum * -1;
//     calcScreen.innerText = currNum  
//     isNum = false;
//     currNum = null;
//     } 
//     else if(!isNum){
//         calcScreen.innerText = calcScreen.innerText + '-';
//     }
//     else if(!isNum && currNum){
//          calcScreen.innerText = calcScreen.innerText + '-' + currNum;
//     }
});

// document.addEventListener("keyup", function(event){
//     console.log('KEYUP', event);
//     if(event.keyCode >= 48 && event.keyCode <= 57){
//       addKeytoScrn(event);
//     }
//     if(event.keyCode === 189){
//       addKeytoScrn(event);
//     }
//     if(event.key === "+"){
//       addKeytoScrn(event);
//     }
//     if(event.key === "*"){
//       addKeytoScrn(event);
//     }
//     if(event.key === "*"){
//       addKeytoScrn(event);
//     }
//     if(event.key === "/"){
//       addKeytoScrn(event);
//     }
//     if(event.key === "Enter"){
//       evaluatesInput(event);
//     }
//   });
  
//   function addKeytoScrn(event){
//     calcScreen.innerHTML= calcScreen.innerHTML + event.key;
//   }