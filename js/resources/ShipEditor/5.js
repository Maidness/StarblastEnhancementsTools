String.prototype.getProperJSVariableName=function(mode){let declare=["var","let"];CustomError=function(e,r){var t=new Error(r);return t.name=e,t};let inp=""==this?"_":this.replace(/^(\d)/g,"_$1").replace(/(=|\n|\r|\s|;)/g,"_"),s;switch(mode||""){case"":s="";break;case"strict":s="'use strict';";break;default:throw new CustomError("ModeError","Invalid javascript mode '"+mode+"'")}try{for(let i of declare)eval(s+i+" "+inp)}catch(e){let err=0;try{for(let i of declare)eval(s+i+" _"+inp)}catch(er){err=1;for(let i=0;i<inp.length;i++){let reserved=0,illegalchar=0,errors=0;try{for(let index of declare)eval(s+index+" "+inp.substring(0,i+1))}catch(e){reserved=1,illegalchar=1,errors=1}try{for(let index of declare)eval(s+index+" "+inp[i])}catch(e){reserved=0}!reserved&&errors&&illegalchar&&(inp=inp.substring(0,i)+"_"+inp.substring(i+1,inp.length))}}0==err&&(inp="_"+inp)}return inp};
Compiler.getModCode = function(src){var code=CoffeeScript.compile(src),shipdata=eval(code);shipdata.typespec=Compiler.compileShip(shipdata);var name=(shipdata.name||"unknown"+"_"+shipdata.typespec.code).getProperJSVariableName("strict");return"var "+name+" = '"+JSON.stringify(shipdata).replace(/\\/g,"\\\\").replace(/(\')/g,"\\'")+"';"};
ShipEditor.prototype.modExport = function(){var code,name,shipdata,src;return src=this.editor.getValue(),code=CoffeeScript.compile(src),shipdata=eval(code),null!=shipdata&&(Compiler.getModCode(src))};
