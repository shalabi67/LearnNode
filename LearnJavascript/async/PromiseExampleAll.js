function getCourse(courseId) {
    if(courseId > 3) {
        return Promise.reject(Error(`Course with course id='${courseId}' does not exists.`));
    }

    var courses = {
        1: {name: "Introduction to Cobol"},
        2: {name: "Yet Another C# Course"},
        3: {name: "How to make billions by blogging"}
    }
    return Promise.resolve(courses[courseId]);
}

let courseIds = [1,3,2,7,4];
let promises = [];
for(let courseId of courseIds) {
    promises.push(getCourse(courseId));
}
let results = Promise.all(promises);
results.then(function(values) {
    for(course of values) {
        console.log(`Course name is ${course.name}`);
    }
}, function(errors) {
    console.log(errors);
});
