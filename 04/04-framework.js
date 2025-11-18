// let myInfo = {
//     name : "pouria",
//     family : "vahedi",
//     age : 18
// };
// let fs = require('fs');
import fs from 'fs'
let command = process.argv[2];
let inputs = process.argv.slice(3);

let Controllers = []

function start() {
    let found = false;
    for (let item of Controllers) {
        if (item.command === command) {
            item.func(inputs);
            found = true;
        }
    }

    if (!found) {
        console.log("no command!");
    }
}

function use(command , func) {
    let item = {
        command:command,
        func:func
    }

    Controllers.push(item);

    console.log(Controllers);
}

start();


function Write(text, x1, x2, x3) {
    let obj2 = {
        name: x1,
        family: x2,
        age: x3
    }

    let newObj = {}

    for (const key in obj2) {
        newObj[key] = text + " " + obj2[key];
    }

    return newObj;
}

export{
    use,start
}
