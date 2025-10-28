// let myInfo = {
//     name : "pouria",
//     family : "vahedi",
//     age : 18
// };


let inputs = process.argv.slice(3);
let command = process.argv[2];

switch (command) {
    case "sum":
        console.log(Number(nums[0])+Number(nums[1]));
        break;

    case "minus":
        console.log(Number(nums[0])-Number(nums[1]));
        break;

    case "info":
        let myInfo = {
            name:inputs[0],
            family:inputs[1],
            age: inputs[2]
        }

        console.log("my information is : " , myInfo);
        break;

        case "print":
            let obj = {
                name:inputs[0],
                family:inputs[1],
                age: inputs[2]
            }
    
            // console.log("my information is : " , myInfo);
            for (const key in obj) {
                console.log("Salam ", obj[key]);
            }
            break;

    default:
        console.log("what are you talking about?")
        break;
}
