(function(){
  let mode=document.createElement("a");
  mode.setAttribute("href","#");
  mode.setAttribute("style","font-weight:normal");
  mode.innerText="Map Editor";
  mode.addEventListener("click", function() {
    window.open("https://bhpsngum.github.io/starblast/mapeditor/","_blank");
  })
  document.getElementsByClassName("iconsbar editoriconsbar")[0].appendChild(mode);
})();
