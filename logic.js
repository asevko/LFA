let stringToCheck;
let tests = [
    '(((A&B)&C)|(((!A)&C)&C))',
    '((A~(C~D)~B))',
    '(((A~B)~C)~D)',
    '(A->B)~(!(C))',
    '(A&B)->(!C)',
];


let mark = 4;

function analiseFormula(gotAnswer) {
    let expectedAnswer = validateFormula();
    let outputText = expectedAnswer === true ? 'is formula' : 'is not formula';
    let resultAnswer = expectedAnswer === gotAnswer;
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
    //showMark();

}

function parseFormula(){
    let isCorrect = false;
    let simplifier = "A";
    stringToCheck = stringToCheck.replace(/\(!\D\)/g,simplifier);
    let binaryFormulaRegExp = /\(\D[→~&|]\D\)/g;
    let oldString = stringToCheck;
    while(true){
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
    finish.innerHTML = 'You correctly completed ' + ((mark/tests.length)*100).toFixed(1) + '% tasks ';
    document.getElementById('content').appendChild(finish);
}