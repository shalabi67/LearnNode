CREATE TABLE person(
    id serial PRIMARY KEY,
    first_name VARCHAR (50) UNIQUE NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);
insert into person(first_name, last_name, email) values('mohammad', 'shalabi', 'a@b.com');
insert into person(first_name, last_name, email) values('mohammad1', 'shalabi1', 'a1@b.com');
insert into person(first_name, last_name, email) values('mohammad2', 'shalabi2', 'a2@b.com');
insert into person(first_name, last_name, email) values('mohammad3', 'shalabi2', 'a3@b.com');
select * from person;

