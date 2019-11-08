var expect = require('expect')

it("Passing test", function () {
  expect(true).toBe(true);
});

it("Throw, expected", function () {

  expect(function () {

    throw new Error("oh noes")

  }).toThrow("oh noes")

});

it("Synchronous throw, uncaught", function () {

  throw new Error("oh noes")

});

it("Async throw, uncaught", function (done) {

  setTimeout(function () {

    throw new Error("oh noes")

  }, 1)

});


it("Synchronous assert, is an uncaught error", function () {

  expect(true).toBe(false);

});

it("Async assert, is an uncaught error too!", function (done) {

  setTimeout(function () {

    expect(true).toBe(false);

  }, 1)

});



