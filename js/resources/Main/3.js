locale=null, dict = module.exports.dict, test = function(string,sample) {
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
};
document.getElementsByClassName("modalbody")[0].addEventListener('DOMSubtreeModified', change=function() {
  this.removeEventListener("DOMSubtreeModified",change);
  switch (document.getElementsByClassName("modaltitle")[0].innerText) {
    case "":
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
  }
  this.addEventListener('DOMSubtreeModified', change);
});
