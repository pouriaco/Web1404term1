import {createServer} from "http"

let server = createServer(function (request , response) {
    // console.log(request);

    response.write("I saw your request!")
    response.end();

})

server.listen(80);