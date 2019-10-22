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
const query = 'SELECT id, first_name, last_name, email, created_on FROM person';
async function find<T>(client : Client, query: string, values?:Array<any>):Promise<Array<T>> {
    //console.log("getData");
    let data: Array<T> = new Array<T>();
    try {
        await client.connect();
        //console.log('connected.');

        const queryResult = await client.query(query, values);
        //console.log(queryResult.rows);
        console.table(queryResult.rows); //will not display anything, but it will be used in debugger

        for (const row of queryResult.rows) {
            let person: T = row;
            data.push(person);
            //console.log(row.first_name);
        }
    } catch (e) {
        console.error(e);
    }

    await client.end();

    return data;
}


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
