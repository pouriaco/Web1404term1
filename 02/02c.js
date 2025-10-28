// let myInfo = {
//     name : "pouria",
//     family : "vahedi",
//     age : 18
// };
let fs = require('fs');

let inputs = process.argv.slice(3);
let command = process.argv[2];

switch (command) {
    case "sum":
        console.log(Number(nums[0]) + Number(nums[1]));
        break;

    case "minus":
        console.log(Number(nums[0]) - Number(nums[1]));
        break;

    case "info":
        let myInfo = {
            name: inputs[0],
            family: inputs[1],
            age: inputs[2]
        }

        console.log("my information is : ", myInfo);
        break;

    case "print":
        let obj = {
            name: inputs[0],
            family: inputs[1],
            age: inputs[2]
        }

        // console.log("my information is : " , myInfo);
        for (const key in obj) {
            console.log("Salam ", obj[key]);
        }
        break;

    case "print4":
        
        // console.log(Write("salam"));
        let outputJson=Write("salam");
        let outputString= JSON.stringify(outputJson);
        fs.writeFile("./data.txt" , outputString , ()=>{
            console.log("file saved!");
        });

        break;

    default:
        console.log("what are you talking about?")
        break;
}

function Write(text) {
    let obj2 = {
        name: inputs[0],
        family: inputs[1],
        age: inputs[2]
    }

    let newObj = {}

    for (const key in obj2) {
        newObj[key] = text +" " +obj2[key];
    }

    return newObj;
}
