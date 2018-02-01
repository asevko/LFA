const AccesabilityIdentifiers  = {
    constant: "constant",
    symbol: "symbol",
    negation: "negation",
    conjunction: "conjunction",
    disjunction: "disjunction",
    implication: "implication",
    equivalence: "equivalence",
    openingBracket: "opening bracket",
    closingBracket: "closing bracket",
    binaryConnective: "binary connective",
    atom: "atom",
    unaryComplexFormula: "unary complex formula",
    binaryComplexFormula: "binary complex formula",
    formula: "formula"
};

class Alphabet {
    constructor() {
        this.constant = "1 | 0";
        this.symbol = "A | B | C | D | E | F | G | K | L | M | N | O | P | Q | R | S | T | U | V | W | X | Y | Z";
        this.negation = "!";
        this.conjunction = "&";
        this.disjunction = "|";
        this.implication = "->";
        this.equivalence = "~";
        this.openingBracket = "(";
        this.closingBracket = ")";
        this.binaryConnective = this.implication + " | " + this.conjunction + " | " +
            this.disjunction + " | " + this.equivalence;
    }
}

class Syntax {
    constructor() {
        this.alphabet = new Alphabet();
        this.atom = this.alphabet.symbol;
        this.formula = this.alphabet.constant + " | " + this.atom + " | " + this.unaryComplexFormula +
            " | " + this.binaryComplexFormula;
        this.unaryComplexFormula = this.alphabet.openingBracket + " | " + this.alphabet.negation +
            " | " + this.formula + " | " + this.alphabet.closingBracket;
        this.binaryComplexFormula = this.alphabet.openingBracket + " | " + this.formula +
            " | " + this.alphabet.binaryConnective + " | " + this.formula + " | " + this.alphabet.closingBracket;
    }
}

class Language {
    constructor(syntax, alphabet) {
        this.alphabet = alphabet;
        this.syntax = syntax
    }
}


function fillTable(answer,answerTxt){
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
        let answerText = document.createTextNode(answerTxt);
        answerTd.appendChild(answerText);
        row.appendChild(answerTd);

        tBody.appendChild(row);

    }

}