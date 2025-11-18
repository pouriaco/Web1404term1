import { use, start } from "./04-framework.js"
import fs from 'fs'

use("sum", function (x) {
    console.log(Number(x[0]) + Number(x[1]));
})

use("minus", function (x) {
    console.log(Number(x[0]) - Number(x[1]));
})


start();

// let Controllers = [
//     {
//         prompt: "sum",
//         func: function (x) {
//             console.log(Number(x[0]) + Number(x[1]));
//         }
//     },
//     {
//         prompt: "minus",
//         func: function (x) {
//             console.log(Number(x[0]) - Number(x[1]));
//         }
//     },
//     {
//         prompt: "info",
//         func: function (x) {
//             let myInfo = {
//                 name: x[0],
//                 family: x[1],
//                 age: x[2]
//             }

//             console.log("my information is : ", myInfo);
//         }
//     },
//     {
//         prompt: "print",
//         func: function (x) {
//             let obj = {
//                 name: x[0],
//                 family: x[1],
//                 age: x[2]
//             }

//             // console.log("my information is : " , myInfo);
//             for (const key in obj) {
//                 console.log("Salam ", obj[key]);
//             }
//         }
//     },
//     {
//         prompt: "write",
//         func: function (x) {
//             let outputJson = Write("salam", x[0], x[1], x[2]);
//             let outputString = JSON.stringify(outputJson);
//             fs.writeFile("./data.txt", outputString, (err) => {
//                 if (err) {
//                     console.log("file did not save!");
//                 }
//                 else {
//                     console.log("file saved!");
//                 }
//             });
//         }
//     },
//     {
//         prompt: "read",
//         func: function (x) {
//             fs.readFile("./data.txt", { encoding: "utf8" }, (err, body) => {
//                 if (err) {
//                     console.log("file did not save!");
//                 }
//                 else {
//                     console.log("file opened: ", body);
//                 }
//             });
//         }
//     },
//     {
//         prompt: "append",
//         func: function (x) {
//             let text = x[0];
//             fs.appendFile("./data.txt", text, (err) => {
//                 console.log(2);
//                 if (err) {
//                     console.log("file did not save!");
//                 }
//                 else {
//                     console.log("file saved!");
//                 }
//             });
//         }
//     },
//     {
//         prompt: "createRecord",
//         func: function (x) {
//             record = {
//                 name: x[0],
//                 email: x[1]
//             }

//             fs.readFile("./data.json", { encoding: "utf8" }, (err, body) => {
//                 if (err) {
//                     console.log("file did not save!");
//                 }
//                 else {
//                     body = JSON.parse(body);
//                     console.log("file opened: ", body);
//                     body.records.push(record);
//                     console.log("file Updated: ", body);
//                     body = JSON.stringify(body)


//                     fs.writeFile("./data.json", body, (err) => {
//                         console.log(2);
//                         if (err) {
//                             console.log("file did not save!");
//                         }
//                         else {
//                             console.log("file saved!");
//                         }
//                     });
//                 }
//             });
//         }
//     },
//     {
//         prompt: "updateRecord",
//         func: function (x) {
//             searchName = x[0];
//             record = {
//                 name: x[1],
//                 email: x[2]
//             }

//             fs.readFile("./data.json", { encoding: "utf8" }, (err, body) => {
//                 if (err) {
//                     console.log("file did not save!");
//                 }
//                 else {
//                     body = JSON.parse(body);
//                     console.log("file opened: ", body);
//                     // body.records.push(record);
//                     for (var i = 0; i < body.records.length; i++) {
//                         if (body.records[i]["name"] == searchName) {
//                             body.records[i] = record;
//                         }
//                     }


//                     console.log("file Updated: ", body);
//                     body = JSON.stringify(body)
//                     fs.writeFile("./data.json", body, (err) => {
//                         console.log(2);
//                         if (err) {
//                             console.log("file did not save!");
//                         }
//                         else {
//                             console.log("file saved!");
//                         }
//                     });
//                 }
//             });
//         }
//     },
//     {
//         prompt: "deleteRecord",
//         func: function (x) {
//             searchName = inputs[0];

//             fs.readFile("./data.json", { encoding: "utf8" }, (err, body) => {
//                 if (err) {
//                     console.log("file did not save!");
//                 }
//                 else {
//                     body = JSON.parse(body);
//                     console.log("file opened: ", body);
//                     // body.records.push(record);
//                     for (var i = 0; i < body.records.length; i++) {
//                         if (body.records[i]["name"] == searchName) {
//                             body.records.splice(i, 1);
//                         }
//                     }

//                     console.log(body.records);


//                     // console.log("file Updated: ", body);
//                     // body = JSON.stringify(body)
//                     // fs.writeFile("./data.json", body, (err) => {
//                     //     console.log(2);
//                     //     if (err) {
//                     //         console.log("file did not save!");
//                     //     }
//                     //     else {
//                     //         console.log("file saved!");
//                     //     }
//                     // });
//                 }
//             });
//         }
//     }

// ]