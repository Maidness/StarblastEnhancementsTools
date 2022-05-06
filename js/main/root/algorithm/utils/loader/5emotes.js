/*
  Increase the chat emotes capacity to 5, also freely to change the emote capacity
*/
ChatPanel.prototype.getEmotesCapacity = function () {
  let num = localStorage.getItem("chat_emotes_capacity");
  try { return num == null ? 4 : (Math.trunc(Math.min(Math.max(1, num), 5)) || 4) }
  catch (e) { return 4 }
};
ChatPanel.prototype.typed = Function("return " + ChatPanel.prototype.typed.toString().replace(/>=\s*4/, " >= this.getEmotesCapacity()"))();
