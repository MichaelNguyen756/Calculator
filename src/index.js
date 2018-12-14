var calc;
var arithmeticString = '';
var currentArithmeticList = [];
var currentArithmeticObject = {
	number: "",
	symbol: "+"
};

$(document).ready(function () {
	calc = new Calc();

	$(".calc-btn").on("click", function(e) {
		var $button = $(e.currentTarget);
		var selectedValue = $button.data("value");

		if($button.data("button-type") === "number"){
			currentArithmeticObject.number += $button.data("value");
			arithmeticString += selectedValue;
			setDisplay(arithmeticString);
		} else if($button.data("button-type") === "arithmetic") {
			var isLeftBracketSelected = selectedValue === "(";
			var isRightBracketSelected = selectedValue === ")";
			var isBracketSelected =  isLeftBracketSelected || isRightBracketSelected;

			if(isLeftBracketSelected)
				currentArithmeticObject.number = "";

			if((currentArithmeticObject.number !== "" || 
					isBracketSelected && currentArithmeticObject.symbol !== "" || isBracketSelected) || 
				currentArithmeticList[currentArithmeticList.length - 1].symbol === ")" ) {
				if(currentArithmeticObject.symbol == "(" && isLeftBracketSelected)
					currentArithmeticObject.symbol = "+";

				appendArithmeticExpression(currentArithmeticObject);
				currentArithmeticObject.symbol = selectedValue;

				if(isBracketSelected) {
					appendArithmeticExpression(currentArithmeticObject);

					if(isLeftBracketSelected)
						currentArithmeticObject.symbol = "+";
				}

				arithmeticString += selectedValue;
				setDisplay(arithmeticString);
			}
		}
	});

	$("#equalsButton").on("click", function(e) {
		if(currentArithmeticObject.number !== "" && currentArithmeticObject.symbol !== "")
			appendArithmeticExpression(currentArithmeticObject);

		let result = evaluateExpression(currentArithmeticList);
		resetArithmeticMemory()
		setDisplay(result);
	});

	$("#resetButton").on("click", function(e) {
		resetArithmeticMemory();
		setDisplay(0);
		calc.reset();
	});
});

function appendArithmeticExpression(arithmeticObject) {
	if(currentArithmeticObject.symbol !== "")
		currentArithmeticList.push(Object.assign({}, arithmeticObject));

	currentArithmeticObject.symbol = "";
	currentArithmeticObject.number = "";
}

function resetArithmeticMemory() {
	arithmeticString = "";
	currentArithmeticList = [];
	currentArithmeticObject = {
		number: "",
		symbol: "+"
	};
}

function setDisplay(textToDisplay) {
	$("#numberDisplay").val(textToDisplay);
}

function evaluateExpression(arithmeticList) {
	let tempCalc = new Calc();
	let symbolList = arithmeticList.map(o => o.symbol);
	let bracketsIndices = {
		first: symbolList.indexOf("("),
		last: symbolList.lastIndexOf(")")
	};

	if(arithmeticList[0].symbol == "")
		arithmeticList[0].symbol = "+";

	if (bracketsIndices.first !== -1 && bracketsIndices.last !== -1) {
		let arithmeticObjectBeforeBracket = arithmeticList[bracketsIndices.first - 1];
		let startIndexToSliceTo = bracketsIndices.first - (arithmeticObjectBeforeBracket.number === "" ? 1 : 0);

		arithmeticList = arithmeticList.slice(0, startIndexToSliceTo ).concat(
			{
				number: evaluateExpression(arithmeticList.slice(bracketsIndices.first + 1, bracketsIndices.last)),
				symbol: arithmeticObjectBeforeBracket.number === "" ? arithmeticObjectBeforeBracket.symbol  : '*'
			},
			arithmeticList.slice(bracketsIndices.last + 1)
		).filter(function (obj) { return obj !== undefined && obj !== ""});
	}

	arithmeticList.reduce((c, arithmeticObject, index) => {
		switch(arithmeticObject.symbol) {
			case "*":
				return c.multiply(Number.parseFloat(arithmeticObject.number));
			case "-":
				return c.subtract(Number.parseFloat(arithmeticObject.number));
			case "/":
				return c.divide(Number.parseFloat(arithmeticObject.number));
			case "+":
			default:
				return c.add(Number.parseFloat(arithmeticObject.number));
		};
	}, tempCalc);

	return tempCalc.equals();
}