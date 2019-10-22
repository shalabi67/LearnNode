import {Client, ClientConfig} from 'pg';
import {Person} from "./Person";
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
const query = database.getQuery(new Person());

find<Person>(client, query)
    .then(people => {
        console.log('getting all people');
        for(const person of people) {
            console.log(person);
        }
    });

find<Person>(new Client(configuration), query+' where first_name=$1', ["mohammad"])
    .then(people => {
        console.log("getting mohammad data")
        for(const person of people) {
            console.log(person);
        }
    });
