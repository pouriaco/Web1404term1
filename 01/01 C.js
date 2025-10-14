//mdn.com /// javascript.info
// console.log("hello" , Number(process.argv[2])+Number(process.argv[3]));
// console.log("sum is:",Number(process.argv[2])+Number(process.argv[3]));
// console.log("sum is:",parseInt(process.argv[2])+parseInt(process.argv[3]));

let nums = process.argv.slice(3);
let command = process.argv[2];

switch (command) {
    case "sum":
        console.log(Number(nums[0])+Number(nums[1]));
        break;

    case "minus":
        console.log(Number(nums[0])-Number(nums[1]));
        break;

    default:
        console.log("what are you talking about?")
        break;
}



