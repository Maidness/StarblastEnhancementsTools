(function(){
  try {
    window.copy_image();
    document.querySelector("#exportPNG").click();
  }
  catch(e){console.log(e);showErrorBox("exclamation-triangle","Failed to copy the image",null,"Image Copier")}
})();
