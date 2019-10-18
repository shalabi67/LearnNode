#Example on how to run cucumber with type script


##setup
- npm install typescript
- npm init -y
- tsc --init
- change tsconfig.json file to pint to "target": "es2017"
- npm install --save-dev cucumber chai mocha @types/cucumber @types/chai @types/mocha
###windows
- on package.json file chage test to be "test": "tsc && node node_modules\\cucumber\\bin\\cucumber-js featuers/"
###mac
- on package.json file chage test to be "test": "tsc && node node_modules/cucumber/bin/cucumber-js featuers/"


##Report 
- npm install simple-cucumber-html-reporter --save-dev


##Run
-- tsc
-- npm test
