window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();
let mode=document.createElement("a");
mode.setAttribute("href","#");
mode.setAttribute("style","font-weight:normal");
mode.innerText="Map Creator";
mode.addEventListener("click", function() {
  window.open(browser.runtime.getURL("/html/tools/moddingtools/MapCreator/mapcreator.html"));
})
document.getElementsByClassName("iconsbar editoriconsbar")[0].appendChild(mode);
