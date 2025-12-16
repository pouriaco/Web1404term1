import { writeMyFile } from "./ch2-createFile.js"
import { readMyFileOrDir } from "./ch3-open.js"
import { createMyUser } from "./ch4-createRecords.js"


let inputs = process.argv.slice(3);
let command = process.argv[2];

// console.log(command);


switch (String(command)) {
    case "createFile":
        console.log("run1");
        
        writeMyFile(inputs[0], inputs[1]);
        break;

    case "open":
        console.log("run2");
        readMyFileOrDir(inputs[0]);

        break;

    case "createRecord":
        console.log("run3");
        createMyUser(inputs[0], inputs[1], inputs[2]);

        break;

    default:
        break;
}
