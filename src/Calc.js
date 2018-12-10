function Calc(){
	this.result = 0;
}

Calc.prototype.add = function(numberToAdd){
	this.result += numberToAdd;
	return this;
};

Calc.prototype.subtract = function(numberToSubtract){
	this.result -= numberToSubtract;
	return this;
};

Calc.prototype.multiply = function(numberToMultiply){
	this.result *= numberToMultiply;

	//	The result could be "-0"
	if(this.result === -0)
		this.result = 0;

	return this;
};

Calc.prototype.divide = function(numberToDivide){
	this.result /= numberToDivide;

	//	The result could be "-0"
	if(this.result === -0)
		this.result = 0;

	return this;
};

Calc.prototype.equals = function(){
	var resultToShow = this.result;
	this.reset();
	return resultToShow;
};

Calc.prototype.reset = function(){
	this.result = 0;
	return this;
};

module.exports = Calc;