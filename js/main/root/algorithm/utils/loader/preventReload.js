/*
 * Prevent the page from suddenly reloading
 */

 let x = Object.values(module.exports.settings).find(v => v && v.mode), t = Object.values(x).find(v => v && v.countdown);
 if (!t) return;
 let oldCountdown = t.countdown, TimeoutId = String(oldCountdown).match(/,\s*this\.(.+)\s*=\s*setTimeout\(/)[1];
 t.countdown = function () {
   if (!x.pending_respawn) return clearTimeout(this[TimeoutId]);
   return oldCountdown.apply(this, arguments)
 }
