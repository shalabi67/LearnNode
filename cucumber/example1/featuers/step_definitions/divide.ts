import {Given, Then, When} from 'cucumber'
import {Calculator} from "../../src/Calculator";
import {expect} from 'chai';

var calculator: Calculator;
var result: number;
Given(/^a calculator$/, function () {
    calculator = new Calculator();
});
When(/^I divide (\d+) by (\d+)$/, function (oper1: number, oper2:number) {
    result = calculator.divide(oper1, oper2);
});
Then(/^the result is (\d+)$/, function (expectedResult: number) {
    expect(result).be.eq(expectedResult);
});