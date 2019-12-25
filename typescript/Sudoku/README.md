# Sudoku
This will provide an initial solution to solve sudoku. this is not test well, but it is a starting point.

## very important.
- please read Sudoku
- There are a set of TODO defined in the code and in the code changes section. 
These are easy for me to do, I did not do them because it is out of the scope of the challenge.
- I just implemented the strategies enough to solve the challenge. 
Other strategies can be added to the system to solve to solve more sudoku problems or boards.

## Run Project
- npm install
- npm start

## Project setup
- npm init
- npm install @types/node --save-dev
- npm install -D typescript
- npm install -D tslint
- ./node_modules/.bin/tslint --init
- npm i -D chai mocha nyc
- npm i -D @types/chai @types/mocha
- npm install -D ts-node

## What I did not do
- This does not solve sudoku, it just solve the provided challenge. it is not suppose to solve other challenges.
- Writing unit tests. even though I just right simple one to show the possibility. if this is important I can do them.
- Not enough testing. I just tried it on the challenge board, may there are something not working or hidden bugs.
- This is not a production solution. it just to show the possibility.
- Factories to create needed boards, but this can be easy added to the solution.
- There are a set of today identified in the code that i did not do.

## Architecture Document
please read the provided architecture document, it will answer challenge questions. 
The document can be found under tha name SudokuArcvhitecture.docx

## Using with other boards
### Overview
This system can be easily used and extend to support other sudo boards. this can be done simply by providing more strategy and unit components. 
A new board class also must be provided. 

### Code changes
The exiting code have few limitation which limited its extensibility. These limitation had been i defined in the code as TODO comments. here are some of these changes:
- execute method callbacks or lambda function of the unit class had been used as (i: number, j: number, cell: Cell) => {} lambdas. 
this usage should be changes to be PositionalCell which provide the ability to be used with strategies related to 
- DefaultComponent need to be changed by providing an addUnit method. and its need to be changes to CompositeUnit. 
doing so will help both board and strategies to have dynamic units based on the exited defined units. 
- Board method setValue(row: number, column: number, value: string) need to be changed to setValue(cell: PositionalCell).
- Unit method findHiddenSingle() should be moved to Strategy component.
- Builder factory pattern or other factory patterns need to be used to be able to build boards. this will depend on the board complexity.


