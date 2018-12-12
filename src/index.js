var calc;
var arithmeticString = '';
var arithmeticList = [];

$(document).ready(function () {
	var currentArithmeticObject = {
		number: "",
		symbol: ""
	};

	calc = new Calc();

	$(".calc-btn").on("click", function(e) {
		var $button = $(e.currentTarget);
		arithmeticString += $button.data("value");

		if($button.data("button-type") === "number"){
			if(arithmeticList.length === 0)
				currentArithmeticObject.symbol = "+";

			currentArithmeticObject.number += $button.data("value");
		} else if($button.data("button-type") === "arithmetic") {
			if(currentArithmeticObject.number !== "")
				appendArithmeticExpression(currentArithmeticObject);

			currentArithmeticObject.symbol = $button.data("value");
			currentArithmeticObject.number = "";
		}

		setDisplay(arithmeticString);
	});

	$("#equalsButton").on("click", function(e) {
		if(currentArithmeticObject.number !== "" && currentArithmeticObject.symbol !== "")
			appendArithmeticExpression(currentArithmeticObject);

		arithmeticList.reduce((c, arithmeticObject) => {
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
		}, calc);
		
		arithmeticString = "";
		arithmeticList = [];
		currentArithmeticObject = {
			number: "",
			symbol: ""
		};

		setDisplay(calc.equals());
	});

	$("#resetButton").on("click", function(e) {
		arithmeticString = "";
		arithmeticList = [];
		currentArithmeticObject = {
			number: "",
			symbol: ""
		};

		setDisplay(0);
		calc.reset();
	});
});

function appendArithmeticExpression(arithmeticObject) {
	arithmeticList.push(Object.assign({}, arithmeticObject));
}

function setDisplay(textToDisplay) {
	$("#numberDisplay").val(textToDisplay);
}

function calculateExpression(expression) {

}