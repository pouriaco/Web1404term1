import { createServer } from "http"
let command = process.argv[2];
let inputs = process.argv.slice(3);

let Controllers = []

start();

function start() {

    let server = createServer(function (request, response) {
        console.log("request:", request.method, request.url);

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


    })
    server.listen(80);

}

function use(path, func) {
    let item = {
        path: path,
        func: func
    }

    Controllers.push(item);

    // console.log(Controllers);
}

function writeResponse(response, status, message) {
    response.writeHead(status);
    // response.write(response);
    response.write(message);
    response.end()
}


use("ch7", function (response, request) {
    let urlArray = request.url.split("/");
    console.log(urlArray);
    let inputs = urlArray.slice(2)
    console.log(inputs);
    // writeResponse(response, 200, "sum:" + (Number(inputs[0]) + Number(inputs[1])))
    response.write(String(inputs));
    response.end();
})