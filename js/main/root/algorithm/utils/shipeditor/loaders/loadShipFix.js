let element = document.querySelector(".loadship");
if (element) {
  let clone = $(element.outerHTML)[0];
  let loadShip = clone.querySelector("#loadShip");
  loadShip.setAttribute("accept", "text/*, .coffee");
  loadShip.addEventListener("change", function (e) {
    let file = e.target.files[0];
    if (file == null) return;
    if (!(file.type.match(/^text\//) != null || file.name.endsWith(".coffee"))) return alert("Wrong file type. Only text-based files are supported.");
    let reader = new FileReader();
    reader.addEventListener("load", function (e) {
      let result = (reader.target || reader).result;
      if (result) ace.edit("editor").setValue(result);
    });
    reader.readAsText(file);
    loadShip.value = null
  }, false);
  element.parentNode.replaceChild(clone, element)
}
