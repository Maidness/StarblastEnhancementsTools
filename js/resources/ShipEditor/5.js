(function(){
  var needCopy = false;
  window.copy_image = function() {return needCopy = true};
  window.copyImage = async function() {
    const t = await window.fetch(document.querySelector("#insiderenderpanel > canvas").toDataURL());
    var img = await t.blob();
    await navigator.clipboard.write([new ClipboardItem({[img.type]:img})]);
  };
  var t = window.makeScreenshot;
  window.makeScreenshot = function() {
    if (needCopy) {
      needCopy = false;
      window.copyImage();
    }
    else t();
  }
})();
