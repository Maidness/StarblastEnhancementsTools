let SP = ShipEditor.prototype, ratio = 50;
SP.getCameraRatio = function () {
  let size = window.getComputedStyle(document.querySelector("#insiderenderpanel>canvas"));
  this.camera_ratio = {
    x: parseFloat(size.width) / window.innerWidth / this.zoom / ratio,
    y: parseFloat(size.height) / window.innerHeight / this.zoom / ratio,
  }
};
let setRotation = function (bool) {
  bool = !!bool;
  window.isRotating = bool;
  b.setAttribute("style", !bool ? "background: grey": "");
  a.setAttribute("style", bool ? "background: grey": "")
};
SP.mouseMove = Function("return " + SP.mouseMove.toString().replace(/return\s([^]+);*}$/, `return window.isRotating ? (!this.camera && (this.camera = Object.values(this).find(v => v && String(v.type).includes("Camera"))), this.getCameraRatio(this), this.camera.position.x -= e.movementX * this.camera_ratio.x, this.camera.position.y += e.movementY * this.camera_ratio.y) : ($1)}`))();
let a = document.createElement("a"), b = document.createElement("a");
a.setAttribute("id", "dragMode");
a.setAttribute("href", "#");
a.setAttribute("data-tooltip", "Drag Mode");
a.innerHTML = "<i class='fa fa-fw fa-arrows'></i>";
a.addEventListener("click", function (e) {
  setRotation(true);
});
b.setAttribute("id", "rotateMode");
b.setAttribute("href", "#");
b.setAttribute("data-tooltip", "Rotate Mode");
b.innerHTML = "<i class='fa fa-fw fa-sync'></i>";
b.addEventListener("click", function (e) {
  setRotation(false)
});
setRotation(false);
document.querySelector(".rendericonsbar").appendChild(a).parentElement.appendChild(b);
