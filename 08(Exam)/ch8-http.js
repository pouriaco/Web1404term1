import {createServer} from "http"
import fs from 'fs'
let command = process.argv[2];
let inputs = process.argv.slice(3);

let Controllers = []

start();

function start() {

    let server = createServer(function (request , response) {
        console.log("request:" , request.method , request.url);

        let body = '';
        request.on("data", function(chunk){
            body += chunk;
        });

        request.on("end", function(){
            try{
                body = JSON.parse(body);
            }
            catch(e){
                console.log("request body is not a valid JSON.")
            }
            request.body = body;
            router(request, response);
        });
    })
    server.listen(80);

}

function router(request , response) {
    let found = false;
    for (let item of Controllers) {
        if (request.url.startsWith("/" + item.path)) {
            item.func(response , request);
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

function use(path , func) {
    let item = {
        path:path,
        func:func
    }

    Controllers.push(item);

    // console.log(Controllers);
}

function writeResponse(response , status , message , header){
    if (header) {
        response.writeHead(status , header);
    }
    else{
        response.writeHead(status);
    }
    // response.write(response);
    response.write(message);
    response.end()
}

use("data", function (response, request) {
    console.log(request.method);
    
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
})
