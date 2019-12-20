# Lindera
This project provides a rest point for lindera patients

## Create project
- npm install -g express-generator-typescript
- npx express-generator-typescript "Lindera"
- npm i body-parser
- npm i -D @types/body-parser
- npm i mongoose
- npm i -D @types/mongoose

## Assumptions
- I am assuming names are just names with english characters and no international names are needed.
- CRUD operations is not clear here, I assumed it is enough to implement PATCH and no need to implement UPDATE.
- I did not implement a complete DAO mocks, even though these mocks can be much better if they mock the exact functionality of mongoose. I did not do it since i assumed it is out of scope.

## What I implemented extra
- Even though I did not do an integration test, but my unit test can run as integration test. you need just to do few changes to exiting code, then you can run test as unit test and as integration tests.
- Needed changes are a change on PatientDao.createForTest to depends on environmental variable which identify integration or unit test. the second is to change mocks to mock mongoose behaviour.
- Even though requirements did not mention any validation but I provided validation for empty string, strings with spaces, and names has only valid characters. 
- I provided a trim on names to remove spaces from front and end.
- I forced the rule of same first name, last name, and birthday record is unique. 
- I provided the functionality to find patients based on firstName, last name or birthday.
- I provided a postman collection under the file: Lindera.postman_collection.json 

## Run project
copy provided files to a new folder and move to that folder.
### Run mongo optional
- mongod -f mongoConf.yaml

### Run project
- npm install
- npm run build
- npm start
- url: http://localhost:8080/patients


### notice
- I did not check postman exported file.
- I did not provide a docker-compose for mongo, since in the machine I implemented this i have no docker.


