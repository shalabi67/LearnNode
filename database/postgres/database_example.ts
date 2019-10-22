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
const client = new Client(configuration);
const query = new Person().getQuery();

Database.find(client, query)
    .then(people => {
        console.log('getting all people');
        for(const person of people) {
            console.log(person);
        }
    });
Database.find<Person>(new Client(configuration), query+' where first_name=$1', ["mohammad"])
    .then(people => {
        console.log("getting mohammad data")
        for(const person of people) {
            console.log(person);
        }
    });

const firstName = "firstName5";
const email = "email5";
let person = Person.create(firstName,'lastName', email);
const insert = person.getInsert();
Database.save<Person>(new Client(configuration), insert, person)
    .then(() => {
        console.log('Adding new person');
    })
    .then(() => {
        Database.find<Person>(new Client(configuration),
            person.getQuery() + ' where first_name=$1', [firstName])
            .then(people => {
                console.log('get person');
                for(const person of people) {
                    console.log(person);
                }
            });
    })
    .catch(e => console.log(e));
