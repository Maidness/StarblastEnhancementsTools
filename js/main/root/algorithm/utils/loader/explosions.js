/*
  Toggle explosions (processing code)
*/
let oldExplosion = Explosions.prototype.explode, oldBlast = Explosions.prototype.blast, isExplosionEnabled = function () {
  let precheck = localStorage.getItem("explosion");
  return precheck == null || precheck == "true"
};

Explosions.prototype.explode = function() {
  return isExplosionEnabled() && oldExplosion.apply(this, arguments)
};

Explosions.prototype.blast = function() {
  return isExplosionEnabled() && oldBlast.apply(this, arguments)
};
