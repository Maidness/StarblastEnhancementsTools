/*
  Increase the chat emotes capacity to 5, also freely to change the emote capacity
*/

let globalVal = ChatPanel.toString().match(/[0OlI1]{5}/)[0];
ChatPanel.prototype.getEmotesCapacity = function () {
  let num = this[globalVal].settings.get("chat_emotes_capacity");
  try { return (num == null || isNaN(num)) ? 4 : (Math.trunc(Math.min(Math.max(1, num), 5)) || 4) }
  catch (e) { return 4 }
};
ChatPanel.prototype.typed = Function("return " + ChatPanel.prototype.typed.toString().replace(/>=\s*4/, " >= this.getEmotesCapacity()"))();
