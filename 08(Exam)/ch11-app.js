import { use, start, writeResponse } from "./ch11-http.js"
import fs from 'fs'



use("ch7", function (response, request) {
    let urlArray = request.url.split("/");
    console.log(urlArray);
    let inputs = urlArray.slice(2)
    console.log(inputs);
    // writeResponse(response, 200, "sum:" + (Number(inputs[0]) + Number(inputs[1])))
    response.write(String(inputs));
    response.end();
})

use("data", function (response, request) {


    switch (String(request.method)) {
        case "POST":

            fs.readFile("./database.json", { encoding: "utf8" }, (err, body) => {
                if (err) {
                    console.log("file did not save!");
                }
                else {
                    body = JSON.parse(body);
                    console.log("file opened: ", body);
                    body.records.push(request.body);
                    console.log("file Updated: ", body);
                    body = JSON.stringify(body)


                    fs.writeFile("./database.json", body, (err) => {
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
            break;
        case "DELETE":
            let urlArray = request.url.split("/");
            console.log(urlArray);
            let inputs = urlArray.slice(2)
            console.log(inputs);

            let searchName = inputs[0];

            fs.readFile("./database.json", { encoding: "utf8" }, (err, body) => {
                if (err) {
                    console.log("file did not save!");
                    response.write("file error!");
                    response.end();
                }
                else {
                    let count = 0;
                    body = JSON.parse(body);
                    console.log("file opened: ", body);
                    // body.records.push(record);
                    for (let i = body.records.length - 1; i >= 0; i--) {
                        if (body.records[i].name === searchName) {
                            body.records.splice(i, 1);
                            count++;
                        }
                    }

                    console.log(body.records);


                    console.log("file Updated: ", body);
                    body = JSON.stringify(body)
                    fs.writeFile("./database.json", body, (err) => {
                        if (err) {
                            console.log("file did not save!");
                            response.write("file did not save!");
                            response.end();
                        }
                        else {
                            console.log("file saved!");
                            let myResponse = count + " reacords removed!";
                            console.log(myResponse);

                            response.write(myResponse);
                            response.end();

                        }
                    });
                }
            });
            break;

        default:
            break;
    }

})      

start();