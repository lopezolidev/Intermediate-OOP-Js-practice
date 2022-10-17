function isObject(subject) {
    return typeof subject == 'object';
}
function isArray(subject) {
    if (Array.isArray(subject)){
        if(subject instanceof Array){
            return true;
        }
    }
    else {
        return false;
    }
    // return Array.isArray(subject);
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

const studentBase = {      
    name: undefined,
    email: undefined,
    age: undefined,
    approvedCourses: undefined,
    learningPaths: undefined,
    socials: {
        twitter: undefined,
        instagram: undefined,
        facebook: undefined,
    }
}

const xavier = deepCopy(studentBase);
Object.seal(xavier);     

function paramError(param){
    throw new Error(param + " it's a mandatory parameter"); 
}

// function createLearningPath({
//     name = paramError(name),
//     courses = [],
// }){
//     const private = {
//         "_name": name,
//         "_courses": courses,
//     }

//     const public = {
//         get name(){
//             return private["_name"];
//         },
//         set name(newName){
//             if(newName.length != 0){
//                 private["_name"] = newName;
//             }else{
//                 console.warn("Your new name must be at least of 1 character");
//             }
//         },
//         get courses(){ //a student can only check its courses but not "set" new courses
//             return private["_courses"];
//         },
//     }
//     return public;
// }

function LearningPath({  //now this is a prototype
    name = paramError(name),
    courses = [],
}){
    this.name = name;
    this.courses = courses;
}

// function roroStudent({
//     name = paramError("name"), 
//     email = paramError("email"),
//     age,
//     approvedCourses = [], 
//     learningPaths = [],
//     twitter,
//     facebook,
//     instagram
// } = {}) 
// {
//     const private = {
//         "_name": name, 
//         "_learningPaths": learningPaths,
//     }
//     const public = {

//         get name(){
//             return private["_name"];
//         },
//         set name(newName){
//             if(newName.length != 0){
//                 private["_name"] = newName;
//             }else{
//                 console.warn("Your new name must be at least of 1 character");
//             }
//         },
//         get learningPaths(){
//             return private["_learningPaths"];
//         },
//         set learningPaths(newLP){  //Applying duck typing to check over the properties of the new Learning path
//             if(!newLP.name){
//                 console.warn("Your new LP must have property name");
//                 return;
//             }
//             if(!newLP.courses){
//                 console.warn("Your new LP doesn't have any courses");
//                 return;
//             } if(!isArray(newLP.courses)){
//                 console.warn("Your LP must be a list (of courses)");
//                 return;
//             }
//             private["_learningPaths"].push(newLP);
//         },
//         email,
//         age,
//         approvedCourses,
//         socialMedia: {
//             twitter,
//             facebook,
//             instagram,
//         }
//     };

//     return public 
// }

function Student({ //prototype of student
    name = paramError("name"), 
    email = paramError("email"),
    age,
    approvedCourses = [], 
    learningPaths = [],
    twitter,
    facebook,
    instagram
} = {}) 
{
    this.name = name;
    this.email = email;
    this.age = age;
    this.approvedCourses = approvedCourses;
    this.socialMedia = {
        twitter,
        instagram,
        facebook,
    }
    const private = {
        "_learningPaths": [],
    }

    Object.defineProperty(this, "learningPaths", {
        get(){
            return private["_learningPaths"];
        },
        set(newLP){
            if (newLP instanceof LearningPath){
                private["_learningPaths"].push(newLP);
            } else {
                console.warn("The new LP is not an instance of LearningPath")
            }
        },
    })

    for (learningPath of learningPaths) {
        this.learningPaths = learningPath;
      }
}

class Student2 {
    approvedCourses = []; 
    #learningPaths = [];

    constructor(name, email){
        this.name = name;
        this.email = email;
    }

    set showlearningPaths(newLP){
        if (newLP instanceof LearningPath){
            this.#learningPaths.push(newLP);
        } else {
            console.warn("The new LP is not an instance of LearningPath")
        }
    }
    get showlearningPaths(){
        return this.#learningPaths;
    }

    #identifier(){
        return `${this.name} ${this.email}`;
    }

    get showidentity(){ 
        //private method insde class Student2. We can only access this code from "outside" class. Meaning we need a public method that calls this private getter
        return this.#identifier();
    }

}

const joe = new Student2(
    "joe",
    "joe@joejoeson.com"
);
console.log(joe.showlearningPaths = new LearningPath({
    name: "Data Science school",
    courses: [],
}))
console.log(joe.showlearningPaths);
console.log(joe.showidentity)

const jacky = new Student({
    name: 'jacky',
    email: 'jackyo@jacky.com'
})

const escuelaWeb = new LearningPath({name:"Escuela de WebDev"}); //instancing a learning path from prototype LearningPath
const escuelaData = new LearningPath({name:"Escuela de Data Science"}); //we still can't add new courses to each learning path

//instanceof utility
// escuelaData instanceof LearningPath
// true
// const escuelaIMPOSTOR = {
//     name: "Escuela impostor",
//     courses: [],
// }

// escuelaIMPOSTOR instanceof LearningPath
// false


const chalo = new Student({
    name: 'Rosauro',
    email: 'rosaurito@ro.com',
    learningPaths: [
        escuelaData,
        escuelaWeb,
    ]
})

// chalo
// Student {name: 'Rosauro', email: 'rosaurito@ro.com', age: undefined, approvedCourses: Array(0), learningPaths: Array(2), …}
// age: undefined
// approvedCourses: []
// email: "rosaurito@ro.com"
// learningPaths: Array(2)
// 0: LearningPath
// courses: []
// name: "Escuela de Data Science"
// [[Prototype]]: Object
// 1: LearningPath
// courses: []
// name: "Escuela de WebDev"
// [[Prototype]]: Object
// length: 2
// [[Prototype]]: Array(0)
// name: "Rosauro"
// socialMedia: {twitter: undefined, instagram: undefined, facebook: undefined}
// [[Prototype]]: Object

// Creating static methods (methods only accessible through our prototype itself)

function SuperObject(){};
SuperObject.deepCopy = function(subject){
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
SuperObject.isArray = function(subject) {
    if (Array.isArray(subject)){
        if(subject instanceof Array){
            return true;
        }
    }
    else {
        return false;
    }
}

//this syntax is the same as using "static" word inside a class

const juan = new SuperObject(); //initializing "juan" as an object from SuperObject prototype

console.log(SuperObject.isArray("17"));
//false

console.log(SuperObject.deepCopy({
    a: "a",
    private b: "b",
    c: {
        d: "e",
        e:"e",
    }
}))
// {a: 'a', b: 'b', c: {…}}
// a: "a"
// b: "b"
// c: {d: 'e', e: 'e'}

