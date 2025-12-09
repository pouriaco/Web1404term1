import { use, start, writeResponse } from "./07b-httpFramework.js"
import fs from 'fs'
import jwt from "jsonwebtoken";
let secret = "SuperSecretKey123456789!@#$%^&*()"
const LOGIN_TIME = 2; //min

function verifyToken(token){
    // if(req.token){
    //     return true;
    // }
    // return false;

    try {
        console.log(token);
        let plain = jwt.verify(token , secret)
        console.log("==============plain:" , plain);
        console.log("==============iaT:" , plain.iat);
        console.log("==============now:" , Date.now());

        if ((Date.now()/1000) - plain.iat < LOGIN_TIME * 60) {
            
            return true;
        }
        else{
            return false;
        }

    } catch (error) {
        console.log("errrorrr");
        return false;
    }
}

function parseCookie(cookieString , token){
    let cookies = "" ;
    try {
        cookies = cookieString.split("; ")
    } catch (error) {
        return " ";
    }

    for (let cookie of cookies) {
        let splitted = cookie.split('=');
        if (splitted[0] === token) {
            console.log("token:" , token , splitted);
            return splitted[1];
        }
    }
}

function timeCheck(plain){
    // console.log(plain.iat);
}

use("index.html", function (response, request) {
    response.write(`
        <html>
            <haed>
                <title>Hello!</title>
            </head>
            <body>
                <b>Hi</b>
                <img src="http://127.0.0.1/file/x.jpg" alt="Boy in a jacket" >
            </body>
        </html>
    `);
    response.end();
})

use("file", function (response, request) {
    let urlArray = request.url.split("/");
    let fileName = urlArray[2];
    console.log("./file/" + fileName);
    fs.readFile("./file/" + fileName, (err, body) => {
        if (err) {
            console.log(err);
            writeResponse(response, 404, "file not found")
        }
        else {
            // response.write(body);
            // response.end()
            writeResponse(response, 404, body)
        }
    });
})

use("sum", function (response, request) {
    // console.log(request.headers);
    if (! verifyToken(parseCookie(request.headers.cookie , "token"))) {
        writeResponse(response, 400, "invalid token")
    }
    else{
        let urlArray = request.url.split("/");
        console.log(urlArray);
        let inputs = urlArray.slice(2)
        console.log(inputs);
        writeResponse(response, 200, "sum:" + (Number(inputs[0])+Number(inputs[1])))
    }

})

use("createFile", function (response, request) {
    let urlArray = request.url.split("/");
    console.log(urlArray);
    let inputs = urlArray.slice(2)
    console.log(inputs);
    fs.writeFile('./'+inputs[0], inputs[1], err => {
        if (err) {
          console.error(err);
          writeResponse(response, 500, "file was not created")
        } else {
          // file written successfully
          writeResponse(response, 200, "file created successfully with your text")
        }
      });
})

use("postTest", function (response, request) {
    console.log(request.body, typeof request.body)
})


use("signUp", function (response, request) {
    fs.readFile("./users.json", { encoding: "utf8" }, (err, body) => {
        if (err) {
            console.log("file did not save!");
        }
        else {
            body = JSON.parse(body);
            console.log("file opened: ", body);
            body.records.push(request.body);
            console.log("file Updated: ", body);
            body = JSON.stringify(body)


            fs.writeFile("./users.json", body, (err) => {
                console.log(2);
                if (err) {
                    console.log("file did not save!");
                    writeResponse(response, 500, "something went wrong!")

                }
                else {
                    console.log("file saved!");
                    writeResponse(response, 200, "user created")
                }
            });
        }
    });
})

use("login", function (response, request) {
    fs.readFile("./users.json", { encoding: "utf8" }, (err, body) => {
        if (err) {
            console.log("file did not save!");
        }
        else {
            body = JSON.parse(body);
            console.log("file opened: ", body.records);
            let found = false;

            for (let item of body.records) {
                console.log(item);
                console.log(request.body);
                if (item.user == request.body.user && item.pass == request.body.pass) {
                    console.log("your account exists! youre loged in");

                    // writeResponse(response, 200, "user found")
                    let token = jwt.sign({
                        "user" : item.user
                    } , secret);
                    let palin = jwt.verify(token , secret);
                    writeResponse(response, 200, "login done" , {
                        "Set-Cookie" : "token=" + token
                    })

                    found = true;
                }
            }

            if (!found) {
                writeResponse(response, 500, "user not found")
            }
        }
    });
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