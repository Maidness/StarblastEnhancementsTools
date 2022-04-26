var locale=null, dict = module.exports.dict, test = function(string,sample) {
  if (sample == string) {
    locale = null;
    return !0;
  };
  let t = dict[string] || {};
  for (let i in t) {
    if (t[i] == sample) {
      locale = i;
      return !0;
    }
  };
  locale = null;
  return !1;
}, localtest = function() {
  test("PLAY",document.querySelector(".choices").childNodes[0].innerText);
}, E = function (str) {
	return document.createElement(str);
}, isExplosionEnabled = function () {
  let precheck = localStorage.getItem("explosion");
  return precheck == null || precheck == "true"
}, setExplosion = function (bool) {
  let enabled = !!bool;
  let explolight = document.querySelector("#explolight");
  if (explolight) console.log("set"),explolight.disabled = !enabled;
  (document.querySelector("#explosion-toggle")||{}).checked = enabled;
  localStorage.setItem("explosion", enabled);
}, oldExplosion = Explosions.prototype.explode, setAnonMode = function (bool, custom, checkbox) {
  bool = !!bool;
  localStorage.setItem("anonMode", bool);
  custom.setAttribute("style", bool ? "display: none" : "");
  checkbox.checked = bool;
};

Explosions.prototype.explode = function() {
  return isExplosionEnabled() && oldExplosion.apply(this, arguments)
};

let CrystalObject;
for (let i in window) try {
    let val = window[i];
    if ("function" == typeof val.prototype.createModel && val.prototype.createModel.toString().includes("Crystal")) CrystalObject = val;
    else if ("function" == typeof val && val.toString().includes('name:"join"')) {
      let proto = val.prototype;
      window[i] = Function("return " + val.toString().replace(/\:([^,]+\.custom[^,]*),/, ": localStorage.getItem('anonMode') == 'true' ? null : $1,"))();
      window[i].prototype = proto;
      proto.constructor = window[i]
    }
}
catch (e) {}

let oldModel = CrystalObject.prototype.getModelInstance, getCustomCrystalColor = function () {
  return localStorage.getItem("crystal-color") || ""
};

CrystalObject.prototype.getModelInstance = function () {
  let res = oldModel.apply(this, arguments);
  let color = getCustomCrystalColor();
  if (color) this.material.color.set(color);
  return res
};

document.getElementsByClassName("modalbody")[0].addEventListener('DOMSubtreeModified', change=function() {
  this.removeEventListener("DOMSubtreeModified",change);
  let header_title_text = document.getElementsByClassName("modaltitle")[0].innerText;
  switch (true) {
    case header_title_text == "":
      let title=document.getElementsByClassName("modaltitle")[0];
      localtest();
      if (this.innerHTML)
      {
        if (document.getElementsByClassName("alphacentauri")[0]) title.innerText="Alpha Wars events";
        else if (!this.childNodes[0].innerText.includes(dict["Please insert your room link in the box below."][locale]||"Please insert your room link in the box below."))
        {
          title.innerText=dict["Your custom game"][locale]||"Your custom game";
          setTimeout(function() {
            document.getElementsByClassName("textcentered")[1].innerHTML+='<br><button id="copylink" style="margin:0px" class="donate-btn">Copy link</button>';
            document.querySelector("#copylink").addEventListener("click", function() {
              document.getElementsByClassName("textcentered")[1].getElementsByTagName("input")[0].click();
              document.execCommand('copy');
            })
          },500);
        }
        else title.innerText=dict["JOIN GAME"][locale]||"Join game";
      }
      break;
    case test("SETTINGS",header_title_text):
      let t = document.getElementsByClassName("modalbody")[0], emusic, musict, explosiont, explosion, crystals;
      for (let i of t.childNodes) {
        if (i.innerHTML.includes("music") && !t.innerHTML.includes("music_default")) musict = i;
        else if (i.innerHTML.includes("explosion-toggle")) explosiont = i;
        else if (i.innerHTML.includes("explolight")) explosion = i;
        else if (i.innerHTML.includes("ext-music")) emusic = i;
        else if (i.innerHTML.includes("crystal-color")) crystals = i
      }
      if (musict) {
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
        t.insertBefore(exmusic, musict.nextSibling);
        for (let i of ["music_default","ext-music","ex_enabled"]) {
          let tgx = document.querySelector("#"+i);
          tgx && tgx.addEventListener("change", function(){setMusic(null, true)})
        }
        let tInt;
        if (!emusic) tInt = setInterval(function () {
          let socket = Object.values(Object.values(module.exports.settings).find(v => v.mode)).find(v => v.socket);
          if (socket) {
            clearInterval(tInt);
            window.setMusic(true)
          }
        }, 1);
      }

      if (!explosiont && explosion) {
        explosiont = E("div");
        explosiont.setAttribute("class", "option");
        explosiont.innerHTML = 'Explosion <label class="switch"><input type="checkbox" id="explosion-toggle"><div class="slider"></div></label>';
        t.insertBefore(explosiont, explosion);
        let exploswitch = document.querySelector("#explosion-toggle");
        exploswitch.addEventListener("change", function (e) {
          setExplosion(exploswitch.checked)
        });
        setExplosion(isExplosionEnabled())
      }

      if (!crystals && explosion) {
        crystals = E("div");
        crystals.setAttribute("class", "option");
        crystals.innerHTML = 'Crystals Color <button id="reset-crystals-color" class="donate-btn" style="font-size: 0.5em;float: right;margin: 1%;padding: 1%;margin-top: 0;">Reset</button><input style="cursor:pointer;font-size:.8em;padding:3px5px;color:white;background:hsl(200,60%,15%);border:1pxsolidhsl(200,60%,10%);float:right;vertical-align:middle;width:241px;box-sizing:border-box" type="color" id="crystal-color" placeholder="Default">';
        t.insertBefore(crystals, t.lastElementChild);
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
      break;
  }
  this.addEventListener('DOMSubtreeModified', change);
});

let anonInt = setInterval(function() {
  let infos = document.querySelector(".gamemodes"), customdiv = infos.lastElementChild;
  if (customdiv == null) return;
  let anonCheckbox = infos.querySelector("#anonMode");
  if (anonCheckbox == null) {
    let anonMode = E("div");
    anonMode.setAttribute("style", "margin-bottom: 10px");
    anonMode.innerHTML = 'Anonymous Mode <label class="switch"><input type="checkbox" id="anonMode"><div class="slider"></div></label>';
    let bef = Array.prototype.slice.call(customdiv.querySelectorAll("tr"), -1)[0];
    if (bef == null) return;
    infos.insertBefore(anonMode,  customdiv);
    if (bef != null) {
      anonCheckbox = infos.querySelector("#anonMode");
      anonCheckbox.addEventListener("change", function () {
        setAnonMode(anonCheckbox.checked, bef, anonCheckbox)
      });
      setAnonMode(localStorage.getItem("anonMode") == "true", bef, anonCheckbox);
      clearInterval(anonInt)
    }
  }
}, 1)
