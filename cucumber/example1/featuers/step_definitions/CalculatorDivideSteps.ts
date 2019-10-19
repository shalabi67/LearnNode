import {binding, given, then, when} from "cucumber-tsflow/dist";
import {Calculator} from "../../src/Calculator";
import {expect} from "chai";

@binding()
export class CalculatorDivideSteps {
    private calculator: Calculator = new Calculator();;
    private result: number = 0;


    @given(/^a calculator$/)
    public givenCalculator () {
        this.calculator = new Calculator();
        this.result = 0;
    }

    @when(/^I divide (\d+) by (\d+)$/)
    public divide(oper1: number, oper2:number) {
        this.result = this.calculator.divide(oper1, oper2);
    };

    @then(/^the result is (\d+)$/)
    public evaluate(expectedResult: number) {
        expect(this.result).be.eq(expectedResult);
    };
}