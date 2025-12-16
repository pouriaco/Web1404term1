import fs from 'fs'
let inputs = process.argv.slice(2);
let file = process.argv[1];


console.log(inputs);
console.log(file);

if (file !== "D:\\University\\Semester2\\web\\Web1404term1\\08(Exam)\\ch5.js") {
    createMyUser(inputs[0], inputs[1], inputs[2])
}


function createMyUser(name, family, email) {

    fs.readFile("./database.json", { encoding: "utf8" }, (err, body) => {
        if (err) {
            console.log("file did not save!");
        }
        else {
            let user = {
                name: name,
                family: family,
                email: email
            }
            body = JSON.parse(body);
            console.log("file opened: ", body);
            body.records.push(user);
            console.log("file Updated: ", body);
            body = JSON.stringify(body)


            fs.writeFile("./database.json", body, (err) => {
                if (err) {
                    console.log("file did not save!");

                }
                else {
                    console.log("file saved!");
                }
            });
        }
    });
}

export {
    createMyUser
}
