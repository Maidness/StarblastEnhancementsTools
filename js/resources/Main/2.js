var test = function(string,sample) {
  if (sample == string) return !0;
  let t = module.exports.dict[string] || {};
  for (let i in t) {
    if (t[i] == sample) return !0;
  }
  return !1;
}, E = function (str) {
	return document.createElement(str);
}, isExplosionEnabled = function () {
  let precheck = localStorage.getItem("explosion");
  return precheck == null || precheck == "true"
}, setExplosion = function (bool) {
  let enabled = !!bool;
  let explolight = document.querySelector("#explolight");
  if (explolight) explolight.disabled = !enabled;
  (document.querySelector("#explosion-toggle")||{}).checked = enabled;
  localStorage.setItem("explosion", enabled);
}, oldExplosion = Explosions.prototype.explode, oldBlast = Explosions.prototype.blast, setAnonMode = function (bool, custom, checkbox) {
  bool = !!bool;
  localStorage.setItem("anonMode", bool);
  custom.setAttribute("style", bool ? "display: none" : "");
  checkbox.checked = bool;
  anonText.innerHTML = bool ? "ANON" : "";
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

String.prototype.replaceChar =function(i,a)
{
	return this.substring(0,i)+a+this.substring(i+1,this.length);
};
Explosions.prototype.explode = function() {
  return isExplosionEnabled() && oldExplosion.apply(this, arguments)
};

Explosions.prototype.blast = function() {
  return isExplosionEnabled() && oldBlast.apply(this, arguments)
};

let anonText = E("p");
if (localStorage.getItem("ECPVerified") == "yes") {
  anonText.setAttribute("style", "font-size: 20px; margin: 0; position: absolute; left: -65px; top: 10px; cursor: pointer; padding: 0;color: yellow;");
  anonText.innerHTML = localStorage.getItem("anonMode") == "true" ? "ANON" : "";
  let inputWrapper = document.querySelector("#player .inputwrapper");
  anonText.addEventListener("click", function () {
    inputWrapper.querySelector("img").click()
  });
  inputWrapper.appendChild(anonText)
};

let change;

document.getElementsByClassName("modalbody")[0].addEventListener('DOMSubtreeModified', change=function() {
  this.removeEventListener("DOMSubtreeModified",change);
  let header_title_text = document.getElementsByClassName("modaltitle")[0].innerText;
  switch (true) {
    case test("Changelog",header_title_text):
      this.innerHTML=this.innerHTML.replace(/\*\s([^<]+)(<br>)+/g,function(v) {
        v=v.substring(v.indexOf("*")+1,v.indexOf("<br>"));
        v=v.replaceChar(v.indexOf(" ")+1,v[v.indexOf(" ")+1].toUpperCase());
        return "<ul><li>"+v+"</li></ul>";
      }).replace(/^<p (.+)<\/p>$/g,"<div $1</div>").replace(/(-\s[^<]+)(<br>)+/g, function(v) {
        v=v.substring(0,v.indexOf("<br>"));
        v=v.replaceChar(v.indexOf(" ")+1,v[v.indexOf(" ")+1].toUpperCase());
        return '<p style="margin-inline-start:40px">'+v+"</p>";
      }).replace(/(\+\s[^<]+)(<br>)+/g,'<p style="margin-inline-start:80px">$1</p>');
      break;
    case test("INFO",header_title_text):
      this.innerHTML=this.innerHTML.replace(/\*/g,"•");
      break;
    case test("Your custom game",header_title_text):
      let copy=E("button");
      copy.setAttribute("style","margin:10px");
      copy.setAttribute("class","donate-btn");
      copy.setAttribute("id","copylink");
      copy.innerText="Copy link";
      copy.addEventListener("click", function() {
        document.getElementsByClassName("stats textcentered")[0].getElementsByTagName("input")[0].click();
        document.execCommand('copy');
      });
      if (document.getElementsByClassName("stats textcentered")[0]) {
        let stats=document.getElementsByClassName("stats textcentered")[0];
        stats.insertBefore(copy, stats.childNodes[5]);
        stats.insertBefore(E("br"),stats.childNodes[5]);
      }
      break;
    case test("Modding Space",header_title_text):
      if (document.getElementsByClassName("modecp")[0]) document.getElementsByClassName("modecp")[0].setAttribute("style","z-index:1;position:fixed;left:0;bottom:0");
      if (document.getElementsByClassName("modalbody")[0].childNodes.length > 0) {
        let tx = document.getElementsByClassName("modalbody")[0].childNodes[0];
        if (tx.innerHTML.indexOf("bhpsngum")==-1) tx.innerHTML+="<a href='https://bhpsngum.github.io/starblast/mods/stats/' style='float:right' target='_blank'>View Mod Statistics</a>&nbsp;";
      }
      break;
    case test("Greetings, Elite Commander",header_title_text): {
      let psd=document.querySelector("body > div.modal > div.modalbody > div > div.center");
      if (psd)
      {
        let viewEcp=document.querySelector("#viewEcp");
        let removeEcp=document.querySelector("#removeEcp");
        if (viewEcp) viewEcp.hidden=true;
        if (removeEcp) removeEcp.hidden=true;
        let fakeview=E("button");
        let fakeremove=E("button");
        fakeview.setAttribute("class","ecpinput ecpbtn");
        fakeview.setAttribute("id","viewEcpFake");
        fakeremove.setAttribute("id","removeEcpFake");
        fakeremove.setAttribute("class","ecpinput ecpbtn");
        let ei=E("i"),er=E("i");
        ei.setAttribute("class","fa fa-eye");
        er.setAttribute("class","fa fa-trash");
        fakeview.appendChild(ei);
        fakeremove.appendChild(er);
        function Verify(str,pass)
        {
          let s=prompt(str);
          while (true)
          {
            if (s!=pass)
            {
              if (!s)
              {
                if (s === "") s=prompt("Your password must not be empty!\nPlease try again!");
                else return 0;
              }
              else s=prompt("Sorry, your password is incorrect!\nPlease try again!");
            }
            else return 1;
          }
        }
        function NewPwd(str)
        {
          let npwd="",rnpwd="!",msg=str||"";
          while (npwd!=rnpwd)
          {
            let np=0;
            npwd=prompt(msg+"\nEnter your new password:");
            if (npwd != void 0)
            {
              if (npwd === "") msg="Your new password must not be empty!";
              else np=1;
            }
            else return 0;
            if (np)
            {
              rnpwd=prompt("Confirm your new password:");
              if (rnpwd != void 0)
              {
                if (rnpwd != npwd) msg="Passwords don't match!";
                else
                {
                  if (confirm("Are you sure to make changes to your password?"))
                  {
                    localStorage.setItem("token",npwd);
                    return 1;
                  }
                  else return 0;
                }
              }
              else return 0;
            }
          }
        }
        fakeview.addEventListener("click",function() {
          let key=document.querySelector("#ECPKey");
          let viewEcp=document.querySelector("#viewEcp");
          if (key.value == key.getAttribute("data-value")) viewEcp.click();
          else
          {
            if (localStorage.token === void 0) viewEcp.click();
            else if (Verify("You're about to take action with your ECP\nPlease enter your password to proceed:",localStorage.token)) viewEcp.click();
          }
        });
        fakeremove.addEventListener("click", function(){
          let remove=document.querySelector("#removeEcp");
          if (localStorage.token === void 0) remove.click();
          else if (Verify("You're about to take action with your ECP\nPlease enter your password to proceed:",localStorage.token)) remove.click();
        });
        if (!document.querySelector("#viewEcpFake")) psd.insertBefore(fakeview,psd.childNodes[2]);
        if (!document.querySelector("#removeEcpFake")) psd.appendChild(fakeremove);
        let pwd=E("div"),createPwd=E("button"),changePwd=E("button"),clearPwd=E("button"),forgetPwd=E("button");
        pwd.setAttribute("id","password-panel");
        createPwd.setAttribute("class","donate-btn");
        changePwd.setAttribute("class","donate-btn");
        clearPwd.setAttribute("class","donate-btn");
        forgetPwd.setAttribute("class","donate-btn");
        changePwd.setAttribute("style","margin:10px");
        clearPwd.setAttribute("style","margin:10px");
        forgetPwd.setAttribute("style","margin:10px");
        createPwd.innerText="Create Password Protection";
        changePwd.innerText="Change Password";
        clearPwd.innerText="Clear Password";
        forgetPwd.innerText="Forget password?";
        function add(check)
        {
          pwd.innerHTML="";
          if (check)
          {
            pwd.appendChild(changePwd);
            pwd.appendChild(clearPwd);
            pwd.appendChild(E("br"));
            pwd.appendChild(forgetPwd);
          }
          else pwd.appendChild(createPwd);
        }
        createPwd.addEventListener("click", function() {
          if (NewPwd("Password protection prevents others from taking actions (view, remove) with your ECP key in this device")) add(1);
        });
        clearPwd.addEventListener("click", function() {
          if (Verify("Enter your current password",localStorage.token))
          {
            if (confirm("Are you sure to remove the password?"))
            {
              localStorage.removeItem("token");
              add(0);
            }
          }
        });
        changePwd.addEventListener("click", function() {
          if (Verify("Enter your current password",localStorage.token)) NewPwd();
        });
        forgetPwd.addEventListener("click",function() {
          if (Verify("Forgot the password? Type your ECP code as a password to continue",localStorage.ECPKey))
          {
            if (confirm("Do you want to create a new password?")) NewPwd();
            else
            {
              if (confirm("Or do you want to clear your current password?"))
              {
                localStorage.removeItem("token");
                add(0);
              }
            }
          }
        });
        if (localStorage.token === void 0) add(0);
        else add(1);
        if (!document.querySelector("#password-panel")) {
          psd.appendChild(pwd);
          psd.setAttribute("style", "font-size:inherit")
        }
      }
      if (localStorage.getItem("ECPVerified") == "yes") {
        let anonCheckbox = document.querySelector(".modalbody #anonMode");
        if (anonCheckbox == null) {
          let anonMode = E("div");
          anonMode.setAttribute("class", "options");
          anonMode.innerHTML = 'Anonymous Mode (joining the game as a fully non-ECP ship)<label class="switch"><input type="checkbox" id="anonMode"><div class="slider"></div></label>';
          let infos = document.querySelector(".modalbody .infos");
          if (infos != null) {
            let bef = infos.querySelector("table.customtable.noselect");
            infos.insertBefore(anonMode, bef);
            if (bef != null) {
              anonCheckbox = document.querySelector(".modalbody #anonMode");
              anonCheckbox.addEventListener("change", function () {
                setAnonMode(anonCheckbox.checked, bef, anonCheckbox)
              });
              setAnonMode(localStorage.getItem("anonMode") == "true", bef, anonCheckbox)
            }
          }
        }
      }
      break;
    }
    case test("SETTINGS",header_title_text):
      let t = document.getElementsByClassName("modalbody")[0], emusic, musict, explosiont, explosion, crystals;
      for (let i of t.childNodes) {
        if (i.innerHTML.includes("music") && !t.innerHTML.includes("music_default")) musict = i;
        else if (i.innerHTML.includes("explosion-toggle")) explosiont = i;
        else if (i.innerHTML.includes("explolight")) explosion = i;
        else if (i.innerHTML.includes("ext-music")) emusic = i;
        else if (i.innerHTML.includes("crystal-color")) crystals = i;
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
      break;
  }
  this.addEventListener('DOMSubtreeModified', change);
});
