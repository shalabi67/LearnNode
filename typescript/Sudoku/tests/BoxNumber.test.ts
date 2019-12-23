import {Box} from "../src/units/Box";
import {expect} from "chai";


describe('find box number', () => {

    describe('1st row', () => {
        it('should return 0', function () {
            for(let i=0; i<3; i++) {
                for(let j=0; j<3; j++) {
                    const boxNumber = Box.getBoxNumber(9, i, j);
                    expect(boxNumber).equal(0);
                }
            }


        });

        it('should return 1', function () {
            for(let i=0; i<3; i++) {
                for(let j=3; j<6; j++) {
                    const boxNumber = Box.getBoxNumber(9, i, j);
                    expect(boxNumber).equal(1);
                }
            }


        });

        it('should return 2', function () {
            for(let i=0; i<3; i++) {
                for(let j=6; j<9; j++) {
                    const boxNumber = Box.getBoxNumber(9, i, j);
                    expect(boxNumber).equal(2);
                }
            }


        });
    });

    describe('2nd row', () => {
        it('should return 3', function () {
            for(let i=3; i<6; i++) {
                for(let j=0; j<3; j++) {
                    const boxNumber = Box.getBoxNumber(9, i, j);
                    expect(boxNumber).equal(3);
                }
            }


        });

        it('should return 4', function () {
            for(let i=3; i<6; i++) {
                for(let j=3; j<6; j++) {
                    const boxNumber = Box.getBoxNumber(9, i, j);
                    expect(boxNumber).equal(4);
                }
            }


        });

        it('should return 5', function () {
            for(let i=3; i<6; i++) {
                for(let j=6; j<9; j++) {
                    const boxNumber = Box.getBoxNumber(9, i, j);
                    expect(boxNumber).equal(5);
                }
            }


        });
    });

    describe('3rd row', () => {
        it('should return 6', function () {
            for(let i=6; i<9; i++) {
                for(let j=0; j<3; j++) {
                    const boxNumber = Box.getBoxNumber(9, i, j);
                    expect(boxNumber).equal(6);
                }
            }


        });

        it('should return 7', function () {
            for(let i=6; i<9; i++) {
                for(let j=3; j<6; j++) {
                    const boxNumber = Box.getBoxNumber(9, i, j);
                    expect(boxNumber).equal(7);
                }
            }


        });

        it('should return 8', function () {
            for(let i=6; i<9; i++) {
                for(let j=6; j<9; j++) {
                    const boxNumber = Box.getBoxNumber(9, i, j);
                    expect(boxNumber).equal(8);
                }
            }


        });
    });
});
