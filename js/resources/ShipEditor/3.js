(function(){
  Compiler.getModCode = function(src) {
    var code=CoffeeScript.compile(src),shipdata=eval(code);
    shipdata.typespec=Compiler.compileShip(shipdata);
    var name=((shipdata.name||"unknown")+"_"+(shipdata.typespec.code||"000")).getProperJSVariableName("strict",!0), prefix = "var "+name+" = ";
    escape = function(str) {
      return str.replace(/\\/g,"\\\\").replace(/(\')/g,"\\'")
    };
    switch (((document.querySelector("#export-type")||{}).options||{}).selectedIndex||1) {
      case 1:
        return prefix+"'"+escape(JSON.stringify(shipdata))+"';";
      case 2:
        code = code.replace(/\s*(\n|\r)+\s*/g,"");
        shipdata = {
          shape: shipdata.typespec.shape,
          lasers: shipdata.typespec.lasers,
          radius: shipdata.typespec.radius
        };
        try{code=new Packer().pack(code,!1,!1)}catch(e){}
        return prefix + "(function(){var r=Function('return"+escape(code)+"')();return r.typespec=Object.assign({name:r.name,level:r.level,model:r.model,code:r.level*100+r.model,specs:r.specs,next:null!=r.next?r.next:void 0},JSON.parse('"+escape(JSON.stringify(shipdata))+"')),JSON.stringify(r)})();";
      default:
        showErrorBox("bug","Invalid conversion type",null,"ModExport module");
    }
  };
  ShipEditor.prototype.modExport = function(){var code,name,shipdata,src;return src=this.editor.getValue(),code=CoffeeScript.compile(src),shipdata=eval(code),null!=shipdata&&(Compiler.getModCode(src))};
  window.showErrorBox = function(icon,title,content,source)
  {
    let colors={"bug":"#D13B2E","exclamation-triangle":"#FFFF33"};
  	let err=document.createElement("div");
  	err.setAttribute("id","diverr");
  	let ic=document.createElement("i");
  	ic.setAttribute("class","fa fa-fw fa-"+icon);
  	ic.setAttribute("style","font-size:15pt;color:"+colors[icon]+";position:absolute;left:7px;top:7px");
  	let text=document.createElement("p");
  	text.setAttribute("style","margin-left:40px;font-family:Sans-Serif;float:left;margin-right:42px");
  	text.innerHTML=title||"";
  	let msg=document.createElement("p");
  	msg.setAttribute("style","float:left;font-size:12px;font-family:Sans-Serif;margin-left:40px;margin-bottom:7px;margin-right:42px");
  	msg.innerHTML=content||"";
  	let src=document.createElement("i");
  	src.setAttribute("style","float:right;font-size:12px;font-family:Sans-Serif;margin-right:42px;margin-left:40px;margin-top:15px;");
  	src.innerHTML=source||"";
  	let close=document.createElement("button");
    close.setAttribute("style","position:absolute;right:7px;top:7px");
  	close.innerHTML="&nbsp;×&nbsp;";
    err.setAttribute("style","width:"+(Math.max(title.length*8,content*6,source*6)+82).toString()+"px;position:fixed;left: 50%;top:20px;background-color:#09161c;border:5px #09161c solid;border-left:3px "+colors[icon]+" solid;border-radius:5px;animation: fadeInOut 5s");
  	err.appendChild(ic);
  	err.appendChild(text);
    err.appendChild(document.createElement("br"));
  	err.appendChild(msg);
    err.appendChild(document.createElement("br"));
  	err.appendChild(src);
    err.appendChild(close);
  	document.body.appendChild(err);
  	setTimeout(function() {
  		try {
  			document.body.removeChild(err);
  		}
  		catch(e){}
  	},5000);
  	close.addEventListener("click",function() {
  		document.body.removeChild(err);
  	})
  };
})();
