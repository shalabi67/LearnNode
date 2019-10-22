import {Client} from "pg";

export async function find<T>(client : Client, query: string, values?:Array<any>):Promise<Array<T>> {
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