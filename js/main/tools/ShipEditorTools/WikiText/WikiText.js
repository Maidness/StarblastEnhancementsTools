(function(){
  let wikitext = document.createElement("a");
  wikitext.setAttribute("id","wikitext");
  wikitext.setAttribute("data-tooltip","Copy basic WikiText Ship's information");
  wikitext.innerHTML='<i class="fa fa-fw fa-copy"></i>';
  wikitext.addEventListener("click", function () {
    var src=ace.edit("editor").getValue(),wikitext,lastcodeError=0;
      try {
        var x = eval(CoffeeScript.compile(src)), s=Compiler.compileShip(x);
        wikitext = `{{Ship-Infobox\n
|name=${s.name||""}\n
|image=${(s.name||"").replace(/\s/g,"_")}.png\n
|shieldc=${t(s.specs.shield.capacity)}\n
|shieldr=${t(s.specs.shield.reload)}\n
|energyc=${t(s.specs.generator.capacity)}\n
|energyr=${t(s.specs.generator.reload)}\n
|turning=${t(s.specs.ship.rotation)}\n
|acceleration=${t(s.specs.ship.acceleration)}\n
|speed=${t(s.specs.ship.speed)}\n
|tier=${s.level||1}\n
|mass=${s.specs.ship.mass||0}\n
|designer=${x.designer||"Neuronality"}\n
}}\n\n
== Cannons ==\n\n`;
        let lasers = s.lasers.map(laser => {
          laser.x = Math.abs(laser.x);
          laser.y = Math.abs(laser.y);
          laser.z = Math.abs(laser.z);
          return laser;
        }), dups = new Map(), i = 0;
        while (i<lasers.length) {
          let laser = lasers[i], p = [laser.x,laser.y,laser.z].join("-"), dupi = dups.get(p);
          if (!dupi) {
            dups.set(p,laser);
            i++;
          }
          else {
            lasers.splice(i,1);
            dups.get(p).dual = true;
            dups.delete(p);
          }
        };
        let dash = s.specs.ship.dash;
        if (dash) wikitext+=`{{Cannon\n
|type=Dash\n
|energy=${t(dash.energy)}\n
|damage=${t(dash.energy)}\n
|speed=${t(dash.burst_speed)}\n
|dual=N/A\n
|recoil=N/A\n
|frequency=1\n
|error=N/A\n
|angle=N/A\n
|spread=N/A\n
}}\n\n`;
        for (let laser of lasers) wikitext+=`{{Cannon\n
|type=${["Stream","Pulse"][(laser.type-1)||0]}\n
|energy=${t(laser.damage.map(lar => ((laser.dual?(lar*2):lar)||0)))}\n
|damage=${t(laser.damage)}\n
|speed=${t(laser.speed)}\n
|dual=${!!laser.dual}\n
|recoil=${laser.recoil||0}\n
|frequency=${laser.rate||1}\n
|error=${laser.error||0}\n
|angle=${Math.abs(laser.angle)||0}\n
|spread=${Math.abs(laser.spread)||0}\n
}}\n\n`;
      }
      catch(e) {
        lastcodeError=1;
        showErrorBox("exclamation-triangle","Failed processing the Ship Code");
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
  }, t = function(arr) {
    if (!Array.isArray(arr)) return arr;
    let i=0;
    while (i<arr.length) {
      if (arr.indexOf(arr[i])<i) arr.splice(i,1);
      else i++
    }
    return arr.join("/");
  }, bar = document.getElementsByClassName("iconsbar editoriconsbar")[0];
  bar.appendChild(bar.childNodes[2].cloneNode(true));
  bar.appendChild(wikitext);
})();
