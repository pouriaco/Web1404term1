// let myInfo = {
//     name : "pouria",
//     family : "vahedi",
//     age : 18
// };
import fs from 'fs'
// let fs = require('fs');
let command = process.argv[2];
let inputs = process.argv.slice(3);

function Router() {
    // console.log(command);
    let found = false;
    for (let item of Controllers) {
        if (item.prompt === command) {
            item.func(inputs);
            found = true;
        }
    }

    if (!found) {
        console.log("no command!");
    }
}

let Controllers = [
    {
        prompt: "sum",
        func: function (x) {
            console.log(Number(x[0]) + Number(x[1]));
        }
    },
    {
        prompt: "minus",
        func: function (x) {
            console.log(Number(x[0]) - Number(x[1]));
        }
    },
    {
        prompt: "info",
        func: function (x) {
            let myInfo = {
                name: x[0],
                family: x[1],
                age: x[2]
            }

            console.log("my information is : ", myInfo);
        }
    },
    {
        prompt: "print",
        func: function (x) {
            let obj = {
                name: x[0],
                family: x[1],
                age: x[2]
            }

            // console.log("my information is : " , myInfo);
            for (const key in obj) {
                console.log("Salam ", obj[key]);
            }
        }
    },
    {
        prompt: "write",
        func: function (x) {
            let outputJson = Write("salam", x[0], x[1], x[2]);
            let outputString = JSON.stringify(outputJson);
            fs.writeFile("./data.txt", outputString, (err) => {
                if (err) {
                    console.log("file did not save!");
                }
                else {
                    console.log("file saved!");
                }
            });
        }
    },
    {
        prompt: "read",
        func: function (x) {
            fs.readFile("./data.txt", { encoding: "utf8" }, (err, body) => {
                if (err) {
                    console.log("file did not save!");
                }
                else {
                    console.log("file opened: ", body);
                }
            });
        }
    },
    {
        prompt: "append",
        func: function (x) {
            let text = x[0];
            fs.appendFile("./data.txt", text, (err) => {
                console.log(2);
                if (err) {
                    console.log("file did not save!");
                }
                else {
                    console.log("file saved!");
                }
            });
        }
    },
    {
        prompt: "createRecord",
        func: function (x) {
            let record = {
                name: x[0],
                email: x[1]
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
        }
    },
    {
        prompt: "updateRecord",
        func: function (x) {
            searchName = x[0];
            record = {
                name: x[1],
                email: x[2]
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
        }
    },
    {
        prompt: "deleteRecord",
        func: function (x) {
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
        }
    }

]

Router();

// switch (command) {
//     case "sum":
//         console.log(Number(nums[0]) + Number(nums[1]));
//         break;

//     case "minus":
//         console.log(Number(nums[0]) - Number(nums[1]));
//         break;

//     case "info":
//         let myInfo = {
//             name: inputs[0],
//             family: inputs[1],
//             age: inputs[2]
//         }

//         console.log("my information is : ", myInfo);
//         break;

//     case "print":
//         let obj = {
//             name: inputs[0],
//             family: inputs[1],
//             age: inputs[2]
//         }

//         // console.log("my information is : " , myInfo);
//         for (const key in obj) {
//             console.log("Salam ", obj[key]);
//         }
//         break;

//     case "write":
//         let outputJson = Write("salam");
//         let outputString = JSON.stringify(outputJson);
//         fs.writeFile("./data.txt", outputString, (err) => {
//             console.log(2);
//             if (err) {
//                 console.log("file did not save!");
//             }
//             else {
//                 console.log("file saved!");
//             }
//         });
//         console.log(3);

//         break;
//     case "read":

//         fs.readFile("./data.txt", { encoding: "utf8" }, (err, body) => {
//             if (err) {
//                 console.log("file did not save!");
//             }
//             else {
//                 console.log("file opened: ", body);
//             }
//         });

//         break;

//     case "append":
//         let text = process.argv[3];
//         fs.appendFile("./data.txt", text, (err) => {
//             console.log(2);
//             if (err) {
//                 console.log("file did not save!");
//             }
//             else {
//                 console.log("file saved!");
//             }
//         });
//         break;

//     case "createRecord":
//         record = {
//             name: inputs[0],
//             email: inputs[1]
//         }

//         fs.readFile("./data.json", { encoding: "utf8" }, (err, body) => {
//             if (err) {
//                 console.log("file did not save!");
//             }
//             else {
//                 body = JSON.parse(body);
//                 console.log("file opened: ", body);
//                 body.records.push(record);
//                 console.log("file Updated: ", body);
//                 body = JSON.stringify(body)


//                 fs.writeFile("./data.json", body, (err) => {
//                     console.log(2);
//                     if (err) {
//                         console.log("file did not save!");
//                     }
//                     else {
//                         console.log("file saved!");
//                     }
//                 });
//             }
//         });
//         break;

//     case "updateRecord":
//         searchName = inputs[0];
//         record = {
//             name: inputs[1],
//             email: inputs[2]
//         }

//         fs.readFile("./data.json", { encoding: "utf8" }, (err, body) => {
//             if (err) {
//                 console.log("file did not save!");
//             }
//             else {
//                 body = JSON.parse(body);
//                 console.log("file opened: ", body);
//                 // body.records.push(record);
//                 for (var i = 0; i < body.records.length; i++) {
//                     if (body.records[i]["name"] == searchName) {
//                         body.records[i] = record;
//                     }
//                 }


//                 console.log("file Updated: ", body);
//                 body = JSON.stringify(body)
//                 fs.writeFile("./data.json", body, (err) => {
//                     console.log(2);
//                     if (err) {
//                         console.log("file did not save!");
//                     }
//                     else {
//                         console.log("file saved!");
//                     }
//                 });
//             }
//         });
//         break;

//     case "deleteRecord":
//         searchName = inputs[0];

//         fs.readFile("./data.json", { encoding: "utf8" }, (err, body) => {
//             if (err) {
//                 console.log("file did not save!");
//             }
//             else {
//                 body = JSON.parse(body);
//                 console.log("file opened: ", body);
//                 // body.records.push(record);
//                 for (var i = 0; i < body.records.length; i++) {
//                     if (body.records[i]["name"] == searchName) {
//                         body.records.splice(i, 1);
//                     }
//                 }

//                 console.log(body.records);


//                 // console.log("file Updated: ", body);
//                 // body = JSON.stringify(body)
//                 // fs.writeFile("./data.json", body, (err) => {
//                 //     console.log(2);
//                 //     if (err) {
//                 //         console.log("file did not save!");
//                 //     }
//                 //     else {
//                 //         console.log("file saved!");
//                 //     }
//                 // });
//             }
//         });
//         break;

//     default:
//         console.log("what are you talking about?")
//         break;
// }

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
