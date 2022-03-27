/*
* Parse the UI more properly to prevent FPS drops causing by FPS
*/

let MUIP = ModdingUIComponent.prototype, hide = MUIP.hide, set = ModdingMode.prototype.setUIComponent, specs = ModdingUIComponent.toString().match(/,\s*this.([^=]+?\s*).add/)[1].split("."),
getGroup = function (_this) {
  for (let spec of specs) _this = _this[spec];
  return _this
}, isHidden = function (ui) {
  return (!Array.isArray(ui.components) || ui.components.filter(i => ["round", "box", "player", "text"].includes((i||{}).type)).length == 0) && !ui.clickable
};

GenericMode.prototype.setUIComponent = ModdingMode.prototype.setUIComponent = function(ui) {
  if (ui == null) ui = {visible: false};
  if (!Array.isArray(ui.position)) ui.position = [];
  let idealPos = [0, 0, 100, 100], pos = [];
  if (ui.visible != null && !ui.visible) pos = [0,0,0,0];
  else for (let i = 0; i < idealPos.length; ++i) pos.push(ui.position[i] == null || isNaN(ui.position[i]) ? idealPos[i] : +ui.position[i]);
  ui.position = pos;
  if (!(ui.visible != null && !ui.visible || isHidden(ui)) || (this.ui_components != null && this.ui_components[ui.id])) return set.call(this, ui)
};

MUIP.interfaceHidden = function () {
  return this.interface_hidden = !0, hide.apply(this, arguments)
};

MUIP.hide = function () {
  if (!this.firstHide) {
    this.shown = this.firstHide = true
  }
  let shown = this.shown, result = hide.apply(this, arguments);
  if (shown) {
    return setTimeout(function (t){
      if (!t.shown) {
        getGroup(t).remove(t);
        if (t[specs[0]].mode.ui_components != null) delete t[specs[0]].mode.ui_components[t.component.id]
      }
    }, 1e3, this)
  }
  return result
};

let key = Object.keys(MUIP).find(key => "function" == typeof MUIP[key] && MUIP[key].toString().includes("this.shown=!0")), show = MUIP[key];
MUIP[key] = function () {
  if (isHidden(this.component)) return this.hide();
  let group = getGroup(this);
  if (!this.shown) return !group.children.includes(this) && group.add(this, this.component.position), show.call(this, arguments)
};
