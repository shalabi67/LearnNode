CREATE TABLE person(
    id serial PRIMARY KEY,
    first_name VARCHAR (50) UNIQUE NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
);
insert into person(first_name, last_name, email) values('mohammad', 'shalabi', 'a@b.com');
select * from person;

