/*
* Parse the UI more properly to prevent FPS drops causing by FPS
*/

'use strict';

const toString = function (value) {
  try { return String(value) } catch (e) { return "" }
};

let parseUI = function (UI) {
  try { UI = new Object(JSON.parse(JSON.stringify(UI))) } catch (e) { UI = {} }

  let parsedUI = {
   id: toString(UI.id),
   position: UI.position,
   visible: UI.visible,
   clickable: UI.clickable,
   shortcut: UI.shortcut,
   components: UI.components
  };

  if (parsedUI.visible || parsedUI.visible == null) {
   delete parsedUI.visible;
   let position = parsedUI.position, count = 0;
   for (let i = 0 ; i < 4 ; i++) {
     let pos = position?.[i];
     if (pos == null || pos == 100) count++
   };
   if (count == 4) delete parsedUI.position
  }
  else {
   parsedUI.position = [0,0,0,0];
   parsedUI.visible = false;
   delete parsedUI.components
  };

  if (!parsedUI.clickable) {
   delete parsedUI.clickable;
   delete parsedUI.shortcut
 };

  return parsedUI
};

let ors = GenericMode.prototype.setUIComponent;
GenericMode.prototype.setUIComponent = ModdingMode.prototype.setUIComponent = function(ui) {
  return ors.call(this, parseUI(ui))
}
