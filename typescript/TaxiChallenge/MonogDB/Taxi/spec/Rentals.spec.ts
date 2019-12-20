import app from "@server";
import supertest, {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import {DatasourceFactory} from "../src/database/DatasourceFactory";
import {RentalsUrl} from "../src/rentals/RentalsRouter";
import {NextFunction} from "express";
import {BAD_REQUEST, CREATED, NOT_FOUND} from "http-status-codes";
import {Rental} from "../src/rentals/Rental";
import {logError} from "@shared";

describe('Unicorn rental:', () => {
    let agent: SuperTest<Test>;
    function doErrorRental(rental: object, expectedResult: number, done: NextFunction) {
        agent.post(RentalsUrl).type('json').send(rental)
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

    describe('renting available unicorn', () => {
        it('should rent a unicorn', function (done:NextFunction) {
            const rental = {unicorn: {id: 1}};
            agent.post(RentalsUrl).type('json').send(rental)
                .end((err: Error, res: Response) => {
                    logError(err);
                    expect(res.status).toBe(CREATED);
                    const rental: Rental = res.body;
                    expect(rental.unicorn.isRented).toBe(true);
                    expect(rental.id).toBeGreaterThan(0);
                    done();
                });
        });
    });

    describe('renting non exiting unicorn', () => {
        it('should return not found error', function (done:NextFunction) {
            const rental = {unicorn: {id: 1000}};
            doErrorRental(rental, NOT_FOUND, done);
        });
    });

    describe('renting invalid unicorn', () => {
        it('should return bad request error', function (done:NextFunction) {
            const rental = {unicorn: {id: -1}};
            doErrorRental(rental, BAD_REQUEST, done);
        });
    });
});