import app from '@server';
import supertest, {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import {RentalsUrl} from '../src/rentals/RentalsRouter';
import {NextFunction} from 'express';
import {BAD_REQUEST, CREATED, GONE, NOT_FOUND} from 'http-status-codes';
import {logError} from '@shared';
import {IRental} from "../src/rentals/Rental";
import {UnicornRepository} from "../src/unicorn/UnicornRepository";
import {IUnicorn} from "../src/unicorn/Unicorn";
import {RentalRepository} from "../src/rentals/RentalRepository";

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

    const unicornName = 'Pinky Pie';
    let unicorn = <IUnicorn>{_id: '123', name: unicornName, isRented: false, restDuration: 15};
    let rentedUnicorn = <IUnicorn>{_id: '123', name: unicornName, isRented: true, restDuration: 15};
    let rental = <IRental>{_id: '345', unicorn: rentedUnicorn};

    beforeAll((done) => {
        agent = supertest.agent(app);

        spyOn(UnicornRepository.prototype, 'rent')
            .and.returnValue(Promise.resolve(rentedUnicorn));
        spyOn(RentalRepository.prototype, 'add')
            .and.returnValue(Promise.resolve(rental));

        done();

    });

    beforeEach( () => {
       // DatasourceFactory.resetDataSources();

    });

    describe('renting available unicorn', () => {
        it('should rent a unicorn', function (done:NextFunction) {
            spyOn(UnicornRepository.prototype, 'findByName')
                .and.returnValue(Promise.resolve(unicorn));

            const rental = {unicorn: {name: "Pinky Pie"}};
            agent.post(RentalsUrl).type('json').send(rental)
                .end((err: Error, res: Response) => {
                    logError(err);
                    expect(res.status).toBe(CREATED);
                    const rental: IRental = res.body;
                    expect(rental.unicorn.isRented).toBe(true);
                    done();
                });
        });
    });

    describe('renting non exiting unicorn', () => {
        it('should return not found error', function (done:NextFunction) {
            spyOn(UnicornRepository.prototype, 'findByName')
                .and.returnValue(Promise.resolve(null));

            const rental = {unicorn: unicorn};
            doErrorRental(rental, NOT_FOUND, done);
        });
    });

    describe('renting rented unicorn', () => {
        it('should return GONE error', function (done:NextFunction) {
            spyOn(UnicornRepository.prototype, 'findByName')
                .and.returnValue(Promise.resolve(rentedUnicorn));

            const rental = {unicorn: unicornName};
            doErrorRental(rental, GONE, done);
        });
    });


});
