let a=document.createElement("script");
a.src="https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@master/newStringReplacer/JS/newStringReplacer.min.js";
a.type="text/javascript";
document.head.appendChild(a);
document.head.getElementsByTagName("title")[0].innerText="Starblast";
var index = setInterval(function(){
  let u = module.exports, t = u.settings, mode, data, words = u.translate("Warping to system %s").split("%s"), sentence = document.getElementsByClassName("textprogress")[0].innerText;
  for (let i in t)
    if (t[i].settings) {
      data = t[i].mode;
      mode = t[i].mode_id;
      break;
    }
  if ((data.game_info || data.id == "tutorial") && (sentence.startsWith(words[0]) && sentence.endsWith(words[1]))) {
    clearInterval(index);
    var modeicon={
      team: "👥",
      survival: "☠️",
      deathmatch: "🏆",
      invasion: "🛸",
      modding: "🛠️",
      tutorial: "📖"
    }, modname={
      alienintrusion: "Alien Intrusion",
      useries: "U-Series",
      racing: "Racing",
      prototypes: "Prototypes",
      nauticseries: "Nautic Series",
      battleroyale: "Battle Royale",
      rumble: "Rumble",
      src2: "Racing Championship",
      ctf: "Capture The Flag",
      dtm: "Destroy the Mothership"
    }, synctitle = document.head.getElementsByTagName("title")[0];
    let text = "Starblast – " + modeicon[mode] + (data.options.unlisted?"(Private) ":"") + ((data.game_info||{}).name||sentence.replace(words[0],"b","")).replace(words[1],"e","") + " System";
    if (mode == "modding" && !data.options.unlisted) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/simstatus.json', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4)  {
            let b, list = JSON.parse(xhr.responseText), reglist = [];
            for (let i of list) (i.location == data.game_info.region && i.systems.length > 0) && reglist.push(i);
            GetServerInfo: for (let i of reglist) {
                for (var j of i.systems) {
                    if (b=(j.name == data.game_info.name && data.game_info.systemid == j.id),b)
                    {
                      synctitle.innerText = text + ` (${modname[j.mod_id]||"Unknown"})`;
                      break GetServerInfo;
                    }
                }
            }
            if (!b) synctitle.innerText = text;
        }
      };
      xhr.send(null);
    }
    else synctitle.innerText = text;
  }
},500);
