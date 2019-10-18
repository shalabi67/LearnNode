function getOrder(orderId) {
    return Promise.resolve({userId:35});
}

function getUser(userId) {
    return Promise.resolve({companyId:18});
}

function getCompany(companyId) {
    return Promise.resolve({name:'Pluralsight'});
}

getOrder(3).then(function(order) {
    return getUser(order.userId);
}).then(function(user) {
    return getCompany(user.companyId)
}).then(function(company){
    console.log(`Company is ${company.name}`);
});