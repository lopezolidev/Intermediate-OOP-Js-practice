const xavier = {
    name: "xavier",
    email: "xavierchill@internet.com",
    age: 25,
    approvedCourses: ["Course 1"],
    addNewCourse(newCourse){
        console.log(this)
        console.log(this.approvedCourses)
        this.approvedCourses.push(newCourse);
    }
}

//Using object methods from super prototype Object

// console.log(Object.keys(xavier)); //only the keys. Transforms into strings the keys of properties, attributes as methods
// 0: "name"
// 1: "email"
// 2: "age"
// 3: "approvedCourses"
// 4: "addNewCourse"

// console.log(Object.getOwnPropertyNames(xavier)); //almost the same as .keys method
// 0: "name"
// 1: "email"
// 2: "age"
// 3: "approvedCourses"
// 4: "addNewCourse"

// console.log(Object.entries(xavier)); //transforms the object into an array
// 0: (2) ['name', 'xavier']
// 1: (2) ['email', 'xavierchill@internet.com']
// 2: (2) ['age', 25]
// 3: (2) ['approvedCourses', Array(1)]
// 4: (2) ['addNewCourse', ƒ]

// console.log(Object.entries(xavier)[4][1]("Course 2")); 
// logic.js:7 Uncaught TypeError: Cannot read properties of undefined (reading 'push')
//     at Array.addNewCourse (logic.js:7:30)

//transforming the object and its methods to an array, "this" is no longer used because there's no longer its context of execution, meaning the object "xavier", now the "this" points to an array, so there's no form  to use "this" to refer to any object

// console.log(Object.getOwnPropertyDescriptors(xavier));
// addNewCourse: {writable: true,            //these are all access modifiers. Tells "who" can access 
                                            //and modify information on this member
            //    enumerable: true, 
            //    configurable: true, 
            //    value: ƒ}                   this is the value 

// age: {value: 25, writable: true, enumerable: true, configurable: true}
// approvedCourses: {value: Array(1), writable: true, enumerable: true, configurable: true}
// email:{value: 'xavierchill@internet.com', writable: true, enumerable: true, configurable: true}
// name: {value: 'xavier', writable: true, enumerable: true, configurable: true}

//as default, if this method is not used all these parameters are set to "true"
Object.defineProperty(xavier, "hoursStudied", { //this is how we define a new property to the object
    enumerable: true, //true: you can destructure and "iterate" it; false: you can't
    writable: true, //true: you can change the value; false: you cannot change the value
    configurable: true, //true: we can alter its value and delete de property; false: un-deleteable
    value: 36, //the value to they key we're defining
})

// console.log(Object.getOwnPropertyDescriptors(xavier));

// addNewCourse: {writable: true, enumerable: true, configurable: true, value: ƒ}

// age: {value: 25, writable: true, enumerable: true, configurable: true}

// approvedCourses: {value: Array(1), writable: true, enumerable: true, configurable: true}

// email: {value: 'xavierchill@internet.com', writable: true, enumerable: true, configurable: true}

// hoursStudied: {value: 36, writable: true, enumerable: true, configurable: true}

// name: {value: 'xavier', writable: true, enumerable: true, configurable: true}

// [[Prototype]]: Object

const jacky = {
    name: "jacky O",
    age: 23,
    mail: "jackyEOP@protonmail.com"
}

Object.defineProperty(jacky, "navigator", {
    value: "Chrome",
    writable: true,
    enumerable: true,
    configurable: true,
}) //property can be overwritten, enumerable and deleted

Object.defineProperty(jacky, "terminal", {
    value: "Unix",
    writable: false,  //property cannot be overwritten, but enumerable and configurable
    enumerable: true,
    configurable: true,
})

Object.defineProperty(jacky, "editor", {
    value: "VSCode",
    writable: true,
    enumerable: false, 
    //property can be overwritten and deleted but not enumerable, doesn't appear in Object.keys
    configurable: true,
})

Object.defineProperty(jacky, "computer", {
    value: "Machintosh",
    writable: true,
    enumerable: true,
    configurable: false, //property can be overwritten, enumerable, but cannot be deleted
})

Object.defineProperty(jacky, "language", {
    value: "Python",
    writable: false,
    enumerable: false,
    configurable: true,
}) //can be deleted, but cannot be overwritten nor enumerable

Object.defineProperty(jacky, "cloud_service", {
    value: "AWS",
    writable: true,
    enumerable: false,
    configurable: false,
}) //can be overwritten, cannot be enumerable nor deleted

Object.defineProperty(jacky, "ISP", {
    value: "Starklink",
    writable: false,
    enumerable: true,
    configurable: false,
}) //can be enumerable but cannot be overwritten nor deleted

Object.defineProperty(jacky, "tablet", {
    value: "Wacom",
    writable: false,
    enumerable: false,
    configurable: false,
}) //cannot be overwritten, enumerable nor configurable

console.log(Object.getOwnPropertyDescriptors(jacky));

//      Object.keys(jacky)
//      (7) ['name', 'age', 'mail', 'navigator', 'terminal', 'computer', 'ISP']
// Only appear those with "enumerable: true"

//      Object.getOwnPropertyNames(jacky)
//      (11) ['name', 'age', 'mail', 'navigator', 'terminal', 'editor', 'computer', 'language', 'cloud_service', 'ISP', 'tablet']
//this method ignores if "enumerable: true"

//      jacky.ISP = "CANTV"
//      'CANTV'
//      jacky.ISP
//      'Starklink'
//ISP has writable: false; terefore cannot be rewritten

//      jacky.navigator = "Firefox"
//      'Firefox'
//      jacky.navigator
//      'Firefox'
// "writable: true", can be changed

//      delete jacky.computer
//      false
//"configurable: false", hence is un-deletable

//      jacky.tablet = "Genius"
//      'Genius'
//      jacky.tablet
//      'Wacom'
//"writable: false"

//      delete jacky.tablet
//      false
// "configurable: false"



// Use of Object.seal

// Object.seal(jacky); //makes all properties configurable: false; i.e no property can't be deleted

// Object.freeze(jacky); //makes all properties unwritable nor undeletable

//Important NOTE: these methods also don't allow you to add new properties later on, so they're not capable to "unseal" or "unfreeze" them