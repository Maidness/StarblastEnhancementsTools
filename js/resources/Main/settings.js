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

function decorateSettings () {
  let isExplosionEnabled = function () {
    let precheck = localStorage.getItem("explosion");
    return precheck == null || precheck == "true"
  }, setExplosion = function (bool) {
    let enabled = !!bool;
    let explolight = document.querySelector("#explolight");
    if (explolight) explolight.disabled = !enabled;
    (document.querySelector("#explosion-toggle")||{}).checked = enabled;
    localStorage.setItem("explosion", enabled);
  }, getCustomCrystalColor = function () {
    return localStorage.getItem("crystal-color") || ""
  }, setEmotesCapacity = function (num, e, _this) {
    try { num = num == null ? 4 : (Math.trunc(Math.min(Math.max(1, num), 5)) || 4) }
    catch (e) { num = 4 }
    localStorage.setItem("chat_emotes_capacity", num);
    if (_this != null) _this.value = num;
    if (e != null) e.innerText = num
  }, setSelfShipTag = function (bool) {
    bool = !!bool;
    (document.querySelector("#self-ship-tag-toggle") || {}).checked = bool;
    localStorage.setItem("self_ship_tag", bool)
  }, setShowBlank = function (bool) {
    bool = !!bool;
    (document.querySelector("#show-blank-badge-toggle") || {}).checked = bool;
    localStorage.setItem("show_blank_badge", bool)
  };

  let t = document.getElementsByClassName("modalbody")[0], emusic, musict, explosiont, explosion, crystals, emotes, shake, selfTag, showBlank;
  for (let i of t.childNodes) {
    if (i.innerHTML.includes("music") && !t.innerHTML.includes("music_default")) musict = i;
    else if (i.innerHTML.includes("explosion-toggle")) explosiont = i;
    else if (i.innerHTML.includes("explolight")) explosion = i;
    else if (i.innerHTML.includes("ext-music")) emusic = i;
    else if (i.innerHTML.includes("crystal-color")) crystals = i;
    else if (i.innerHTML.includes("emotes-capacity")) emotes = i;
    else if (i.innerHTML.includes("shake")) shake = i;
    else if (i.innerHTML.includes("self-ship-tag")) selfTag = i;
    else if (i.innerHTML.includes("show-blank-badge")) showBlank = i;
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
    explosiont.innerHTML = 'Explosions <label class="switch"><input type="checkbox" id="explosion-toggle"><div class="slider"></div></label>';
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

  if (!emotes && musict) {
    emotes = E("div");
    emotes.setAttribute("class", "option");
    emotes.innerHTML = 'Chat Emotes Capacity <div class="range"><input id="emotes-capacity" type="range" min="1" max="5" value="4" step="1"><span id="emotes-capacity_value" style="display: none"></span><span id="emotes-capacity-value">4</span></div></div>';
    t.insertBefore(emotes, musict);
    let emotesInput = document.querySelector("#emotes-capacity"), emVal = document.querySelector("#emotes-capacity-value");
    emotesInput.addEventListener("input", function () {
      setEmotesCapacity(emotesInput.value, emVal, emotesInput)
    });
    setEmotesCapacity(localStorage.getItem("chat_emotes_capacity"), emVal, emotesInput)
  }

  if (!selfTag && shake) {
    selfTag = E("div");
    selfTag.setAttribute("class", "option");
    selfTag.innerHTML = 'Self-ship Tag <label class="switch"><input type="checkbox" id="self-ship-tag-toggle"><div class="slider"></div></label>';
    t.insertBefore(selfTag, shake);
    let selftagswitch = document.querySelector("#self-ship-tag-toggle");
    selftagswitch.addEventListener("change", function (e) {
      setSelfShipTag(selftagswitch.checked)
    });
    setSelfShipTag(localStorage.getItem("self_ship_tag") == "true")
  }

  if (!showBlank && shake) {
    showBlank = E("div");
    showBlank.setAttribute("class", "option");
    showBlank.innerHTML = 'Show Blank Badges <label class="switch"><input type="checkbox" id="show-blank-badge-toggle"><div class="slider"></div></label>';
    t.insertBefore(showBlank, shake);
    let showblankswitch = document.querySelector("#show-blank-badge-toggle");
    showblankswitch.addEventListener("change", function (e) {
      setShowBlank(showblankswitch.checked)
    });
    setShowBlank(localStorage.getItem("show_blank_badge") == "true")
  }
};
