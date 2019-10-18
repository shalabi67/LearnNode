let invoice = {
    number: 123,
    process: function() {
        console.log(this);
    }
}
invoice.process();

let invoiceArrow = {
    number: 123,
    process: () => console.log(this)
}
invoiceArrow.process();


let invoiceComplex = {
    number: 123,
    process: function() {
        return () =>console.log(this);
    }
}
invoiceComplex.process()();