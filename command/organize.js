let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizefn(directoryPath) {
    // console.log("organize command implemnted for ", dirPath);
    // 1. input -> directory path given
    let destPath;
    if (directoryPath == undefined) {
        destPath = process.cwd();
        return;
    } else {
        let doesExist = fs.existsSync(directoryPath);
        if (doesExist) {

            // 2. create -> organized_files -> directory
            destPath = path.join(directoryPath, "organized_folder_ss");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }

        } else {

            console.log("Kindly enter the correct path");
            return;
        }
    }
    organized_files(directoryPath, destPath);
}

function organized_files(src, destination){
    // 3. identify categories of all the files present in that input directory  ->
    let fileName = fs.readdirSync(src); //Administration folder
    // console.log(fileName);
    for(let i = 0; i < fileName.length; i++){
        let allFileNameAddress = path.join(src, fileName[i]); //src+FileName
        // console.log(allFileNameAddress);
        let isFile = fs.lstatSync(allFileNameAddress).isFile();
        if(isFile){
            // console.log(allFileNameAddress[i]);
            let fileCategory = categoryType(fileName[i]);
            // console.log(fileName[i], "Belongs to --> ", fileCategory);
            // 4. copy / cut  files to that organized directory inside of any of category folder 
            copyFileToFileCategory(allFileNameAddress, destination, fileCategory);
            // fs.unlinkSync(allFileNameAddress);
        }

    }
}

function categoryType(nameFile){
    let nameExt = path.extname(nameFile);
    // console.log(nameExt);
    nameExt =  nameExt.slice(1);
    // console.log(nameExt);
    for(let typesofFile in types){
        let fileTypeArray = types[typesofFile];
        for(let i = 0; i < fileTypeArray.length; i++){
            if(nameExt == fileTypeArray[i]){
                return typesofFile;
            }
        }
    }
    return "others";
}

function copyFileToFileCategory(srcPath, destPaht, fileCategory){
    let fileCategoryPath = path.join(destPaht, fileCategory);
    if(fs.existsSync(fileCategoryPath) == false){
        fs.mkdirSync(fileCategoryPath);
    }
    let categoryFIleName = path.basename(srcPath);
    // console.log(categoryFIleName);
    let destinationPath = path.join(fileCategoryPath, categoryFIleName);
    // console.log(destinationPath);
    fs.copyFileSync(srcPath, destinationPath);
    console.log(categoryFIleName, "Copied to --> ", destinationPath);


}

module.exports={
    organizefcn: organizefn,
}
