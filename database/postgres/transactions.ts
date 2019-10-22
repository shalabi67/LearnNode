import {Client, ClientConfig} from 'pg';
import {Person} from "./Person";
import {DataModel} from "./DataModel";
import {find} from "./find";
import {Database} from "./Database";


let configuration: ClientConfig = {
    host: 'localhost',
    port: 54320,
    database: 'test',
    user: 'postgres',
    password: 'example'
}
const database = new Database<Person>();
const client = new Client(configuration);
const insert = database.getQuery(new Person());

export async function save<T extends DataModel>(client : Client, statment: string, person:T) {
    //console.log("getData");
    const values = person.convert();
    try {
        await client.connect();
        //console.log('connected.');
        await client.query('BEGIN');
        const queryResult = await client.query(statment, values);
        await client.query('COMMIT');

    } catch (e) {
        //console.error(e);
        await client.query('ROLLBACK');
        return Promise.reject(e);
    }

    await client.end();
}

const firstName = "firstName4";
const email = "email4";
let person = Person.create(firstName,'lastName', email);
save<Person>(client, insert, person)
    .then(() => {
        console.log('Adding new person');
    })
    .then(() => {
        find<Person>(new Client(configuration),
            database.getQuery(person) + ' where first_name=$1', [firstName])
            .then(people => {
                console.log('get person');
                for(const person of people) {
                    console.log(person);
                }
            });
    })
    .catch(e => console.log(e));


