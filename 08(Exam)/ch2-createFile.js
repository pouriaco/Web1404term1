import fs from 'fs'
let inputs = process.argv.slice(2);
let file = process.argv[1];


console.log(inputs);
console.log(file);

if (file !== "D:\\University\\Semester2\\web\\Web1404term1\\08(Exam)\\ch5.js") {
    writeMyFile(inputs[0] , inputs[1])
}

function writeMyFile(fileName , fileContent) {
    fs.writeFile('./' + fileName, fileContent, err => {
        if (err) {
            console.error(err);
            console.log("file was not created")
        } else {
            // file written successfully
            console.log("File Created")
        }
    });
}

export{
    writeMyFile
}
