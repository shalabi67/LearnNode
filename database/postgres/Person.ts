import {DataModel} from "./DataModel";

export class Person extends DataModel{

    static create(first_name: string, last_name: string, email: string) {
        let person = new Person();
        person.first_name = first_name;
        person.last_name = last_name;
        person.email = email;

        return person;
    }


    constructor() {
        super();
        this.tableName = 'person';
        this.queryColumnsString = ' id, first_name, last_name, email, created_on, last_login ';
        this.insertColumnsString = ' first_name, last_name, email ';
        this.insertValuesString = ' $1, $2, $3 ';
    }

    id: number = 0;
    first_name: string = '';
    last_name: string = '';
    email: string = '';
    created_on: Date = new Date();
    last_login: Date = new Date();

    convert() : Array<any> {
        const data = new Array();
        //data.push(this.id);
        data.push(this.first_name);
        data.push(this.last_name);
        data.push(this.email);
        //data.push(this.created_on);
        //data.push(this.last_login);

        return data;
    }

    setId(row: any) {
        this.id = row[this.idName];
    }
}