import  {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import {DatasourceFactory} from "../src/database/DatasourceFactory";
import {RentalsUrl} from "../src/rentals/RentalsRouter";
import {NextFunction} from "express";
import {CREATED, NO_CONTENT, OK} from "http-status-codes";
import {ReturnedRental} from "../src/rentals/ReturnedRental";
import {logError} from "@shared";
import {Rental} from "../src/rentals/Rental";
import app from "@server";
import * as supertest from "supertest";

export function getRentalReturnUrl(rentalId: number) {
    return `${RentalsUrl}/${rentalId}`;
}
describe('Unicorn rental return:', () => {
    let agent: SuperTest<Test>;
    function doErrorRental(rentalId: number, expectedResult: number, done: NextFunction) {
        agent.delete( getRentalReturnUrl(rentalId)).type('json').send()
            .end((err: Error, res: Response) => {
                logError(err);
                expect(res.status).toBe(expectedResult);
                done();
            });
    }

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();

    });

    beforeEach( () => {
        DatasourceFactory.resetDataSources();
    });

    describe('returning rented unicorn', () => {
        it('should return a unicorn', function (done:NextFunction) {
            const rental = {unicorn: {id: 2}};
            agent.post(RentalsUrl).type('json').send(rental)
                .end((err: Error, response: Response) => {
                    const rental: Rental = response.body;
                    expect(response.status).toBe(CREATED);
                    agent.delete(getRentalReturnUrl(rental.id)).type('json').send()
                        .end((err: Error, res: Response) => {
                            logError(err);
                            expect(res.status).toBe(OK);
                            const rental: ReturnedRental = res.body;
                            expect(rental.unicorn.isRented).toBe(false);
                            expect(rental.id).toBeGreaterThan(0);
                            done();
                        });
                });

        });
    });

    describe('returning non exiting rental', () => {
        it('should return not found error', function (done:NextFunction) {
            doErrorRental(1000, NO_CONTENT, done);
        });
    });
});