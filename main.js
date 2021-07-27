let treeObj = require("./command/tree");
let organizeObj = require("./command/organize");
let helpObj = require("./command/help");

let inputArr = process.argv.slice(2);
let command = inputArr[0];
switch(command){
    case "tree":
        treeObj.treefcn(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizefcn(inputArr[1]);
        break;
    case "help":
        helpObj.helpfcn();
        break;
    default:
        console.log("🙏 kindly enter the correct cmd");
        break;            
}
