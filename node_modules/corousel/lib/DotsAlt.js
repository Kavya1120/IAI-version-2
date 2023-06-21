"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DotsAlt = function DotsAlt(props) {
  return _react2.default.createElement(
    "div",
    { className: "dotsAltRow" },
    _react2.default.createElement(
      "p",
      { className: "dotsAltP" },
      props.data.activeDot + 1
    ),
    _react2.default.createElement("hr", {
      style: {
        width: "20px",
        left: "calc(100% - 25px)",
        position: "absolute"
      }
    }),
    _react2.default.createElement("br", null),
    _react2.default.createElement(
      "p",
      { className: "dotsAltP" },
      props.data.imageList.length
    )
  );
};

exports.default = DotsAlt;