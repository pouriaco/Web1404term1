import fs from 'fs'
let inputs = process.argv.slice(2);
let file = process.argv[1];


console.log(inputs);
console.log(file);

if (file !== "D:\\University\\Semester2\\web\\Web1404term1\\08(Exam)\\ch5.js") {
    readMyFileOrDir(inputs[0]);
}




function readMyFileOrDir(name) {
    fs.readFile("./" + name, { encoding: "utf8" }, (err, body) => {
        if (err) {
            console.log("file is not .txt!");


            fs.readdir("./" + name, (err, files) => {
                if (err) {
                    console.error("Error reading directory");
                    console.error("your param is not file or folder");
                }
                else {
                    console.log("Directory contents:");
                    files.forEach((file) => {
                        console.log(file);
                    });
                }
            });


        }
        else {
            console.log("file opened: ", body);
        }
    });
}


export{
    readMyFileOrDir
}
