(function(){
  let mode=document.createElement("a");
  mode.setAttribute("href","#");
  mode.setAttribute("style","font-weight:normal");
  mode.setAttribute("data-tooltip","Starblast Modding NPM");
  mode.innerHTML+='<i class="fa fa-fw fa-code"></i>';
  mode.addEventListener("click", function() {
    window.open("https://npmjs.com/package/starblast-modding","_blank");
  });
  document.getElementsByClassName("iconsbar editoriconsbar")[0].appendChild(mode);
})();
