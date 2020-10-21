var modeicon={
  team: "👥",
  survival: "☠️",
  deathmatch: "🏆",
  invasion: "🛸",
  modding: "🛠️",
  private: "🔒",
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
  ctf: "Capture The Flag"
}, synctitle = document.head.getElementsByTagName("title")[0];
synctitle.innerText="Starblast";
var index = setInterval(function(){
  let t = module.exports.settings, data;
  for (let i in t)
    if (t[i].settings) {
      data = t[i].mode;
      break;
    }
  if (data.game_info || data.id == "tutorial") {
    clearInterval(index);
    let text = "Starblast – " + modeicon[data.id] + (data.options.unlisted?"(Private)":"") + ((data.game_info||{}).name||"Unknown") + " System";
    if (data.id == "modding" && !data.options.unlisted) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/simstatus.json', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4)  {
            var b=0, list = JSON.parse(xhr.responseText), reglist = [];
            for (let i of list) (i.location == data.game_info.region && i.systems.length > 0) && reglist.push(i);
            for (let i of reglist) {
                for (var j of i.systems) {
                    if (j.name == data.game_info.name && data.game_info.systemid == j.id)
                    {
                      synctitle.innerText = text + ` (${modname[j.mod_id]||"Unknown"})`;
                      b=1;
                      break;
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
