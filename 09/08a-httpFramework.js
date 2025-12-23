import {createServer} from "http"
let command = process.argv[2];
let inputs = process.argv.slice(3);

let Controllers = []

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
        if (request.url.startsWith("/" + item.path) && item.method === request.method) {
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

function use( method , path , func) {
    let item = {
        method:method,
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

export{
    use,start,writeResponse
}

// import {createServer} from "http";

// let controllers = [];

// function start() {

//     let myServer = createServer(function (request, response) {

//         console.log("----------------------")
//         console.log("request:", request.method, request.url);

//         let body = '';
//         request.on("data", function(chunk){
//             body += chunk;
//         });

//         request.on("end", function(){
//             try{
//                 body = JSON.parse(body);
//             }
//             catch(e){
//                 console.log("request body is not a valid JSON.")
//             }
//             request.body = body;
//             router(request, response);
//         });
//     });

//     myServer.listen(80);
// }

// function router(request, response){
//     let found = false;
//     for (let item of controllers) {
//         //if ("/" + item.path === request.url) {
//         if (request.url.startsWith("/" + item.path)) {
//             console.log("router ok:  ", request.url);
//             item.func(request, response);
//             found = true;
//         }
//     }
//     if (!found) {
//         let message = 'router fail: ' + request.url;
//         console.log(message);
//         write(response, 404, message)
//     }
// }

// function use(path, func) {
//     let item = {
//         path: path,
//         func: func
//     };
//     controllers.push(item);
// }




// export {
//     start,
//     use,
//     writeResponse
// }