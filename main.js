let input = process.argv.slice(2);
const { dir } = require('console');
let fs = require('fs');
const { type } = require('os');
let path = require('path');
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
switch (input[0]) {
    case "tree": treemaker(input[1]);
        break;
    case "organise": organise(input[1]);
        break;
    case "help": help();
        break;
    default : 
        console.log("give proper inputs");
    }


        function help()
        {
         console.log(`commands:
            1. tree
            2. organise
            3. help`);
}
function organise(dirpath) {
    if (dirpath == undefined) console.log("enter path");
    else {
        let ispath = fs.existsSync(dirpath);
        if (!ispath) console.log("enter correct path");
        else {
            let exactpath =path.join(dirpath, "organisefiles");
            if (!fs.existsSync(exactpath)) fs.mkdirSync(exactpath);
            organisehelper(dirpath, exactpath);
        }

    }
}
function organisehelper(src, dest) {
    let a = fs.readdirSync(src);
    for (let i = 0; i < a.length; i++)
    {
        let add = path.join(src, a[i])
        if (fs.lstatSync(add).isFile()) {
            let cat = category(add);
            getfiles(add,dest, cat);
        }
        }
}
function getfiles(add, dest, cat) {
    let cpath = path.join(dest, cat);
    if (!fs.existsSync(cpath)) fs.mkdirSync(cpath);
    let bname = path.basename(add);
    let des=path.join(cpath, bname);
    fs.copyFileSync(add, des);
    console.log(bname + " copied to " + cat);
  }
function category(add)
{
    let ext = path.extname(add);
    ext = ext.slice(1);
    for (let type in types) {
        let b = types[type];
        for (let i = 0; i < type.length; i++){
            if(ext==b[i]) return type;
        }
    }
    return "others";
}
function treemaker(dirpath) {
    if (dirpath == undefined) console.log("enter correct path");
    if (!fs.existsSync(dirpath)) console.log("enter correct inputs");
    else treehelper(dirpath,"");
}
function treehelper(dirpath, indent) {
    if (fs.lstatSync(dirpath).isFile()) console.log(indent + " |-- " + path.basename(dirpath));
    else {
        let dirname = path.basename(dirpath);
        if(dirname.charAt(0) !== "."){
            console.log(indent + " /-- " + dirname);
        }
        let children = fs.readdirSync(__dirname);
        for (let i = 0; i < children.length; i++)
        if(dirname.charAt(0) !== '.') {
            treehelper(path.join(dirpath, children[i]), indent + " " );
        }
    }
}
