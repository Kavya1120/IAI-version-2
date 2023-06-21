"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var moveToStart = exports.moveToStart = function moveToStart(state) {
  return Object.assign({}, state, {
    fwdEnter: "corouselEnterFromRight",
    exitMove: "corouselExitToLeft",
    activeDot: 0,
    isActive: false
  });
};
var moveToEnd = exports.moveToEnd = function moveToEnd(state) {
  return Object.assign({}, state, {
    backEnter: "corouselEnterFromLeft",
    exitMove: "corouselExitToRight",
    activeDot: state.imageList.length - 1,
    isActive: false
  });
};

var forwardClick = exports.forwardClick = function forwardClick(state) {
  return Object.assign({}, state, {
    fwdEnter: "corouselEnterFromRight",
    exitMove: "corouselExitToLeft",
    activeDot: state.currentIdx + 1,
    isActive: false
  });
};

var backwardClick = exports.backwardClick = function backwardClick(state) {
  return Object.assign({}, state, {
    backEnter: "corouselEnterFromLeft",
    exitMove: "corouselExitToRight",
    activeDot: state.currentIdx - 1,
    isActive: false
  });
};