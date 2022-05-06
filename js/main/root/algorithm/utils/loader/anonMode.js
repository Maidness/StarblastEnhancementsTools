/*
  Toggle anonymous mode (processing code)
*/

for (let i in window) try {
  let val = window[i];
  if ("function" == typeof val && val.toString().includes('name:"join"')) {
    let proto = val.prototype;
    window[i] = Function("return " + val.toString().replace(/ecp_key:([^,]+,)/, "ecp_key: localStorage.getItem('anonMode') == 'true' ? null : $1").replace(/steamid:([^,]+,)/, "steamid: localStorage.getItem('anonMode') == 'true' ? null : $1").replace(/bonus:([^,]+,)/, "bonus: localStorage.getItem('ECPVerified') == 'yes' && /([0-9a-f]{5})-([0-9a-f]{5})/.test(localStorage.getItem('ECPKey')) && localStorage.getItem('anonMode') == 'true' ? true : $1"))();
    window[i].prototype = proto;
    proto.constructor = window[i];
    break
  }
} catch (e) {};
