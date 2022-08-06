function scrollECP (isClient) {
  let scrolls = ["badge", "finish", "laser"], previewScrolls = [["ecpverifiedlogo", "badge"], ["shippreview", "finish"]];

  let fireEvent = function (element, event, isClient) {
    event.preventDefault();
    if (event.deltaY != 0 && element != null) {
      let dest = element.querySelector(".fa-caret-" + (event.deltaY > 1 ? "left": "right"));
      if (isClient) dest.dispatchEvent(new MouseEvent("mousedown"));
      else dest.click()
    }
  };

  for (let i = 0; i < scrolls.length; ++i) {
    let element = document.querySelector("div[data-type=" + scrolls[i] + "]");
    if (element != null && element.getAttribute("wheel-added") != "true") {
      element.setAttribute("wheel-added", "true");
      element.querySelector(".title").addEventListener('wheel', function (e) {
        fireEvent(element, e, isClient)
      })
    }
  }

  for (let i = 0; i < previewScrolls.length; ++i) {
    let element = document.querySelector("." + previewScrolls[i][0]);
    if (element != null && element.getAttribute("wheel-added") != "true") {
      let dest = document.querySelector("div[data-type=" + previewScrolls[i][1] + "]");
      if (dest != null) {
        element.setAttribute("wheel-added", "true");
        element.addEventListener("wheel", function (e) {
          fireEvent(dest, e, isClient)
        });
      }
    }
  }
};

let settings = module.exports.settings.parameters, oldIDs = Object.keys(settings).reverse();

let extendedOptions = {
  explosions: {
    name: "Explosions",
    value: true,
    default: true,
    filter: "default,app,mobile"
  },
  self_ship_tag: {
    name: "Self-ship Tag",
    value: false,
    default: false,
    filter: "default,app,mobile"
  },
  show_blank_badge: {
    name: "Show Blank Badges",
    value: false,
    default: false,
    filter: "default,app,mobile"
  },
  show_chat: {
    name: "Chat Bubbles",
    value: true,
    default: true,
    filter: "default,app,mobile"
  },
  chat_emotes_capacity: {
    name: "Chat Emotes Capacity",
    value: 4,
    default: 4,
    skipauto: !0,
    type: "range",
    min: 1,
    max: 5,
    [Object.keys(settings.music).find(v => v.match(/^[0OIl1]+$/))]: 1,
    filter: "default,app,mobile"
  }
};

Object.assign(module.exports.settings.parameters, extendedOptions);

for (let i of Object.keys(extendedOptions)) {
  let data, localData = localStorage.getItem(i);
  try { data = localData == null ? extendedOptions[i].default : JSON.parse(localData) } catch (e) { continue }
  module.exports.settings.set(i, data)
}

for (let i in window) try {
  let val = window[i].prototype;
  if ("function" == typeof val.propertyChanged) {
    let oldVal = val.propertyChanged;
    val.propertyChanged = function (t, e) {
      switch (t) {
        case "explosions": {
          let exp = document.querySelector("#explolight");
          if (exp != null) exp.disabled = !e;
          break;
        }
        case "chat_emotes_capacity": {
          let alternative = document.querySelector("#chat_emotes_capacity-value");
          if (alternative != null) alternative.innerText = e;
          break;
        }
        default:
          oldVal.apply(this, arguments)
      }
    };
    break;
  }
} catch (e) {};

function decorateSettings () {
  let a = document.querySelector("#set-settings");
  let allOptions = [...document.querySelectorAll(".option")];
  if (a == null) {
    for (let i of oldIDs) {
      let option = allOptions.find(element => element.querySelector("#" + i) != null);
      if (option != null) {
        a = document.createElement("div");
        a.setAttribute("id", "set-settings");
        a.setAttribute("class", "header");
        a.setAttribute("style", "margin-left: -40px; margin-right: -40px; margin-bottom: 20px; font-size: 25pt");
        a.innerHTML = "SET Extended Settings";
        option.after(a);
        break
      }
    }
  }

  if (a == null) return;

  let t = document.getElementsByClassName("modalbody")[0], emusic, musict, crystals;

  let getCustomCrystalColor = function () {
    return localStorage.getItem("crystal-color") || ""
  };

  for (let i of t.childNodes) {
    if (i.innerHTML.includes("music") && !t.innerHTML.includes("music_default")) musict = i;
    else if (i.innerHTML.includes("ext-music")) emusic = i;
    else if (i.innerHTML.includes("crystal-color")) crystals = i;
  }

  let emotes = document.querySelector("#chat_emotes_capacity_value"), alternative = document.querySelector("#chat_emotes_capacity-value");
  if (alternative == null && emotes != null) {
    emotes.setAttribute("style", "display: none");
    alternative = document.createElement("span");
    alternative.setAttribute("id", "chat_emotes_capacity-value");
    alternative.innerText = module.exports.settings.check("chat_emotes_capacity");
    emotes.after(alternative);
  }

  let explolight = document.querySelector("#explolight");
  if (explolight != null) explolight.disabled = !module.exports.settings.check("explosions");

  if (musict) {
    let sounds = allOptions.find(element => element.querySelector("#music") != null);
    if (sounds != null) t.appendChild(sounds);
    let mselect = E("select");
    mselect.setAttribute("id","music_default");
    mselect.setAttribute("style","margin-right:1%");
    let musiccontent = '<option value="default">Game Music', ls;
    if (window.applyMusic.toString().length > 15) {
      for (let i of window.musiclist) {
        if (window.loaded_soundtrack == i[0]) {
          ls = i[1];
          break;
        }
      }
      if (!ls) ls = window.loaded_soundtrack?"Unknown":"No Music";
      musiccontent += " ("+ls+")";
    }
    musiccontent += '</option>'+musiclist.map(i => '<option value="'+i[0]+'">'+i[1]+'</option>').join("");
    mselect.innerHTML = musiccontent;
    musict.appendChild(mselect);
    let exmusic = E("div");
    exmusic.setAttribute("class","option");
    exmusic.innerHTML = 'External Music <label class="switch"><input type="checkbox" id="ex_enabled"><div class="slider"></div></label><input type="text" placeholder="Music URL" id="ext-music" style="margin-right:1%">';
    musict.after(exmusic);
    for (let i of ["music_default","ext-music","ex_enabled"]) {
      let tgx = document.querySelector("#"+i);
      tgx && tgx.addEventListener("change", function(){window.setMusic(null, true)})
    }
    /* let tInt;
    if (!emusic) tInt = setInterval(function () {
      let socket = Object.values(Object.values(module.exports.settings).find(v => v.mode)).find(v => v.socket);
      if (socket) {
        clearInterval(tInt);
        window.setMusic(true)
      }
    }, 1); */
    window.setMusic(true);
  }

  if (!crystals) {
    crystals = E("div");
    crystals.setAttribute("class", "option");
    crystals.innerHTML = 'Crystals Color <button id="reset-crystals-color" class="donate-btn" style="font-size: 0.5em;float: right;margin: 1%;padding: 1%;margin-top: 0;">Reset</button><input style="cursor:pointer;font-size:.8em;padding:3px5px;color:white;background:hsl(200,60%,15%);border:1pxsolidhsl(200,60%,10%);float:right;vertical-align:middle;width:241px;box-sizing:border-box" type="color" id="crystal-color" placeholder="Default">';
    t.appendChild(crystals);
    let crytalInput = document.querySelector("#crystal-color");
    crytalInput.addEventListener("change", function (e) {
      localStorage.setItem("crystal-color", crytalInput.value);
      crytalInput.value = getCustomCrystalColor()
    });
    document.querySelector("#reset-crystals-color").addEventListener("click", function (e) {
      localStorage.removeItem("crystal-color");
      crytalInput.value = getCustomCrystalColor()
    });
    crytalInput.value = getCustomCrystalColor()
  }

  let lang = allOptions.find(element => element.querySelector("#language") != null);
  if (lang != null) t.appendChild(lang);
};
