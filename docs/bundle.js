/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function resize() {
  var body = document.querySelector("body");
  var html = document.querySelector("html");
  var width = window.innerWidth;
  var height = window.innerHeight;
  if (width > height) {
    body.style.fontSize = "2.5vh";
    html.style.fontSize = "2.5vh";
  } else {
    body.style.fontSize = "2.5vw";
    html.style.fontSize = "2.5vw";
  }
}
resize();
window.addEventListener("resize", function () {
  return resize();
});
var game = document.querySelector("#game");
var setings = {
  range: 3,
  fields: [],
  currentPlayer: "x",
  won: false
};
initGame();
function initGame() {
  var title = document.createElement("h1");
  title.textContent = "Крестики-нолики";
  title.classList.add("title");
  game.append(title);
  startButton(game, "Начать игру");
}
function startButton(element, textButton) {
  var button = document.createElement("button");
  button.textContent = textButton;
  button.classList.add("button-start");
  element.append(button);
  button.addEventListener("click", function () {
    setings.fields = [];
    setings.won = false;
    var field = document.querySelector(".field");
    if (field) field.remove();
    var modal = document.querySelector(".modal-background");
    if (modal) modal.remove();
    createGame();
    startGame();
    button.remove();
  });
}
function createGame() {
  var field = document.createElement("div");
  field.classList.add("field");
  game.append(field);
  for (var i = 0; i < setings.range; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    field.append(row);
    for (var k = 0; k < setings.range; k++) {
      var col = document.createElement("div");
      col.classList.add("col");
      row.append(col);
      setings.fields.push({
        x: i,
        y: k
      });
    }
  }
}
function startGame() {
  var cols = document.querySelectorAll(".col");
  cols.forEach(function (col, i) {
    col.addEventListener("click", function () {
      var item = document.createElement("div");
      if (col.textContent !== "" || setings.won === true) return;
      item.textContent = setings.currentPlayer === "x" ? "x" : "o";
      item.classList.add("item");
      var player = setings.currentPlayer === "x" ? "player-x" : "player-o";
      col.classList.add(player);
      col.append(item);
      setings.fields[i] = _objectSpread(_objectSpread({}, setings.fields[i]), {}, {
        mark: setings.currentPlayer
      });
      setings.currentPlayer = setings.currentPlayer === "x" ? "o" : "x";
      checkGame(setings.fields[i]);
    });
  });
}
function checkGame(item) {
  var lengthX = setings.fields.filter(function (field) {
    return field.mark === item.mark && field.x === item.x;
  });
  var lengthY = setings.fields.filter(function (field) {
    return field.mark === item.mark && field.y === item.y;
  });
  var lengthZ1 = setings.fields.filter(function (field) {
    return field.mark === item.mark && field.y === field.x;
  });
  var lengthZ2 = setings.fields.filter(function (field) {
    return field.mark === item.mark && (field.x === 0 && field.y === 2 || field.x === 1 && field.y === 1 || field.x === 2 && field.y === 0);
  });
  if (lengthX.length === 3 || lengthY.length === 3 || lengthZ1.length === 3 || lengthZ2.length === 3) {
    combo(lengthX);
    combo(lengthY);
    combo(lengthZ1);
    combo(lengthZ2);
    setTimeout(function () {
      openModal("\u041F\u043E\u0431\u0435\u0434\u0438\u043B \"".concat(item.mark.toUpperCase(), "\""), "");
      var modalBody = document.querySelector(".modal-body");
      startButton(modalBody, "Сыграть еще");
    }, 1500);
    return;
  }
  var lengthXYZ = setings.fields.filter(function (field) {
    return field.mark === "x" || field.mark === "o";
  });
  if (lengthXYZ.length === 9) {
    openModal("\u041D\u0435\u0442 \u043F\u043E\u0431\u0435\u0434\u0438\u0442\u0435\u043B\u044F", "");
    var modalBody = document.querySelector(".modal-body");
    startButton(modalBody, "Сыграть еще");
  }
}
function openModal(header, body) {
  var bodyTag = document.querySelector("body");
  bodyTag.insertAdjacentHTML("beforeend", "\n    <div class=\"modal-background\">\n      <div class=\"modal\">\n        <div class=\"modal-header\">".concat(header, "</div>\n        <div class=\"modal-body\">").concat(body, "</div>\n      </div>\n    </div>\n    "));
}
function combo(line) {
  if (line.length !== 3) return;
  var cols = document.querySelectorAll(".col");
  line.forEach(function (item) {
    var index = setings.fields.indexOf(item);
    cols[index].firstElementChild.classList.add("strike");
  });
  setings.won = true;
}
/******/ })()
;