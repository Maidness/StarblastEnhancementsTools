(function(){
  let wikitext = document.createElement("a");
  wikitext.setAttribute("id","wikitext");
  wikitext.setAttribute("data-tooltip","Copy basic WikiText Ship's information");
  wikitext.innerHTML='<i class="fa fa-fw fa-copy"></i>';
  wikitext.addEventListener("click", function () {
    var src=ace.edit("editor").getValue(),wikitext,lastcodeError=0;
      try {
        var x = eval(CoffeeScript.compile(src)) || {}, s=Compiler.compileShip(x) || {};
        wikitext = `{{Ship-Infobox\n
|name=${s.name||""}\n
|image=${(s.name||"").replace(/\s/g,"_")}.png\n
|shieldc=${t(s,"specs","shield","capacity")}\n
|shieldr=${t(s,"specs","shield","reload")}\n
|energyc=${t(s,"specs","generator","capacity")}\n
|energyr=${t(s,"specs","generator","reload")}\n
|turning=${t(s,"specs","ship","rotation")}\n
|acceleration=${t(s,"specs","ship","acceleration")}\n
|speed=${t(s,"specs","ship","speed")}\n
|tier=${u(s,null,"level")}\n
|mass=${u(s,null,"specs","ship","mass")}\n
|designer=${u(x,"Neuronality","designer")}\n
}}\n\n
== Cannons ==\n\n`;
        let lasers = s.lasers;
        lasers = (Array.isArray(lasers)?lasers:[]).map(laser => {
          laser.x = Math.abs(laser.x);
          laser.y = Math.abs(laser.y);
          laser.z = Math.abs(laser.z);
          return laser;
        }), dups = new Map(), i = 0;
        while (i<lasers.length) {
          let laser = lasers[i], p = [laser.x,laser.y,laser.z].join("-"), dupi = dups.get(p);
          if (!dupi) {
            dups.put(p,laser);
            i++;
          }
          else {
            lasers.splice(i,1);
            dups.get(p).dual = true;
            dups.remove(p);
          }
        };
        let dash = u(s,0,"specs","ship","dash");
        if (dash) wikitext+=`{{Cannon\n
|type=Dash\n
|energy=${t(dash,"energy")}\n
|damage=${t(dash,"energy")}\n
|speed=${t(dash,"burst_speed")}\n
|dual=N/A\n
|recoil=N/A\n
|frequency=1\n
|error=N/A\n
|angle=N/A\n
|spread=N/A\n
}}\n\n`;
        for (let laser of lasers) wikitext+=`{{Cannon\n
|type=${["Stream","Pulse"][(laser.type-1)||0]}\n
|energy=${(function(){let gx = u(laser,"N/A","damage");return Array.isArray(gx)?gx.map(lar => ((laser.dual?(lar*2):lar)||0)).join("/"):"N/A"})()}\n
|damage=${t(laser,"damage")}\n
|speed=${t(laser,"speed")}\n
|dual=${!!u(laser,0,"dual")}\n
|recoil=${u(laser,0,"recoil")}\n
|frequency=${u(laser,1,"rate")}\n
|error=${u(laser,0,"error")}\n
|angle=${Math.abs(u(laser,0,"angle"))}\n
|spread=${Math.abs(u(laser,0,"spread"))}\n
}}\n\n`;
        if (!(dash || lasers.length)) wikitext+="This ship has no cannons or dashes";
      }
      catch(e) {
        lastcodeError=1;
        showErrorBox("exclamation-triangle","Failed processing the Ship Code",null,"WikiText Compiler");
      }
      if (lastcodeError==0)
      {
        copyToClipboard(wikitext);
        document.querySelector("#wikitext").setAttribute("data-tooltip","Copied!");
        setTimeout(function(){document.querySelector("#wikitext").setAttribute("data-tooltip","Copy basic WikiText Ship's information")},500);
      }
      else lastcodeError=0;
  });

  var copyToClipboard = function (text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }, t = function(first,...props) {
    try {
      let arr = a(first,...props);
      if (!Array.isArray(arr)) return "N/A";
      let i=0;
      while (i<arr.length) {
        if (arr.indexOf(arr[i])<i) arr.splice(i,1);
        else i++
      }
      return arr.join("/")||"N/A";
    }
    catch(e){return "N/A"}
  }, a = function(a,...b){
    let kx = a;
    return b.forEach(i=>kx = kx[i]),kx;
  }, u = function(k,b,...c) {
    let j;
    try{j = a(k,...c)}
    catch(e){j = null}
    return (j!=null)?j:(b!=null?b:"N/A");
  }, bar = document.getElementsByClassName("iconsbar editoriconsbar")[0];
  let x = bar.childNodes[bar.childNodes.length-2];
  bar.insertBefore(wikitext,x);
})();
