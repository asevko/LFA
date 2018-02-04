let stringToCheck;
const amountOfTests = 10;
let currentTest = amountOfTests;
let mark = amountOfTests;
let autoTesting = true;

function analiseFormula(gotAnswer) {
    let expectedAnswer = validateFormula();
    let outputText = expectedAnswer === true ? 'is formula' : 'is not formula';
    let resultAnswer = expectedAnswer === gotAnswer;
    if (!resultAnswer) {
        if (soundEnabled) {
            let audio = new Audio('the-simpsons-nelsons-haha.mp3');
            audio.play();
        }
        mark--;
    }
    fillTable(resultAnswer, outputText)
}

function fillTable(answer, output){
    let tBody = document.getElementById("bodyt");
    let formula = document.getElementById("formula");
    let text = formula.value;

    if (text !== '') {
        let row = document.createElement('tr');
        let formulaTd = document.createElement('td');
        let formulaText = document.createTextNode(text);
        formulaTd.appendChild(formulaText);
        row.appendChild(formulaTd);

        let answerTd = document.createElement('td');
        let shadowColor = answer === false ? '#FF0000' : '#00FF00';
        answerTd.style.textShadow = '0 0 7px ' + shadowColor +', 0 0 7px ' +shadowColor;
        let answerText = document.createTextNode(output);
        answerTd.appendChild(answerText);
        row.appendChild(answerTd);

        tBody.appendChild(row);

    }
    if (currentTest > 0 && autoTesting){
        generateFormula();
        currentTest--;
    } else if (currentTest === 0){
        stringToCheck = document.getElementById("formula").value = "";
        showMark();
    }
}

function parseFormula(){
    let simplifier = "A";
    if (stringToCheck === simplifier) return false;
    let binaryFormulaRegExp = /\(\D[→~&|]\D\)/g;
    let oldString = stringToCheck;
    while(true){
        stringToCheck = stringToCheck.replace(/\(!\D\)/g,simplifier);
        stringToCheck = stringToCheck.replace(binaryFormulaRegExp, simplifier);
        if(stringToCheck === simplifier)
            return true;
        if (oldString === stringToCheck) {
            return false
        }
        oldString = stringToCheck;
    }
    //   1. (((A&B)&C)|(((!A)&C)&C))
    //   2. (((A&B)&C)|((A&C)&C))
    //   3. ((A&C)|(A&C))
    //   4. (A|A)
    //   5.  A
}

function validateFormula(){
    stringToCheck = document.getElementById("formula").value.replace(/->/g,"→");
    if(checkBrackets())
        return parseFormula();
    return false;
}

function checkBrackets() {
    let opBr = 0;
    let clBr = 0;
    for (let i = 0 ; i < stringToCheck.length ; i++)
    {
        if(stringToCheck[i]==="(") opBr++;
        if(stringToCheck[i]===")") clBr++;
    }
    return opBr === clBr;
}


function showMark() {
    let finish = document.createElement('div');
    finish.className = 'result flow-text';
    finish.id = 'mark';
    finish.innerHTML = 'You correctly completed ' + ((mark/amountOfTests)*100).toFixed(1) + '% tasks ';
    document.getElementById('content').appendChild(finish);
    let correct = document.getElementById('correct');
    correct.disabled = true;
    let incorrect = document.getElementById('incorrect');
    incorrect.disabled = true;
}


function generateFormula() {
    let number = rand(1,10);
    let symbol = ["A","B","C","D","E","F","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let negation = "!";
    let binaryOperation = ["&","|","→","~"];
    let openingBracket = "(";
    let closingBracket = ")";
    let index = rand(0,symbol.length);
    let formula = symbol[index];
    for (let iteration = 0 ; iteration < number ; iteration++){
        index = rand(0,2);
        if (index===0){
            do {
                index = rand(0, formula.length);
            }while(!symbol.includes(formula[index]));
            formula = formula.substr(0,index) +
                openingBracket + formula[index] + binaryOperation[rand(0,binaryOperation.length)] + symbol[rand(0,symbol.length)] + closingBracket +
                formula.substr(index+1, formula.length);
        }
        else {
            do {
                index = rand(0, formula.length);
            }while(!symbol.includes(formula[index]));
            formula = formula.substr(0,index) + openingBracket + negation +  formula[index]  + closingBracket + formula.substr(index+1, formula.length);
        }
    }

    formula = rand(0, 2) === 0 ? trySpoilFormula(formula) : formula;
    document.getElementById("formula").value = formula;
}

function trySpoilFormula(formula) {
    let index = rand(0, formula.length);
    return formula.substr(0,index)+formula.substr(index+1, formula.length);

}
function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


let soundEnabled = true;

function soundLogic() {
    let soundIcon = document.getElementById('sound');
    soundEnabled = !soundEnabled;
    soundIcon.src = soundEnabled ? 'img/sound_on.png': 'img/sound_off.png';
}

function beginTests() {
    uiSetUp();
    autoTesting = true;
    generateFormula();
    currentTest--;
}


function uiSetUp() {
    let correct = document.getElementById('correct');
    correct.disabled = false;
    let incorrect = document.getElementById('incorrect');
    incorrect.disabled = false;
    currentTest = amountOfTests;
    mark = amountOfTests;
    let tBody = document.getElementById("bodyt");
    tBody.innerHTML = "";
    document.getElementById("formula").value = "";
    $('#mark').remove();
    autoTesting = false
}
