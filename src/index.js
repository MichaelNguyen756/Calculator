var calc;
var arithmeticString = '';

$(document).ready(function () {
	calc = new Calc();

	$(".calc-btn").on("click", function(e) {
		arithmeticString += $(e.currentTarget).data("value");
	});

	$("#resetButton").on("click", function(e) {
		arithmeticString.length = 0;
		setDisplay(0);
	});
});

function setDisplay(textToDisplay) {
	$("#numberDisplay").val(textToDisplay);
}

function calculateExpression(expression) {

}