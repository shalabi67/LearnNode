import {Client, ClientConfig} from "pg";
import {Person} from "./Person";
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


database.find(client, query)
    .then(people => {
        console.log('getting all people');
        for(const person of people) {
            console.log(person);
        }
    });
database.find<Person>(new Client(configuration), query+' where first_name=$1', ["mohammad"])
    .then(people => {
        console.log("getting mohammad data")
        for(const person of people) {
            console.log(person);
        }
    });

const firstName = "firstName6";
const email = "email6";
let person = Person.create(firstName,'lastName', email);
const insert = database.getQuery(person);
database.save<Person>(new Client(configuration), insert, person)
    .then(person => {
        console.log(`Adding new person with id ${person.id}`);
    })
    .then(() => {
        database.find<Person>(new Client(configuration),
                database.getQuery(person) + ' where first_name=$1', [firstName])
            .then(people => {
                console.log('get person');
                for(const person of people) {
                    console.log(person);
                }
            });
    })
    .catch(e => console.log(e));
