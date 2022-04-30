(function(){
  let mode=document.createElement("a"), bar = document.getElementsByClassName("iconsbar editoriconsbar")[0];
  mode.setAttribute("href","#");
  mode.setAttribute("style","font-weight:normal");
  mode.setAttribute("data-tooltip","Map Editor");
  mode.innerHTML+='<i class="fa fa-fw fa-table"></i>';
  mode.addEventListener("click", function() {
    window.open("https://bhpsngum.github.io/starblast/mapeditor/","_blank");
  });
  bar.appendChild(mode);
})();
