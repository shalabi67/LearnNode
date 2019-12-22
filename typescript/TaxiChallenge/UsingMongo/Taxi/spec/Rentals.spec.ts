import app from '@server';
import supertest, {Response} from 'supertest';
import {SuperTest, Test} from 'supertest';
import {RentalsUrl} from '../src/rentals/RentalsRouter';
import {NextFunction} from 'express';
import {CREATED, GONE, NOT_FOUND} from 'http-status-codes';
import {logError} from '@shared';
import {IRental} from '../src/rentals/Rental';
import {UnicornRepository} from '../src/unicorn/UnicornRepository';
import {IUnicorn} from '../src/unicorn/Unicorn';
import {RentalRepository} from '../src/rentals/RentalRepository';

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
    const unicorn = {_id: '123', name: unicornName, isRented: false, restDuration: 15} as IUnicorn;
    const rentedUnicorn = {_id: '123', name: unicornName, isRented: true, restDuration: 15} as IUnicorn;
    const rentalObject = {_id: '345', unicorn: rentedUnicorn} as IRental;

    beforeAll((done) => {
        agent = supertest.agent(app);

        spyOn(UnicornRepository.create(), 'rent')
            .and.returnValue(Promise.resolve(rentedUnicorn));
        spyOn(RentalRepository.create(), 'add')
            .and.returnValue(Promise.resolve(rentalObject));

        done();

    });

    beforeEach( () => {
       // DatasourceFactory.resetDataSources();

    });

    describe('renting available unicorn', () => {
        it('should rent a unicorn', (done: NextFunction) => {
            spyOn(UnicornRepository.create(), 'findByName')
                .and.returnValue(Promise.resolve(unicorn));

            const rental = {unicorn: {name: 'Pinky Pie'}};
            agent.post(RentalsUrl).type('json').send(rental)
                .end((err: Error, res: Response) => {
                    logError(err);
                    expect(res.status).toBe(CREATED);
                    const rentalResult: IRental = res.body;
                    expect(rentalResult.unicorn.isRented).toBe(true);
                    done();
                });
        });
    });

    describe('renting non exiting unicorn', () => {
        it('should return not found error',(done: NextFunction) => {
            spyOn(UnicornRepository.create(), 'findByName')
                .and.returnValue(Promise.resolve(null));

            const rental = {unicorn};
            doErrorRental(rental, NOT_FOUND, done);
        });
    });

    describe('renting rented unicorn', () => {
        it('should return GONE error',(done: NextFunction) => {
            spyOn(UnicornRepository.create(), 'findByName')
                .and.returnValue(Promise.resolve(rentedUnicorn));

            const rental = {unicorn: unicornName};
            doErrorRental(rental, GONE, done);
        });
    });


});
