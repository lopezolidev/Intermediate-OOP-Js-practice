// We'll see how objects are handled in memory in JS

const obj1 = {
    a: 'a',
    b: 'b',
    c: {
        d: 'd',
        e: 'e',
    },
    editA() {
        this.a = "AAAAAAA";
    }
}

const obj2 = obj1; //this creates refference to obj1

const obj3 = {};
for (prop in obj1) { //copying manually each property of obj1 into obj3, this is a shallow copy
    obj3[prop] = obj1[prop]
}
// obj1.c.d = 'DDDDDD'
// 'DDDDDD'
// obj1 {a: 'a', b: 'b', c: {…}}
// a: "a"
// b: "b"
// c: {d: 'DDDDDD', e: 'e'}
// [[Prototype]]: Object
// obj3 {a: 'a', b: 'b', c: {…}}
// a: "a"
// b: "b"
// c: {d: 'DDDDDD', e: 'e'}

const obj4 = Object.assign({}, obj1);

// obj1.c.d = 'DDDDDD'
// 'DDDDDD'
// obj4
// {a: 'a', b: 'b', c: {…}}
// a: "a"
// b: "b"
// c: {d: 'DDDDDD', e: 'e'}

const obj5 = Object.create(obj1); //"proto" = obj1

// obj5 = {}
// [[Prototype]]: Object
// a: "a"
// b: "b"
// c: {d: 'd', e: 'e'}

// obj5.c.d = 'DDDDD' //altering properties from "child" will affect properties from proto (obj1)
// 'DDDDD'
// obj1
// {a: 'a', b: 'b', c: {…}}
// a: "a"
// b: "b"
// c: {d: 'DDDDD', e: 'e'} //alteration from obj1
// [[Prototype]]: Object
// obj5
// {}
// [[Prototype]]: Object
// a: "a"
// b: "b"
// c: {d: 'DDDDD', e: 'e'}


// obj1.b = 'BBBBBBBBBB'
// 'BBBBBBBBBB'
// obj1
// {a: 'a', b: 'BBBBBBBBBB', c: {…}} //property 'b' will be inherited as part of proto

// obj5.a = 'AAAAAAAAAA'
// 'AAAAAAAAAA'
// obj5
// {a: 'AAAAAAAAAA'}        //property 'a' was overwritten, which was inherited by proto
// a: "AAAAAAAAAA"
// [[Prototype]]: Object
// a: "a"                   //original property 'a'
// b: "BBBBBBBBBB" 
// c: {d: 'd', e: 'e'}

// Using JSON.stringify and JSON.parse

const objeto = {
    a: 'a',
    b: 'b',
    c: {
        d: 'd',
        e: 'e',
    },
    editA() {
        this.a = "abdc";
    }
}

const stringifiedComplexObject = JSON.stringify(objeto);

// stringifiedComplexObject
// '{"a":"a","b":"b","c":{"d":"d","e":"e"}}'

const parsedStringifiedCompObj = JSON.parse(stringifiedComplexObject); 
// parsedStringifiedCompObj
// {a: 'a', b: 'b', c: {…}}
// a: "a"
// b: "b"
// c: {d: 'd', e: 'e'}

//this two JSON methods don't recognize methods inside objects, therefore you can lose types of data, isn't efficient, Date is parsed as string and not as Date and turn some unsuported data types in suported like infinity and NaN in null, etc 

// Testing Recursion //

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
