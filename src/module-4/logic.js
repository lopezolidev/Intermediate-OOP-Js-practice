function isObject(subject) {
    return typeof subject == 'object';
}
function isArray(subject) {
    return Array.isArray(subject);
}

function deepCopy(subject){
    let copySubject;

    const subjectIsObject = isObject(subject);
    const subjectIsArray = isArray(subject);

    if (subjectIsObject){
        copySubject = {};
    } else if (subjectIsArray){
        copySubject = [];
    } else {
        return subject;
    }

    for (key in subject){
        const keyIsObject = isObject(subject[key]);

        if (keyIsObject){
            copySubject[key] = deepCopy(subject[key]);
        } else {
            if (subjectIsArray) {
                copySubject.push(subject[key])
            } else {
                copySubject[key] = subject[key];
            }
        }
    }

    return copySubject;
}

const studentBase = {       //creating an object as a "proto" or class. Its the mold
    name: undefined,
    // email: undefined,
    age: undefined,
    approvedCourses: undefined,
    learningPaths: undefined,
    socials: {
        twitter: undefined,
        instagram: undefined,
        facebook: undefined,
    }
}

const xavier = deepCopy(studentBase); //deepcopying the mold to another object with recursion
Object.seal(xavier);     //encapsulating all the properties from cloned object = configurable: false
//the same as ↓
// Object.defineProperty(xavier, 'name', {
//     configurable: false,
// })

// How to create objects with a non-recursive function, without using classes nor prototypes

function paramError(param){
    throw new Error(param + " it's a mandatory parameter"); 
    //this function throws an error in the console
}

function roroStudent({ //RORO stands for: Recieve an Object - Return an Object

    //default parameters are a form to set a value for an argument when this is undefined
    name = paramError("name"), //setting as a default parameter an error from paramError
    email = paramError("email"),
    age,
    approvedCourses = [], //empty array as a default param for approvedCourses
    learningPaths = [],
    twitter,
    facebook,
    instagram
} = {}) //if no Object is Recieved, the default parameter is another Object
{
    const private = {
        "_name": name //this is a convention to set as "private" a property inside the object
    }
    const public = {
        // changeName(newName){ //this is like a setter. It "sets" the new name
        //     private["_name"] = newName;
        //     // Object.defineProperty(this, 'name', {
        //     //     writable: false,
        //     // }) //this was made to not alter the "name" property later in the future
        // },
        // readName(){
        //     return private["_name"]; //this is like a getter. private["_name"] = private._name
        // },
        get name(){
            return private["_name"];
        },
        set name(newName){
            if(newName.length != 0){
                private["_name"] = newName;
            }else{
                console.warn("Your new name must be at least of 1 character");
            }
        },
        email,
        age,
        approvedCourses,
        learningPaths,
        socialMedia: {
            twitter,
            facebook,
            instagram,
        }
    };
    
    // Object.defineProperty(public, 'changeName', {
    //     writable: false,
    //     configurable: false,
    // });
    
    // Object.defineProperty(public, 'readName', {
    //     writable: false,
    //     configurable: false,
    // })

    return public //Returning a Object. Only setting the names of properties Recieved as an Object
}

// const jacky = roroStudent({
//     name: 'Jacky',
// })
// Uncaught Error: email it's a mandatory parameter

// const jordi = roroStudent({
//     email: 'jlov@jordi.com'
// })
// Uncaught Error: name it's a mandatory parameter

const jacky = roroStudent({
    name: 'jacky',
    email: 'jackyo@jacky.com'
})

// Object.getOwnPropertyDescriptors(jacky)
    // name:        
    // configurable: true
    // enumerable: true
    // get: ƒ name()       
    // set: ƒ name(newName)

     //getters and setters "fake" properties. "name" is not part of public, but through getters and setters we can sort of access to name