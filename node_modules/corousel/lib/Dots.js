"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dots = function Dots(props) {
  return _react2.default.createElement(
    "div",
    { className: "corouselDotsRow" },
    _react2.default.createElement(
      "div",
      {
        className: "corouselDotsCenterer",
        style: { width: props.data.imageList.length * 20 + "px" }
      },
      props.data.imageList.map(function (val, idx) {
        return idx === props.data.activeDot ? _react2.default.createElement("div", {
          key: idx,
          className: "corouselDots",
          style: {
            border: "none",
            backgroundColor: "red",
            boxShadow: "0 0 5px 2px rgba(255,0,0, 0.6)"
          }
        }) : _react2.default.createElement("div", {
          key: idx,
          className: "corouselDots",
          style: {
            backgroundColor: "white"
          }
        });
      })
    )
  );
};

exports.default = Dots;