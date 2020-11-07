function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}
var src=ace.edit("editor").getValue(),wikitext;
var lastcodeError=0;
try {
  var t = eval(CoffeeScript.compile(src)), s=Compiler.compileShip(t);
  wikitext = `{{Ship-Infobox\n
|name=${s.name||""}\n
|image=${(s.name||"").replace(/\s/g,"_")}.png\n
|shieldc=${s.specs.shield.capacity.join("/")}\n
|shieldr=${s.specs.shield.reload.join("/")}\n
|energyc=${s.specs.generator.capacity.join("/")}\n
|energyr=${s.specs.generator.reload.join("/")}\n
|turning=${s.specs.ship.rotation.join("/")}\n
|acceleration=${s.specs.ship.acceleration.join("/")}\n
|speed=${s.specs.ship.speed.join("/")}\n
|tier=${s.level||1}\n
|mass=${s.specs.ship.mass||0}\n
|designer=${t.designer||"Neuronality"}\n
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
  }
  let dash = s.specs.ship.dash;
  if (dash) wikitext+=`{{Cannon\n
|type=Dash\n
|energy=${dash.energy.join("/")}\n
|damage=${dash.energy.join("/")}\n
|speed=${dash.burst_speed.join("/")}\n
|dual=N/A\n
|recoil=N/A\n
|frequency=1\n
|error=N/A\n
|angle=N/A\n
|spread=N/A\n
}}\n\n`;
  for (let laser of lasers) wikitext+=`{{Cannon\n
|type=${["Stream","Pulse"][(laser.type-1)||0]}\n
|energy=${laser.damage.map(lar => ((laser.dual?(lar*2):lar)||0)).join("/")}\n
|damage=${laser.damage.join("/")}\n
|speed=${laser.speed.join("/")}\n
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
