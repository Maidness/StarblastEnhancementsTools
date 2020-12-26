(function(){
  let mode=document.createElement("a");
  mode.setAttribute("href","#");
  mode.setAttribute("style","font-weight:normal");
  mode.setAttribute("data-tooltip","Mods Archive");
  mode.innerHTML+='<i class="fa fa-fw fa-archive"></i>';
  mode.addEventListener("click", function() {
    window.open("https://bhpsngum.github.io/starblast/mods/","_blank");
  });
  document.getElementsByClassName("iconsbar editoriconsbar")[0].appendChild(mode);
})();
