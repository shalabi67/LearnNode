import  {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import {RentalsUrl} from "../src/rentals/RentalsRouter";
import {NextFunction} from "express";
import {CREATED, NO_CONTENT, OK} from "http-status-codes";
import {IReturnedRental} from "../src/rentals/ReturnedRental";
import {logError} from "@shared";
import {IRental} from "../src/rentals/Rental";
import app from "@server";
import * as supertest from "supertest";
import {IUnicorn} from "../src/unicorn/Unicorn";
import {RentalRepository} from "../src/rentals/RentalRepository";
import {UnicornRepository} from "../src/unicorn/UnicornRepository";
import {ReturnedRentalsController} from "../src/rentals/ReturnedRentalsController";
import {ReturnedRentalRepository} from "../src/rentals/ReturnedRentalRepository";

export function getRentalReturnUrl(rentalId: string) {
    return `${RentalsUrl}/${rentalId}`;
}
describe('Unicorn rental return:', () => {
    let agent: SuperTest<Test>;
    function doErrorRental(rentalId: string, expectedResult: number, done: NextFunction) {
        spyOn(RentalRepository.create(), 'find').and.returnValue(Promise.resolve(null));

        agent.delete( getRentalReturnUrl(rentalId)).type('json').send()
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(expectedResult);
                done();
            });
    }

    const unicornName = 'Pinky Pie';
    let unicorn = <IUnicorn>{_id: '123', name: unicornName, isRented: false, restDuration: 15};
    let rentedUnicorn = <IUnicorn>{_id: '123', name: unicornName, isRented: true, restDuration: 15};
    let rental = <IRental>{_id: '345', unicorn: rentedUnicorn};
    let returnedRental = <IReturnedRental>{_id:'234', rental: rental};

    beforeAll((done) => {
        agent = supertest.agent(app);

        //let us wait for 200ms
        spyOn(ReturnedRentalsController.prototype, 'getRestDuration').and.returnValue(200);
        spyOn(ReturnedRentalRepository.create(), 'add').and.returnValue(Promise.resolve(returnedRental));

        done();
    });

    beforeEach( () => {
    });

    describe('returning rented unicorn', () => {
        it('should return a unicorn', function (done:NextFunction) {
            spyOn(RentalRepository.create(), 'find').and.returnValue(Promise.resolve(rental));
            spyOn(UnicornRepository.create(), 'returnUnicorn').and.callFake((unicorn)=> {
                expect(unicorn.isRented).toBe(true);
                done();
                return Promise.resolve(unicorn);
            });

            agent.delete(getRentalReturnUrl(rental._id)).type('json').send()
                .end((err: Error, res: Response) => {
                    logError(err);
                    expect(res.status).toBe(OK);
                    const returnedRental: IReturnedRental = res.body;
                });

        });
    });

    describe('returning non exiting rental', () => {
        it('should return not found error', function (done:NextFunction) {
            doErrorRental('99999', NO_CONTENT, done);
        });
    });
});
