import {Client, ClientConfig} from 'pg';


let configuration: ClientConfig = {
    host: 'localhost',
    port: 54320,
    database: 'test',
    user: 'postgres',
    password: 'example'
}
const client = new Client(configuration);
const query = 'SELECT id, first_name, last_name, email FROM person';
async function main(client : Client, query: string, values?:Array<any>) {
    console.log("main");
    try {
        await client.connect();
        console.log('connected.');

        const queryResult = await client.query(query, values);
        console.log(queryResult.rows);
        console.table(queryResult.rows); //will not display anything, but it will be used in debugger


        for (const row of queryResult.rows) {
            console.log(row.first_name);
        }
    } catch (e) {
        console.error(e);
    }

    await client.end();
}

main(client, query);
main(new Client(configuration), query+' where first_name=$1', ["mohammad"]);
