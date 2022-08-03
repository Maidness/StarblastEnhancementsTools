/*
  Hide the chat
*/

let chat = ChatPanel.prototype;

let show = Object.keys(chat).find(k => "function" == typeof chat[k] && chat[k].toString().match(/this\.shown\s*=\s*\!0/));

let oldShow = chat[show];

chat[show] = function () {
  if (localStorage.getItem("hide-chat") == "true") this.hide();
  else oldShow.apply(this, arguments)
}
