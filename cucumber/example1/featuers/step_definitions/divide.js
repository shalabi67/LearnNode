"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const Calculator_1 = require("../../src/Calculator");
const chai_1 = require("chai");
var calculator;
var result;
cucumber_1.Given(/^a calculator$/, function () {
    calculator = new Calculator_1.Calculator();
});
cucumber_1.When(/^I divide (\d+) by (\d+)$/, function (oper1, oper2) {
    result = calculator.divide(oper1, oper2);
});
cucumber_1.Then(/^the result is (\d+)$/, function (expectedResult) {
    chai_1.expect(result).be.eq(expectedResult);
});
