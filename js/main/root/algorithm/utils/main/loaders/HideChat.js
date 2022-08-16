/*
  Hide the chat
*/

let chat = ChatBubble.prototype, globalKey = ChatBubble.toString().match(/[0OlI1]{5}/)[0], key = Object.keys(chat).find(k => "function" == typeof chat[k] && chat[k].toString().includes("updateTexture"));

let oldShow = chat[key];

chat[key] = function () {
  if (this[globalKey].settings.check("show_chat")) oldShow.apply(this, arguments)
}
