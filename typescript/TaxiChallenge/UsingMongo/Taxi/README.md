# Taxi
This project provides a rest point for Taxi unicorns

## Create project
- npm install -g express-generator-typescript
- npx express-generator-typescript Taxi
- npm i body-parser
- npm i -D @types/body-parser
- npm i mongoose
- npm i -D @types/mongoose
- npm i node-fetch

## Run project
copy provided files to a new folder and move to that folder.

### Run project
- npm install
- npm run build
- npm start
- url: http://localhost:8080

### Did not do
- Even though I provided integration tests, but i did not provide unit tests.
- The provided tests does not cover all scenarios, for example it did not check for the ready time of a returned unicorn.
- I just provided a health for unicorn end point but not for other endpoints.
- If the system went down and there are some unicorns in the rest, they will not be shown as rented. 
I did not fix that, but here are two way to fix it. when system start it checks for these and resolve this issue. 
or we can send the notification to message queue.

### notice
- I did not provide a docker-compose for mongo, since in the machine I implemented this i have no docker.
- I provided a set of extra apis to help you see the changes without the need to go to mongodb.
- I provided an API to initialize unicorns in mongodb.
- I provided a postman file to help you import these APIs.


