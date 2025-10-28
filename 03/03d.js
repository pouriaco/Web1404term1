// let myInfo = {
//     name : "pouria",
//     family : "vahedi",
//     age : 18
// };
let fs = require('fs');
const { json } = require('stream/consumers');

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

    case "write":
        let outputJson = Write("salam");
        let outputString = JSON.stringify(outputJson);
        fs.writeFile("./data.txt", outputString, (err) => {
            console.log(2);
            if (err) {
                console.log("file did not save!");
            }
            else {
                console.log("file saved!");
            }
        });
        console.log(3);

        break;
    case "read":

        fs.readFile("./data.txt", { encoding: "utf8" }, (err, body) => {
            if (err) {
                console.log("file did not save!");
            }
            else {
                console.log("file opened: ", body);
            }
        });

        break;

    case "append":
        let text = process.argv[3];
        fs.appendFile("./data.txt", text, (err) => {
            console.log(2);
            if (err) {
                console.log("file did not save!");
            }
            else {
                console.log("file saved!");
            }
        });
        break;

    case "createRecord":
        record = {
            name: inputs[0],
            email: inputs[1]
        }

        fs.readFile("./data.json", { encoding: "utf8" }, (err, body) => {
            if (err) {
                console.log("file did not save!");
            }
            else {
                body = JSON.parse(body);
                console.log("file opened: ", body);
                body.records.push(record);
                console.log("file Updated: ", body);
                body = JSON.stringify(body)


                fs.writeFile("./data.json", body, (err) => {
                    console.log(2);
                    if (err) {
                        console.log("file did not save!");
                    }
                    else {
                        console.log("file saved!");
                    }
                });
            }
        });
        break;

    case "updateRecord":
        searchName = inputs[0];
        record = {
            name: inputs[1],
            email: inputs[2]
        }

        fs.readFile("./data.json", { encoding: "utf8" }, (err, body) => {
            if (err) {
                console.log("file did not save!");
            }
            else {
                body = JSON.parse(body);
                console.log("file opened: ", body);
                // body.records.push(record);
                for (var i = 0; i < body.records.length; i++) {
                    if (body.records[i]["name"] == searchName) {
                        body.records[i] = record;
                    }
                }


                console.log("file Updated: ", body);
                body = JSON.stringify(body)
                fs.writeFile("./data.json", body, (err) => {
                    console.log(2);
                    if (err) {
                        console.log("file did not save!");
                    }
                    else {
                        console.log("file saved!");
                    }
                });
            }
        });
        break;

    case "deleteRecord":
        searchName = inputs[0];

        fs.readFile("./data.json", { encoding: "utf8" }, (err, body) => {
            if (err) {
                console.log("file did not save!");
            }
            else {
                body = JSON.parse(body);
                console.log("file opened: ", body);
                // body.records.push(record);
                for (var i = 0; i < body.records.length; i++) {
                    if (body.records[i]["name"] == searchName) {
                        body.records.splice(i, 1);
                    }
                }

                console.log(body.records);


                // console.log("file Updated: ", body);
                // body = JSON.stringify(body)
                // fs.writeFile("./data.json", body, (err) => {
                //     console.log(2);
                //     if (err) {
                //         console.log("file did not save!");
                //     }
                //     else {
                //         console.log("file saved!");
                //     }
                // });
            }
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
        newObj[key] = text + " " + obj2[key];
    }

    return newObj;
}
