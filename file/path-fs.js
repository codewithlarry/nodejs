const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');

const parsePath = (filepath) =>{
    return {
        dirname: path.dirname(filepath),
        basename: path.basename(filepath),
        extname: path.extname(filepath)
    };
};

const findAbsolutePath = (relativePath) =>{
    return path.resolve(relativePath);
};

const readFile = (filepath) => {
    fs.readFile(filepath, 'utf8', (err,data) => {
        if (err) {
            console.error(err)
            return
          }
          console.log(data);
    });
};

const writeFile = (filepath, content) => {
    fs.writeFile(filepath, content, err => {
        if(err) {
            console.error(err);
            return
        }
    });
};

const appendFile = (filepath, content) => {
    fs.appendFile(filepath, content, err => {
        if(err) {
            console.error(err);
            return
        }
    });
};

const getFileSize = (filepath) => {
    fs.stat(filepath, (err,stat) => {
       console.log("size="+stat.size);
    });
};

const createFolder = (folderName) => {
    if( !fs.existsSync(folderName) ){
        fs.mkdirSync(folderName);
    }
}

const listAllFiles = (folderpath) => {
    fs.readdirSync(folderPath).map(fileName => {
        return path.join(folderPath, fileName)});
};

const copyFolder = async (folderpathSrc, folderpathDest) => {
    try {
        await fsExtra.copy(folderpathSrc, folderpathDest);
        //done
      } catch (err) {
        console.error(err)
      }
};

const removeFolder = async (folderpath) => {
    try {
        await fsExtra.remove(folderpath);
        //done
      } catch (err) {
        console.error(err)
      }
};

let pathobj = parsePath("/user/larry/test.txt");
console.log(JSON.stringify(pathobj));

let absolutePath = findAbsolutePath("./file/test.txt");
console.log(absolutePath);

readFile("./file/test.txt");

writeFile("./file/testwrite.txt", "codewithlarry helps you improve full stack skills.");

appendFile("./file/testwrite.txt","\nyou will become a senior developer soon");

getFileSize("./file/test.txt");

copyFolder("./file","./file-bak-1");

//removeFolder("./file-bak");