function clickButton(name) {
  //needs a rename...
  let data = document.querySelector(`#${name}`).value;
  createCookie(name, data);
}

function createCookie(name, value) {
  let cookie = [name, "=", JSON.stringify(value), "; path=/;"].join("");
  // let cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

function readCookie(name) {
  let result = document.cookie.match(new RegExp(name + "=([^;]+)"));
  result && (result = JSON.parse(result[1]));
  return result;
}

function deleteCookie(name) {
  document.cookie = [
    name,
    "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/",
  ].join("");
  // document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}
