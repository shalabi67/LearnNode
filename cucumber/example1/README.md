#Example on how to run cucumber with type script


##setup
- npm install typescript
- npm init -y
- tsc --init
- change tsconfig.json file to pint to "target": "es2017"
- npm install --save-dev cucumber chai mocha @types/cucumber @types/chai @types/mocha
- npm install --save-dev cucumber-tsflow
- change package.json cucumber version to 5.1.0
###windows
- on package.json file chage test to be "test": "tsc && node node_modules\\cucumber\\bin\\cucumber-js --format json:./report/example1.json features/"
###mac
- on package.json file chage test to be "test": "tsc && node node_modules\cucumber\bin\cucumber-js --format json:./report/example1.json features/"


##Report 
- mkdir report
### simple html report
- npm install simple-cucumber-html-reporter --save-dev
- node test\report

### html report
- npm install cucumber-html-reporter --save-dev
- node 

##Run
-- tsc
-- npm test
