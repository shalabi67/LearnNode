import {Client, ClientConfig} from 'pg';
import {Person} from "./Person";


let configuration: ClientConfig = {
    host: 'localhost',
    port: 54320,
    database: 'test',
    user: 'postgres',
    password: 'example'
}
const client = new Client(configuration);
const query = 'SELECT id, first_name, last_name, email FROM person';
async function getData(client : Client, query: string, values?:Array<any>):Promise<Array<Person>> {
    console.log("getData");
    let data: Array<Person> = new Array<Person>();
    try {
        await client.connect();
        console.log('connected.');

        const queryResult = await client.query(query, values);
        console.log(queryResult.rows);
        console.table(queryResult.rows); //will not display anything, but it will be used in debugger

        for (const row of queryResult.rows) {
            let person: Person = row;
            data.push(person);
            console.log(row.first_name);
        }
    } catch (e) {
        console.error(e);
    }

    await client.end();

    return data;
}

getData(client, query);
getData(new Client(configuration), query+' where first_name=$1', ["mohammad"]);
