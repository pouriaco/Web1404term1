import {createServer} from "http"
let command = process.argv[2];
let inputs = process.argv.slice(3);

let Controllers = []

function start() {
    console.log("test111");

    let server = createServer(function (request , response) {
        console.log("request:" , request.method , request.url);

        let found = false;
        for (let item of Controllers) {
            if ("/" + item.path === request.url) {
                item.func(response , request);
                found = true;
            }
        }
    
        if (!found) {
            console.log("no command!");
        }


    })
    console.log("test555");
    server.listen(80);

}

function use(path , func) {
    let item = {
        path:path,
        func:func
    }

    Controllers.push(item);

    // console.log(Controllers);
}


export{
    use,start
}
