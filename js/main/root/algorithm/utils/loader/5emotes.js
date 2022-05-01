/*
  Increase the chat emotes capacity to 5
*/

ChatPanel.prototype.typed = Function("return " + ChatPanel.prototype.typed.toString().replace(/>=\s*4/, " >= 5"))();
