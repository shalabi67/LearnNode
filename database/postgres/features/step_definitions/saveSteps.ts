
import {Given, When, Then} from 'cucumber'
import {Database} from "../../Database";
import {Person} from "../../Person";
import {Client, ClientConfig} from "pg";
import {expect} from "chai";

let database = new Database<Person>();
const person = new Person();
const deleteAllPersons = database.getDeleteAll(person);
let configuration: ClientConfig = {
    host: 'localhost',
    port: 54320,
    database: 'test',
    user: 'postgres',
    password: 'example'
}
const client = new Client(configuration);
const query = database.getQuery(person);

Given(/^database is created\.$/, function () {

});
Given(/^table person is empty$/, function (done) {
    database.delete(new Client(configuration), deleteAllPersons)
        .then(() => done())
        .catch(e => {
            expect('').eq('a');
            done();
        })
});
When(/^user provides person data (.*), (.*), (.*)$/, function () {

});
Then(/^a person will be created with new id\.$/, function () {

});
