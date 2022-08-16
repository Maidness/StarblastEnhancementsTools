/*
  Show ship tag under ship controlling by the client
*/

let color = /([^,]+)("hsla\(180,100%,75%,\.75\)")/, shipTag, updateTag;

for (let i in window) try {
  let val = window[i].prototype;
  if (val != null) {
    for (let j in val) {
      let func = val[j];
      if ("function" == typeof func && func.toString().match(color)) {
        shipTag = i;
        let t;
        updateTag = Object.keys(val).find(f => "function" == typeof val[f] && (t = (val[f].toString().match(/===(\w+\.[^,]+)\.hue/) || [])[1]));
        val[updateTag] = Function("return " + val[updateTag].toString().replace(/(\.id)/, "$1, this.selfShip = this.shipid == " + t + ".id"))();
        val[j] = Function("return " + func.toString().replace(color, "$1 this.selfShip ? 'hsla(120, 100%, 75%, .75)' : $2"))()
      }
    }
  }
}
catch (e) {}

let sceneObj = Object.getPrototypeOf(Object.values(Object.values(module.exports.settings).find(v => v && v.mode)).find(v => v && v.background)), Scene = sceneObj.constructor;

let prototypes = Scene.prototype;

let stringScene = Scene.toString();

let hueCheck = stringScene.match(/(\w+)\.hue/)[1];

let object = stringScene.match(/(\w+)\.add\(/)[1];

let counterpart = stringScene.match(/chat_bubble\.(\w+)/)[1];

Scene = Function("return " + stringScene.replace(/\}$/, ", this.welcome || (this.ship_tag = new " + shipTag + "(Math.floor(360 * this." + hueCheck + ".hue)), this." + object + ".add(this.ship_tag." + counterpart + "))}"))();

Scene.prototype = prototypes;
Scene.prototype.constructor = Scene;

sceneObj.constructor = Scene;

Scene.prototype.updateShipTag = function () {
  if (this.ship_tag != null) {
    if (!this.shipKey) {
      this.shipKey = Object.keys(this).find(k => this[k] && this[k].ships);
      let val = this[this.shipKey];
      this.statusKey = Object.keys(val).find(k => val[k] && val[k].status);
    }
    let globalAttr = this[hueCheck], status = this[this.shipKey][this.statusKey];
    this.ship_tag[updateTag](globalAttr, globalAttr.names.get(status.status.id), status.status, status.instance);
    let pos = this.ship_tag[counterpart].position;
    pos.x = status.status.x;
    pos.y = status.status.y - 2 - status.type.radius;
    pos.z = 1;
    this.ship_tag[counterpart].visible = localStorage.getItem("self_ship_tag") == "true" && status.status.alive && !status.status.guided;
  }
};

let sceneUpdate = Object.keys(prototypes).find(k => "function" == typeof prototypes[k] && prototypes[k].toString().includes("render"));

Scene.prototype[sceneUpdate] = Function("return " + Scene.prototype[sceneUpdate].toString().replace(/(\w+\.render)/, "this.updateShipTag(), $1"))();

let t = function (...args) {
  return module.exports.translate(...args)
};

for (let i in window) try {
  let val = window[i];
  if ("function" == typeof val.prototype.refused) for (let j in val.prototype) {
    let f = val.prototype[j];
    if ("function" == typeof f && f.toString().includes("new Scene")) val.prototype[j] = Function("Scene", "t", "return " + f.toString())(Scene, t);
  }
}
catch (e) {}
