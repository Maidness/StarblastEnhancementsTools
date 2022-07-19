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
}, setAnonMode = function (bool, custom, checkbox, sprev) {
  bool = !!bool;
  localStorage.setItem("anonMode", bool);
  custom.setAttribute("style", bool ? "display: none" : "");
  sprev.setAttribute("style", bool ? "display: none" : "");
  checkbox.checked = bool;
};

let injectStyle = E("style");
injectStyle.innerHTML = 'div#anonToggle { margin-bottom: 10px } input#crystal-color { font-size:.8em;padding:3px 5px;color:white;background:hsl(200,60%,15%);border:1px solid hsl(200,60%,10%);float:right;vertical-align:middle;width:241px;box-sizing:border-box } button#reset-crystals-color { font-size: 0.5em;float: right;margin: 1%;padding: 1%;margin-top: 0 } select#music_default, input#ext-music { margin-right: 1% } button#copylink { margin: 0 } .gamemodes { top: -50px } .gamemodes #colors { margin-top: 5px }';
document.head.appendChild(injectStyle);

let change;

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
            document.getElementsByClassName("textcentered")[1].innerHTML+='<br><button id="copylink" class="donate-btn">Copy link</button>';
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
      decorateSettings();
      break;
  }
  this.addEventListener('DOMSubtreeModified', change);
});

let gamemodechange, infos = document.querySelector(".gamemodes"), obs = new MutationObserver(function() {
  let customdiv = infos.lastElementChild;
  if (customdiv == null) return;
  let anonCheckbox = infos.querySelector("#anonMode");
  if (anonCheckbox == null) {
    let anonMode = E("div");
    anonMode.setAttribute("id", "anonToggle");
    anonMode.innerHTML = 'Anonymous Mode <label class="switch"><input type="checkbox" id="anonMode"><div class="slider"></div></label>';
    let bef = Array.prototype.slice.call(customdiv.querySelectorAll("tr"), -1)[0], shippreview = infos.querySelector(".shippreview");
    if (bef == null || shippreview == null) return;
    infos.insertBefore(anonMode, customdiv);
    if (bef != null) {
      anonCheckbox = infos.querySelector("#anonMode");
      anonCheckbox.addEventListener("change", function () {
        setAnonMode(anonCheckbox.checked, bef, anonCheckbox, shippreview)
      });
      setAnonMode(localStorage.getItem("anonMode") == "true", bef, anonCheckbox, shippreview);
      obs.disconnect()
    }
  }
  scrollECP(true)
});

obs.observe(infos, { attributes: true, childList: true, subtree: true });
