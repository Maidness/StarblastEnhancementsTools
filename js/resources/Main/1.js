(function(){
  var sett = module.exports.settings.set;
  module.exports.settings.set = function(...t) {
    try {return sett.call(module.exports.settings, ...t)}catch(e){}
  };
  window.musiclist = [
    ["procedurality.mp3", "Procedurality"],
    ["argon.mp3", "Argon"],
    ["crystals.mp3", "Crystals"],
    ["warp_drive.mp3", "Warp Drive"],
    ["civilisation.mp3", "Civilisation"],
    ["red_mist.mp3","Red Mist"]
  ].sort((a,b) => a[0]<b[0]?-1:1);
  window.applyMusic = function(){};
  window.setMusic = function (init, replay) {
    let dm, em, dmlist = document.querySelector("#music_default"), emurl = document.querySelector("#ext-music"), exe = document.querySelector("#ex_enabled"), ex_enabled, index;
    if (init || !dmlist || !emurl || !exe) {
      dm = localStorage.getItem("music-default");
      em = localStorage.getItem("music-external")||"";
      ex_enabled = localStorage.getItem("ex-enabled") == "true";
    }
    else {
      dm = dmlist.value;
      em = emurl.value;
      ex_enabled = exe.checked;
    }
    let t;
    for (let i = 0; i<musiclist.length; i++) {
      if (musiclist[i][0] == dm) {
        t = true;
        index = i+1;
        break;
      }
    }
    if (!t) index = 0;
    dm = t?dm:"default";
    localStorage.setItem("music-default", dm);
    localStorage.setItem("music-external", em);
    localStorage.setItem("ex-enabled", ex_enabled);
    if (exe) exe.checked = ex_enabled;
    if (emurl) {
      emurl.value = em;
      emurl.disabled = !ex_enabled;
    }
    if (dmlist) {
      dmlist.options.selectedIndex = index;
      dmlist.disabled = ex_enabled;
    }
    replay && window.applyMusic();
  };
  window.setMusic(true);
  let a=document.createElement("script");
  a.src="https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@master/newStringReplacer/JS/newStringReplacer.min.js";
  a.type="text/javascript";
  document.head.appendChild(a);
  document.head.getElementsByTagName("title")[0].innerText="Starblast";
  var index = setInterval(function(){
    let u = module.exports, t = u.settings, music, mode, data, words = u.translate("Warping to system %s").split("%s"), sentence = document.getElementsByClassName("textprogress")[0].innerText;
    for (let i in t)
      if (t[i].settings) {
        data = t[i].mode;
        mode = t[i].mode_id;
        for (let j in t[i]) {
          try{if (t[i][j].music) {
            music = t[i][j];
            break;
          }}catch(e){}
        }
        break;
      }
    if ((data.game_info && music) && (sentence.startsWith(words[0]) && sentence.endsWith(words[1]))) {
      clearInterval(index);
      window.scoped_music = "";
      window.loaded_soundtrack = music.loaded_soundtrack;
      if (loaded_soundtrack) window.scoped_music = "https://starblast.data.neuronality.com/music/"+loaded_soundtrack;
      window.soundtrack_failed = 0;
      music.music.onload = function(){this.play()};
      music.music.onerror = function(){if (window.soundtrack_failed++ < 5) this.src = scoped_music};
      window.setMusic(true);
      window.applyMusic = function() {
        if (localStorage.getItem("ex-enabled") == "true") music.music.src = localStorage.getItem("music-external");
        else {
          let dmusic = localStorage.getItem("music-default");
          if (dmusic != "default") music.music.src = "https://starblast.data.neuronality.com/music/"+dmusic;
          else music.music.src = scoped_music;
        }
        music.music.load();
        music.music.play();
      };
      window.applyMusic();
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
      let text = modeicon[mode] + ((data.game_info||{}).name||sentence.replace(words[0],"b","")).replace(words[1],"e","") + " " + (data.options.unlisted?"(Private) ":"") + "– Starblast";
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
})();
