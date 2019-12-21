import mongoose = require('mongoose');
import {UnicornRepository} from "../unicorn/UnicornRepository";
import {IUnicorn} from "../unicorn/Unicorn";
import Unicorn from "./Unicorn";
import {logError, logMessage} from "@shared";


export class Database {
    static connect() {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(process.env.MONGO || '', { useNewUrlParser: true, useUnifiedTopology: true });

        const db = mongoose.connection;
        db.on('error', error => logError(error));
    }

    static initializeUnicorn() {
        Database.initializeUnicornsData();
    }

    private static initializeUnicornsData() {
        const unicornRepository = UnicornRepository.create();

        unicornRepository.add(Database.createUnicorn('Pinky Pie'))
            .then(() => unicornRepository.add(Database.createUnicorn('Rainbow Dash')))
            .then(() => unicornRepository.add(Database.createUnicorn('Fluttershy')))
            .then(() => unicornRepository.add(Database.createUnicorn( 'Twilight Sparkle', 30)))
            .then(() => logMessage('unicorn data initialized successfully'))
            .catch(reason => {
                logError(reason);
                return Promise.reject(reason);
            })
    }

    private static createUnicorn(name: string, restDuration=15): IUnicorn {
        const unicorn =  new Unicorn({name: name, isRented: false, restDuration:restDuration});
        return unicorn;
    }
}
