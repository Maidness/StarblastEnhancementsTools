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
      let t = document.getElementsByClassName("modalbody")[0], musict;
      for (let i of t.childNodes) {
        if (i.innerHTML.includes("music") && !t.innerHTML.includes("music_default")) {
          musict = i;
          break;
        }
      }
      if (musict) {
        let mselect = E("select");
        mselect.setAttribute("id","music_default");
        mselect.setAttribute("style","margin-right:1%");
        mselect.innerHTML = '<option value="default">(Default)</option>'+musiclist.map(i => '<option value="'+i[0]+'">'+i[1]+'</option>').join("");
        musict.appendChild(mselect);
        let exmusic = E("div");
        exmusic.setAttribute("class","option");
        exmusic.innerHTML = 'External Music <label class="switch"><input type="checkbox" id="ex_enabled"><div class="slider"></div></label><input type="text" placeholder="Music URL" id="ext-music" style="margin-right:1%">';
        t.insertBefore(exmusic, musict.nextSibling);
        for (let i of ["music_default","ext-music","ex_enabled"]) {
          let tgx = document.querySelector("#"+i);
          tgx && tgx.addEventListener("change", function(){setMusic(null, true)})
        }

      }
      window.setMusic(true);
      break;
  }
  this.addEventListener('DOMSubtreeModified', change);
});
