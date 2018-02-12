const NodeCache = require( "node-cache" );
const cache = new NodeCache();
const fs = require('fs');
const colors = require('colors');
const default_options = {
    separator: ":",
    case: "none",
    function: "log",
    color: "white",
    bgColor: "bgBlack",
    style: "reset"
}


let currentIndex = 0;

module.exports.log = (variable) => {

  const filename = _getCallerFile();

  cache.get(filename, ( err, values ) => {
  if( !err ){
    if(values == undefined){
      cache.set(filename, {varNames:[{[variable]: 0}]})
      printLabel(filename,variable)
    }else{
      fs.readFile(filename, (err, contents) => {
        let variables = [];
        let regex = new RegExp("^" + default_options.function + "\((.*)\)$", "gm");

        variables = variables.concat(contents.toString().match(regex));

        regex = new RegExp("\\s" + default_options.function + "\((.*)\)$", "gm");

        if(contents.toString().match(regex) != null){
           variables = variables.concat(contents.toString().match(regex));
        }

        if(values.varNames.length < variables.length){
          values.varNames.push({[variable]: values.varNames.length})
        }
        cache.set(filename, values, (err, success) => {

          printLabel(filename,variable)

        });
      });
    }
  }
});



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

function printLabel(filename, variable) {
  let variables = [];
  colors.setTheme({
    custom: [default_options.color, default_options.bgColor, default_options.style]
  });

  fs.readFile(filename, (err, contents) => {

     let regex = new RegExp("^" + default_options.function + "\((.*)\)$", "gm");

     variables.concat(contents.toString().match(regex));

     regex = new RegExp("\\s" + default_options.function + "\((.*)\)$", "gm");

    if(contents.toString().match(regex) != null){
        variables = variables.concat(contents.toString().match(regex));
    }

    cache.get( filename, ( err, cacheData ) => {

          let index;
          for(name of cacheData.varNames){

              if (variable in name){
                index = name[variable];
                break;
              }

          }
          switch(default_options.case){
            case 'upper':
              console.log((variables[index].toString().replace(/\s/g, "").split('(')[1].split(')')[0].toUpperCase()+default_options.separator).custom+" "+variable);
              break;
            case 'lower':
              console.log((variables[index].toString().replace(/\s/g, "").split('(')[1].split(')')[0].toLowerCase()+default_options.separator).custom+" "+variable);
              break;
            case 'none':
              console.log((variables[index].toString().replace(/\s/g, "").split('(')[1].split(')')[0]+":").custom +" "+variable);
              break;

          }

    });
  });

}

function _getCallerFile() {
    var originalFunc = Error.prepareStackTrace;

    var callerfile;
    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function (err, stack) { return stack; };

        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if(currentfile !== callerfile) break;
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc;

    return callerfile;
}
