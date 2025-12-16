import { createServer } from "http"
import fs from 'fs'
let command = process.argv[2];
let inputs = process.argv.slice(3);

let Controllers = []

start();

function start() {

    let server = createServer(function (request, response) {
        console.log("request:", request.method, request.url);

        let body = '';
        request.on("data", function (chunk) {
            body += chunk;
        });

        request.on("end", function () {
            try {
                body = JSON.parse(body);
            }
            catch (e) {
                console.log("request body is not a valid JSON.")
            }
            request.body = body;
            router(request, response);
        });
    })
    server.listen(80);

}

function router(request, response) {
    let found = false;
    for (let item of Controllers) {
        if (request.url.startsWith("/" + item.path)) {
            item.func(response, request);
            found = true;
        }
    }

    if (!found) {
        let message = "no command!";
        console.log(message);
        response.write(message);
        response.end();
    }
}

function use(path, func) {
    let item = {
        path: path,
        func: func
    }

    Controllers.push(item);

    // console.log(Controllers);
}

function writeResponse(response, status, message, header) {
    if (header) {
        response.writeHead(status, header);
    }
    else {
        response.writeHead(status);
    }
    // response.write(response);
    response.write(message);
    response.end()
}

use("data", function (response, request) {

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
}
)
