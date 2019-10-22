import {Client, ClientConfig} from 'pg';


let configuration: ClientConfig = {
    host: 'localhost',
    port: 54320,
    database: 'test',
    user: 'postgres',
    password: 'example'
}
const client = new Client(configuration);
async function main(client : Client) {
    console.log("main");
    try {
        await client.connect();
        console.log('connected.');

        const queryResult = await client.query(
            'SELECT id, first_name, last_name, email FROM person'
        );
        console.log(queryResult.rows);
        console.table(queryResult.rows);


        for (const row of queryResult.rows) {
            console.log(row.first_name);
        }
    } catch (e) {
        console.log(e)
    }

    await client.end();
}
main(client).catch((e) => {
    console.log(e)
});
