/*
  Toggle explosions (processing code)
*/

let oldExplosion = Explosions.prototype.explode, oldBlast = Explosions.prototype.blast;

let globalVal = oldExplosion.toString().match(/this\.([0OlI1\.]+)\.settings\.check/)[1].split(".");


Explosions.prototype.isEnabled = function () {
  let _this = this;
  for (let i of globalVal) _this = _this[i];
  return _this.settings.check("explosions")
};

Explosions.prototype.explode = function() {
  return this.isEnabled() && oldExplosion.apply(this, arguments)
};

Explosions.prototype.blast = function() {
  return this.isEnabled() && oldBlast.apply(this, arguments)
};
