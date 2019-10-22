#shows how to use postgres with typescript
http://zetcode.com/javascript/nodepostgres/
https://github.com/malthe/ts-postgres

##start database
- sudo docker-compose -f database.yaml up
- jdbc:postgresql://localhost:54320/test
- sudo docker-compose -f database.yaml down --remove-orphans
- http://localhost:8080/?pgsql=db&username=postgres&db=postgres&ns=public

##setup
- sudo apt install npm
- npm install --save-dev typescript
- npm init -y
- tsc --init
- npm install --save pg @types/pg
- npm i --save-dev @types/node
- npm install --save-dev ts-postgres

