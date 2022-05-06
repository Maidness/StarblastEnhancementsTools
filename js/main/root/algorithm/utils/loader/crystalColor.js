/*
 * change crystal color (processing code)
 */

let CrystalObject;
for (let i in window) try {
    let val = window[i];
    if ("function" == typeof val.prototype.createModel && val.prototype.createModel.toString().includes("Crystal")) {
      CrystalObject = val;
      break
    }
}
catch (e) {}

let oldModel = CrystalObject.prototype.getModelInstance, getCustomCrystalColor = function () {
  return localStorage.getItem("crystal-color") || ""
};

CrystalObject.prototype.getModelInstance = function () {
  let res = oldModel.apply(this, arguments);
  let color = getCustomCrystalColor();
  if (color) this.material.color.set(color);
  return res
};
