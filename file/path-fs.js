const path = require('path');
const fs = require('fs');
const util = require('util');
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

const readFile = async (filepath) => {
    /*
    fs.readFile(filepath, 'utf8', (err,data) => {
        if (err) {
            console.error(err)
            return
          }
          console.log(data);
    });
    */

   const content = await fs.promises.readFile(filepath, 'utf8')
   .catch(err => console.error("Failed to read file", err));
   
   return content;
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

const getFileInfo = async (filepath) => {
    const stat = await fs.promises.stat(filepath)
    .catch(err => console.error("Failed to read file", err));
    return stat;

};

const createFolder = (folderName) => {
    if( !fs.existsSync(folderName) ){
        fs.mkdirSync(folderName);
    }
}

const listFiles = (folderpath) => {
    /*
    fs.readdirSync(folderPath).map(fileName => {
        return path.join(folderPath, fileName);
    });*/

    const fileList = fs.promises.readdir(folderpath)
    .catch(err => console.error("Failed to read dir", err));
    return fileList;
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

readFile("./file/test.txt").then(content => {
    console.log("content="+content);
});


writeFile("./file/testwrite.txt", "codewithlarry helps you improve full stack skills.");

appendFile("./file/testwrite.txt","\nyou will become a senior developer soon");

getFileInfo("./file/test.txt").then(stat => {
    console.log("file size = "+ stat.size);
    console.log("Is a file = "+ stat.isFile());
});

listFiles("./file").then(fileList =>{
   console.log(JSON.stringify(fileList, null, '  '));
});

createFolder("./tempdir");

copyFolder("./file","./file-bak-1");

//removeFolder("./file-bak");