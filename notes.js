// HE WHO COPY/PASTES FROM THIS DOCUMENT SHALL BE SMITTEN BY THE CODING GODS
// AND BRING UPON HIMSELF AND HIS POSTERITY A THOUSAND YEARS OF UNREPRODUCIBLE
// BUGS IN PRODUCTION CODE. SO LET IT BE WRITTEN, SO LET IT BE DONE

/*
EVENT LISTENERS:

You'll need to make use of event listeners in order to capture clicks on your buttons and keypresses.
There are at least three major ways (in increasing preference) to setup your event listeners for your buttons:
*/

/*
	1) Create a variable and an event listener for EVERY button. This takes a LOT of code and is highly repetitive.
			DON'T DO THIS.
*/
// example
var one = document.getElementById('1');
var two = document.getElementById('2');
var three = document.getElementById('3');
// so on and so forth...
one.addEventListener('click', function() {
  // handle clicking one
});
two.addEventListener('click', function() {
  // handle clicking two
});
three.addEventListener('click', function() {
  // handle clicking three
});
// etc., etc.

/*
	2) Use document.querySelectorAll() to select all your buttons and loop over them, applying appropriate event listeners.
			This has the advantage over method (1) of being shorter and DRYer. However, it adds a large number of different event listeners.
*/
// example
var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  if (buttons[i].classList.contains('number')) {
    buttons[i].addEventListener('click', function(event) {
      // handleNumber(buttons[i].id);
    });
  } else if (buttons[i].classList.contains('operator')) {
    buttons[i].addEventListener('click', function(event) {
      // handleOperator(buttons[i].id);
    });
  } else if (buttons[i].id === 'decimal') {
    buttons[i].addEventListener('click', function(event) {
      // handleDecimal();
    });
  }
  // etc., etc.
}

/*
	3) Use a single event listener on the calculator whose callback function checks if a button was pressed. If so,
			it calls an appropriate handler, depending on what type of button was pressed. This has the advantage of being
			even shorter, with fewer event listeners crowding the DOM. Note that the logic for handling these different
			buttons is maintained in separate functions in order to keep functions small and testable.
*/
//example
document
  .getElementById('calculator')
  .addEventListener('click', function(event) {
    // if anything but a button is pressed, end function
    if (!event.target.matches('button')) {
      return;
    } else if (event.target.matches('.number')) {
      // handleNumber(event.target.id);
    } else if (event.target.matches('.operator')) {
      // handleOperator(event.target.id);
    } else if (event.target.id === 'decimal') {
      // handleDecimal();
    }
    // etc., etc.
  });

/*
KEYBOARD EVENT LISTENERS

Not only do you need to listen for button-clicks and handle those appropriately, you must also listen for keyboard
input and handle it the same way. The only button functionality that you DON'T have to implement with the keyboard
is the Positive/Negative functionality. In order to do this efficiently (i.e. - DRY), you'll want to use the same
handlers (handleNumber, handleOperator, handleDecimal, etc.) you've written for your button handlers. You'll also
want to listen to the whole DOM for keyup events.
*/
// example
document
  .getElementById('calculator')
  .addEventListener('click', function(event) {
    // if anything but a button is pressed, end function
    if (!event.target.matches('button')) {
      return;
    } else if (event.target.matches('.number')) {
      // handleNumber(event.target.id);
    } else if (event.target.matches('.operator')) {
      // handleOperator(event.target.id);
    } else if (event.target.id === 'decimal') {
      // handleDecimal();
    }
    // etc., etc.
  });

document.addEventListener('keyup', function(event) {
  if (event.key === '.') {
    // handleDecimal();
  } else if (+event.key >= 0 && +event.key <= 9) {
    // handleNumber(event.key);
  } else if (['+', '-', '*', '/'].includes(event.key)) {
    // handleOperator(event.key);
  }
  // etc., etc.
});

/*
TESTING

Make sure to follow TDD! This means stubbing-out your function (making it exist, but not implementing any code in it yet),
writing a test, making sure the test fails, then altering your code until it passes, then refactoring your coe to be DRYer
and more efficient. Then, start all over again!

In order to make this easier for you, we've created a starter project you can clone and
use as your own at https://github.com/bmbarker90/karma-jasmine-seed. Follow the directions at that page in order
to get setup.

One issue is the fact that jasmine doesn't load your index.html when it builds its DOM for testing. This means that your
calls to "document.getElementById()" or "someElement.addEventListener()" will cause errors and your tests won't run.
In order to circumvent this problem, you should wrap all of your top-level DOM calls into a function called init(). Then,
call init() on load.

Additionally, your functions that handle operators, numbers, decimals, etc. should NOT directly call the DOM, but rather
call some functions that DO reference the DOM. Do NOT test these functions. Instead, in your tests of the handler functions,
use jasmine spies to prevent those functions from ever being truly executed.

As a final word of advice on testing, KEEP YOUR FUNCTIONS SMALL!!! This makes them easier to test.
*/
// example of init() pattern
var screen;
function init() {
  screen = document.getElementById('screen');
  document
    .getElementById('calculator')
    .addEventListener('click', function(event) {
      // if anything but a button is pressed, end function
      if (!event.target.matches('button')) {
        return;
      } else if (event.target.matches('.number')) {
        // handleNumber(event.target.id);
      }
      // etc., etc.
    });

  document.addEventListener('keyup', function(event) {
    if (event.key === '.') {
      // handleDecimal()
    }
    // etc., etc.
  });
}
init();

// example of DOM-manipulating utility function
function setScreen(val) {
  document.getElementById('screen').innerText = val;
}

function addToScreen(val) {
  document.getElementById('screen').innerText += val;
}

// example of test & spies
describe('calculator', function() {
  describe('handleNumber', function() {
    var addToScreenSpy;
    beforeEach(function() {
      addToScreenSpy = spyOn(window, 'addToScreen').and.return(false);
    });

    it('does a thing', function() {
      handleNumber(3);
      expect(addToScreen).toHaveBeenCalledWith(3);
    });
  });
});

/*
HANDLING DECIMALS

Decimals are always valid unless the number currently be entered already has one. If it does, ignore input decimals.
This can be done with the use of a "flag" - a boolean variable that says whether you are allowed to add a decimal.
This flag should initialize to true, and become false as soon as a decimal is added. Once an operator is pressed, you
should then set the flag to true.
*/

/*
HANDLING POSITIVE/NEGATIVE

This is potentially the most difficult part of this project. When the "+/-" button is pressed, the CURRENT number (not
the entire screen) will become negative if it's positive, or positive if it's negative. The easiest way to implement
this is to keep all FINISHED values (numbers and operators that you KNOW will be used) inside an array, and having
variables to hold the current number and the current operator. These last two variables will be initialized to null.
When adding a number, update the currNumber variable to hold the new digit as well as previous digits. Once an
operator is added, empty currNumber and append its value to the end of your "components" array. As you press
operators, update currOperator to hold JUST that operator. You may replace the current operator multiple times. As
soon as a number is pressed, empty currOperator and append the currOperator to the end of the "components" array. When
"+/-" is pressed, make a positive currNumber become negative, and a negative one positive. If currNumber was positive,
go to the last number on the screen and use strings' .slice() method to create a new string that has a "-" before the last
number. If currNumber was negative, use the .slice() method to create a new version of the string that omits the "-".
*/
// example
var currNumber = null;
var currOperator = null;

function handleNumber(num, currScreen) {
  // if currNumber exists
  // 	add to screen
  // 	add to currNumber
  // else
  // 	add to screen
  // 	add currOperator to components
  // 	set currOperator to null
}
function handleOperator(op, currScreen) {
  // if currOperator exists
  // 	replace last string of screen with operator
  // 	set currOperator to new operator
  // else
  // 	add to screen
  // 	add currNumber to components
  // 	set currOperator to new operator
}
function handlePosNeg(currScreen) {
  // if currNumber exists
  // 	if currNumber is positive
  // 		currNumber = 0 - currNumber
  // 		use .slice() to add "-" before last number
  // 	else
  // 		currNumber = 0 - currNumber
  // 		use .slice() and .lastIndexOf() to remove "-" from before last number
}

/*
CALCULATING RESULTS

Firstly, you'll want to make sure that any value within "currNumber" gets appended to your "components" array.
Then, using the eval() function, with the "components" array's elements joined via the array's .join() method, you can easily
get the result of any calculation. However, eval() doesn't know how to handle negative numbers, which means that you must
wrap any negative number in ()'s in order to enforce order of operations in a way that javascript can understand. This
means looping over every even index of your "components" array (the indices that have a number in them) and if it starts
with "-", then wrap it in ()'s. Do this before running eval().
*/

/*
ADDITIONAL EDGE CASES (OPERATORS)

1) Starting with an operator

	Pretend your user has JUST loaded your calculator and the screen is blank. The user then presses an operator.
	The correct behavior is for a 0 to be added in front of the operator.

2) Handling POSITIVE/NEGATIVE when there's no number

	Let's say your screen currently holds "3*9-5+". It ends in an operator. Upon hitting the positive/negative button,
	treat the non-existent area to the right of the last operator as 0, and add the "-" (negative) sign to the screen.
	In our example, this would be "3*9-5+-0", and currNumber should hold "-0". Upon adding other numbers with
	handleNumber(), you'll want to replace the 0 with that new number. You can check to see if currNumber is 0 or -0
	with the following code snippets (checking the absolute value of the numerical representation of currNumber).
*/
// example with SIMPLIFIED, INCOMPLETE handleNumber and handlePosNeg functions
function handlePosNeg(screen) {
  // if there's no current number, but there is an operator
  if (!currNumber) {
    // add currOperator to components
    // set currOperator to null
    // add -0 to the screen
    // set currNumber to -0
  } else if (currNumber.length === 2 && Math.abs(+currNumber) === 0) {
    // set currNumber to 0
    // remove the - from -0 on the screen
  } else {
    currNumber = string(0 - +currNumber);
    // update screen
  }
}

function handleNumber(num, screen) {
  // if there's a currNumber that is either "0" or "-0"
  if (currNumber === '0') {
    currNumber = num;
    setScreen(screen.slice(0, screen.length - 1) + num);
  } else if (currNumber === '-0') {
    currNumber = '-' + num;
    setScreen(screen.slice(0, screen.length - 1) + num);
  }
}

/*
ADDITIONAL EDGE CASES (DECIMALS, CLEAR, & EVALUATION)

1) Let's assume our screen is in the following state: "5+.". This is a valid state. However, if we
	were to press an operator, we would have (assuming we pressed "+") "5+.+", which is NOT valid for
	evaluation. There are 3+ ways to handle this. First, you can just delete the "." and not add the
	operator. Second, you could adjust the string to become "5+0+" as soon as the operator is pressed.
	Third, I would recommend just waiting until the final evaluation and looping over the array to
	replace any element equal to "." with "0".

	Otherwise, you could instead prevent operators until a number has been pressed.

2) When the "clear" button is pressed, make sure to set all your flags (especially your
	canDecimal flag) to their initial states.

3) When equals is pressed, if the screen is empty, just slap "0" onto the screen.

4) Post-equals (after calculating a result), adding a number or decimal should replace the current screen.

*/

var calcScreen = document.getElementById('screen');
var btnContainer = document.getElementById('btn-container');

var calcInput = '';
var canDecimal = true;
var canOperator = false;

// when buttons are clicked execute functions

btnContainer.addEventListener("click", function(event) {
  outputsToScreen(event);
  evaluatesInput(event);
  clearDisplay(event);
  negOrPosNum(event);
  //console.log(event);
});

// outputs numbers and operators to the screen. 

function outputsToScreen(event){
  var btnVal = event.target.value;
  if(btnVal === '.'){
    if(canDecimal){
      calcScreen.innerHTML = calcScreen.innerHTML + btnVal;
      canDecimal = false;
    }
  }else if(event.target.matches(".number")){
    canOperator = true;
    calcScreen.innerHTML = calcScreen.innerHTML + btnVal;
  }else if(event.target.matches(".operator")){
    if(canOperator){
      calcScreen.innerHTML = calcScreen.innerHTML + btnVal;
      canOperator = false;
    }
  }
};

// evaluates equations  
function evaluatesInput(event){
  var screenText = calcScreen.innerHTML;
  if(event.target.value === '='){
   if(isOperator(screenText)){
    var cleanText = screenText.slice(0, screenText.length -1);
    calcScreen.innerHTML = eval(cleanText);
   }
  }if(event.target.value === '='){
    calcScreen.innerHTML = eval(calcScreen.innerHTML);
  }
}

function isOperator(screenText){
  if(
  screenText[screenText.length - 1] === "-" || 
  screenText[screenText.length - 1] === "+" ||
  screenText[screenText.length - 1] === "*" || 
  screenText[screenText.length - 1] === "/"){
    return true;
  }
  return false;
}


// clear button 
function clearDisplay(event){
  if(event.target.matches('#clear')){
    calcScreen.innerHTML = '';
  }
}

// +/- turn a number positive or negative when clicked
function negOrPosNum(event){
  if(event.target.matches('.pos-neg-operator')){ 
    calcScreen.innerHTML = calcScreen.innerHTML * -1;
  }
}

// keyboard event
// add other if's statements for ops or a sep function for equals button 

document.addEventListener("keyup", function(event){
  console.log('KEYUP', event);
  if(event.keyCode >= 48 && event.keyCode <= 57){
    addKeytoScrn(event);
  }
  if(event.keyCode === 189){
    addKeytoScrn(event);
  }
  if(event.key === "+"){
    addKeytoScrn(event);
  }
  if(event.key === "*"){
    addKeytoScrn(event);
  }
  if(event.key === "*"){
    addKeytoScrn(event);
  }
  if(event.key === "/"){
    addKeytoScrn(event);
  }
  if(event.key === "Enter"){
    evaluatesInput(event);
  }
});

function addKeytoScrn(event){
  calcScreen.innerHTML= calcScreen.innerHTML + event.key;
} 
