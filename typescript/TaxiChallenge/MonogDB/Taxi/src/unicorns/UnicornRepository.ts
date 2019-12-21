import { Repository} from "../database/Repository";
import Unicorn, {IUnicorn} from "./Unicorn";
import {DatasourceFactory} from "../database/DatasourceFactory";

import mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO || '', { useNewUrlParser: true, useUnifiedTopology: true });

export class UnicornRepository  {
    private static unicornRepository: any = null;
    static createUnicornRepository(): UnicornRepository {
        if(this.unicornRepository == null) {
            this.unicornRepository = new UnicornRepository();

            UnicornRepository.initializeUnicornsData();
        }

        return this.unicornRepository;
    }
    private static initializeUnicornsData() {
        this.unicornRepository.save(UnicornRepository.createUnicorn('Pinky Pie'));
        this.unicornRepository.save(UnicornRepository.createUnicorn('Rainbow Dash'));
        this.unicornRepository.save(UnicornRepository.createUnicorn('Fluttershy'));
        this.unicornRepository.save(UnicornRepository.createUnicorn( 'Twilight Sparkle', 30));
    }

    private static createUnicorn(name: string, restDuration=15): IUnicorn {
        const unicorn =  <IUnicorn>{id: -1, name: name, isRented: false, restDuration:restDuration};
        return unicorn;
    }

    save(model: IUnicorn): Promise<IUnicorn> {
        return model.save();
    }

    findById(id: number):  Promise<IUnicorn> {
        // @ts-ignore
        return Unicorn.findById(id);
    }

    update(model: IUnicorn):  Promise<IUnicorn> {
        Unicorn.find();
        // @ts-ignore
        return Unicorn.findByIdAndUpdate(model._id, {$set:model},{new: true, runValidators: true});
    }

    list():  Promise<IUnicorn[]> {
        const all = Unicorn.find();
        // @ts-ignore
        return all;
    }
}

