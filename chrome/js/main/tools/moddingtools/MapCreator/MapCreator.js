let mode=document.createElement("a");
mode.setAttribute("href","#");
mode.setAttribute("style","font-weight:normal");
mode.innerText="Map Creator";
mode.addEventListener("click", function() {
  window.open(chrome.runtime.getURL("/html/tools/moddingtools/MapCreator/mapcreator.html"));
})
document.getElementsByClassName("iconsbar editoriconsbar")[0].appendChild(mode);
