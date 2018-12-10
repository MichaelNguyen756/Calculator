describe("Calc", function() {
	var Calc = require('../src/Calc');

	var calc;

	beforeEach(function() {
		calc = new Calc();
	});

	it("should default and equal to 0", function() {
		expect(calc.equals()).toEqual(0);
	});

	describe("add()", function() {
		it("should add a small positive number", function() {
			calc.add(8);
			expect(calc.equals()).toEqual(8);
		});

		it("should add a small negative number", function() {
			calc.add(-4);
			expect(calc.equals()).toEqual(-4);
		});

		it("should add multiple numbers", function() {
			calc.add(1).add(2).add(3);
			expect(calc.equals()).toEqual(6);
		});
	});

	describe("subtract()", function() {
		it("should subtract a small positive number", function() {
			calc.subtract(3);
			expect(calc.equals()).toEqual(-3);
		});

		it("should subtract a small negative number", function() {
			calc.subtract(-7);
			expect(calc.equals()).toEqual(7);
		});

		it("should subtract multiple numbers", function() {
			calc.subtract(1).subtract(4).subtract(8);
			expect(calc.equals()).toEqual(-13);
		});
	});

	describe("multiply()", function() {
		it("should multiply a small positive number from 0", function() {
			calc.multiply(4);
			expect(calc.equals()).toEqual(0);
		});

		it("should multiply a small negative number from 0", function() {
			calc.multiply(-1);
			expect(calc.equals()).toEqual(0);
		});

		it("should multiply a small positive number from a positive number", function() {
			calc.add(5).multiply(5);
			expect(calc.equals()).toEqual(25);
		});

		it("should multiply a small positive number from a negative number", function() {
			calc.subtract(7).multiply(4);
			expect(calc.equals()).toEqual(-28);
		});

		it("should multiply a small negative number from a positive number", function() {
			calc.add(7).multiply(-3);
			expect(calc.equals()).toEqual(-21);
		});

		it("should multiply a small negative number from a negative number", function() {
			calc.subtract(4).multiply(-2);
			expect(calc.equals()).toEqual(8);
		});
	});

	describe("divide()", function() {
		it("should divide a small positive number from 0", function() {
			calc.divide(3);
			expect(calc.equals()).toEqual(0);
		});

		it("should divide a small negative number from 0", function() {
			calc.divide(-7);
			expect(calc.equals()).toEqual(0);
		});

		it("should divide a small positive number from a positive number", function() {
			calc.add(5).divide(5);
			expect(calc.equals()).toEqual(1);
		});

		it("should divide a small positive number from a negative number", function() {
			calc.subtract(8).divide(4);
			expect(calc.equals()).toEqual(-2);
		});

		it("should divide a small negative number from a positive number", function() {
			calc.add(9).divide(-3);
			expect(calc.equals()).toEqual(-3);
		});

		it("should divide a small negative number from a negative number", function() {
			calc.subtract(4).divide(-2);
			expect(calc.equals()).toEqual(2);
		});
	});

	describe("given tests", function() {
		it("should chain to equal 20", function() {
			calc.add(6).add(5).subtract(1).multiply(2).divide(1);
			expect(calc.equals()).toEqual(20);
		});

		it("should be reusable", function() {
			calc.add(5).add(6);
			expect(calc.equals()).toEqual(11);
			expect(calc.equals()).toEqual(0);

			calc.add(5).add(1);
			expect(calc.equals()).toEqual(6);
			expect(calc.equals()).toEqual(0);

			calc.add(0.1).multiply(0.2);
			expect(calc.equals()).toEqual(0.1 * 0.2);
		});
	});

	it("should reset the calculator", function() {
		calc.add(1).subtract(10).multiply(2).add(3);
		expect(calc.equals()).toEqual(-15);

		calc.reset();
		expect(calc.equals()).toEqual(0);
	});
});