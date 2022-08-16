/*
  Show correct names and custom in every cases
*/

let oldNameSet = Names.prototype.set.toString();

let customVal = oldNameSet.match(/=\s*(\w+)\.custom/)[1];

let a = oldNameSet.match(/\w+\s*={2,3}\s*this\.(.+?)\.[^&]+/), globalVal = a[1], condition = a[0];

Names.prototype.set = Function("return " + oldNameSet.replace(/return\s+[^]+?\)/, "return " + condition + " ? (this." + globalVal + ".player_name = " + customVal + ".player_name, Object.values(this." + globalVal + ").find(function(a) { return a && a.additional_badges }).custom = " + customVal + ".custom || {})"))();
