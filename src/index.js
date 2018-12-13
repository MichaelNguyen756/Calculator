var calc;
var arithmeticString = '';
var arithmeticListStore = [];
var currentArithmeticList = [];
var currentArithmeticObject = {
	number: "",
	symbol: "",
	childArithmeticList: []
};

$(document).ready(function () {
	calc = new Calc();
	currentArithmeticList = arithmeticListStore;

	$(".calc-btn").on("click", function(e) {
		var $button = $(e.currentTarget);
		arithmeticString += $button.data("value");

		if($button.data("button-type") === "number"){
			if(currentArithmeticList.length === 0)
				currentArithmeticObject.symbol = "+";

			currentArithmeticObject.number += $button.data("value");
		} else if($button.data("button-type") === "arithmetic") {
			let selectedSymbol = $button.data("value");

			if(currentArithmeticObject.number !== "" || (selectedSymbol === "(" || selectedSymbol === ")") && currentArithmeticObject.symbol !== "")
				appendArithmeticExpression(currentArithmeticObject);

			currentArithmeticObject.symbol = selectedSymbol;

			if(selectedSymbol === "(" || selectedSymbol === ")") {
				appendArithmeticExpression(currentArithmeticObject);
				currentArithmeticObject.symbol = "";
			}

			currentArithmeticObject.number = "";
		}

		setDisplay(arithmeticString);
	});

	$("#equalsButton").on("click", function(e) {
		if(currentArithmeticObject.number !== "" && currentArithmeticObject.symbol !== "")
			appendArithmeticExpression(currentArithmeticObject);

		evaluateExpression(currentArithmeticList);
		resetArithmeticMemory()
		setDisplay(calc.equals());
	});

	$("#resetButton").on("click", function(e) {
		resetArithmeticMemory();
		setDisplay(0);
		calc.reset();
	});
});

function appendArithmeticExpression(arithmeticObject) {
	currentArithmeticList.push(Object.assign({}, arithmeticObject));
}

function resetArithmeticMemory() {
	arithmeticString = "";
	arithmeticListStore = [];
	currentArithmeticObject = {
		number: "",
		symbol: ""
	};
}

function setDisplay(textToDisplay) {
	$("#numberDisplay").val(textToDisplay);
}

function evaluateExpression(arithmeticList) {
	let tempCalc = new Calc();
	let bracketsIndices = {
		first: arithmeticList.findIndex(function (o) { o.symbol === "(" }),
		last: arithmeticList.lastIndexOf(function (o) { o.symbol === ")" })
	};

	if (bracketsIndices.first !== -1)

	arithmeticList.reduce((c, arithmeticObject, index) => {
		switch(arithmeticObject.symbol) {
			case "(":
				evaluateExpression(arithmeticList.slice)
			break;
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
}