import {Client} from "pg";
import {DataModel} from "./DataModel";

export class Database {
    static async find<T>(client : Client, query: string, values?:Array<any>):Promise<Array<T>> {
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

    static async save<T extends DataModel>(client : Client, statment: string, person:T) {
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
}