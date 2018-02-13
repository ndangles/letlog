const fs = require('fs');
const colors = require('colors');
const appDir = __dirname.split('/node_modules')[0];
const files = getFiles(appDir);
const default_options = {
    separator: ":",
    case: "none",
    function: "letlog",
    color: "white",
    bgColor: "bgBlack",
    style: "reset"
}

let cache = [];
let fileCache = [];

for(file of files){
  let contents = fs.readFileSync(file);
  fileCache.push({[file]: contents})
}

module.exports.log = (variable) => {

  const filename = getCallerFile();
  const cacheData = findKey(filename, cache);
  const contents = getFileData(filename);


  if(cacheData == undefined){
    cache.push({[filename]: {varNames:[{[variable]: 0}]}});
    printLabel(filename,variable,contents);
  } else {

      let variables = [];
      let clean_variables = [];
      let regex = new RegExp("^" + default_options.function + "\((.*)\)$", "gm");

      variables = variables.concat(contents.toString().match(regex));

      regex = new RegExp("\\s" + default_options.function + "\((.*)\)$", "gm");

      if(contents.toString().match(regex) != null){
         variables = variables.concat(contents.toString().match(regex));
      }

      for(varr of variables){
        if(varr != null){
          if(varr.indexOf("require(") == -1){
            clean_variables.push(varr)
          }
        }
      }

      cacheData.varNames.push({[variable]: cacheData.varNames.length})
      printLabel(filename,variable,contents)

  }


}

module.exports.options = (options) => {

  if(options.case != undefined){
    default_options.case = options.case;
  }

  if(options.separator != undefined){
    default_options.separator = options.separator;
  }

  if(options.function != undefined){
    default_options.function = options.function;
  }

  if(options.color != undefined){
    default_options.color = options.color;
  }

  if(options.bgColor != undefined){
    default_options.bgColor = options.bgColor;
  }

  if(options.style != undefined){
    default_options.style = options.style;
  }

}

function printLabel(filename, variable, contents) {
  let variables = [];
  let clean_variables = [];
  colors.setTheme({
    custom: [default_options.color, default_options.bgColor, default_options.style]
  });

    const cacheData = findKey(filename, cache);
    let index;

    let regex = new RegExp("^" + default_options.function + "\((.*)\)$", "gm");

    variables.concat(contents.toString().match(regex));

    regex = new RegExp("\\s" + default_options.function + "\((.*)\)$", "gm");

    if(contents.toString().match(regex) != null){
        variables = variables.concat(contents.toString().match(regex));
    }

    for(varr of variables){
      if(varr.indexOf("require(") == -1){
        clean_variables.push(varr)
      }
    }

    for(name of cacheData.varNames){
      if(variable in name){
        index = name[variable]
        break;
      }

    }



    switch(default_options.case){
      case 'upper':
        console.log((clean_variables[index].toString().replace(/\s/g, "").split('(')[1].split(')')[0].toUpperCase()+default_options.separator).custom+" "+variable);
        break;
      case 'lower':
        console.log((clean_variables[index].toString().replace(/\s/g, "").split('(')[1].split(')')[0].toLowerCase()+default_options.separator).custom+" "+variable);
        break;
      case 'none':
        console.log((clean_variables[index].toString().replace(/\s/g, "").split('(')[1].split(')')[0]+default_options.separator).custom +" "+variable);
        break;

    }

}

function findKey(keyName, arr){
  for(a of arr){
    if(a[keyName] != undefined){
      return a[keyName];
    }
  }

  return undefined;
}

function getFileData(filename){
  for(f of fileCache){
    if(f[filename] != undefined){
      return f[filename]
    }
  }

  return undefined;
}



function getCallerFile() {
    const originalFunc = Error.prepareStackTrace;

    let callerfile;
    try {
        const err = new Error();
        let currentfile;

        Error.prepareStackTrace =  (err, stack) => { return stack; };

        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if(currentfile !== callerfile) break;
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc;

    return callerfile;
}

function getFiles(dir) {


    var results = [];

    fs.readdirSync(dir).forEach((file) => {

        file = dir+'/'+file;
        var stat = fs.statSync(file);

        if(!file.includes('node_modules')) {

          if (stat && stat.isDirectory()) {
              results = results.concat(getFiles(file))
          } else {
            if(file.endsWith('.js')){
              results.push(file);
            }

          }

        }
    });

    return results;

};
