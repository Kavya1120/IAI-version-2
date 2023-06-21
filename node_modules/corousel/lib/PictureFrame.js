"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Dots = require("./Dots");

var _Dots2 = _interopRequireDefault(_Dots);

var _DotsAlt = require("./DotsAlt");

var _DotsAlt2 = _interopRequireDefault(_DotsAlt);

require("./carousel.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PictureFrame = function PictureFrame(props) {
  var data = props.state;

  var legendHandler = function legendHandler() {
    if (data.legendType === "numbers") {
      return _react2.default.createElement(_DotsAlt2.default, { data: data });
    } else if (data.imageList.length > 15) {
      return _react2.default.createElement(_DotsAlt2.default, { data: data });
    } else {
      return _react2.default.createElement(_Dots2.default, { data: data });
    }
  };

  return _react2.default.createElement(
    "div",
    {
      className: "corouselContainer",
      style: { width: data.width, height: data.height }
    },
    _react2.default.createElement("img", {
      "data-id": "backward-image",
      className: data.backEnter,
      src: data.imageList[data.backIdx],
      alt: "carousel entering"
    }),
    _react2.default.createElement("img", {
      "data-id": "current-image",
      className: data.exitMove,
      src: data.imageList[data.currentIdx],
      alt: "carousel exiting"
    }),
    _react2.default.createElement("img", {
      "data-id": "forward-image",
      className: data.fwdEnter,
      src: data.imageList[data.forwardIdx],
      alt: "carousel exiting"
    }),
    legendHandler(),
    _react2.default.createElement(
      "div",
      {
        className: "corouselLeft",
        onClick: function onClick(evt) {
          if (data.isActive) {
            props.carouselClick(evt);
          }
        }
      },
      _react2.default.createElement(
        "div",
        { className: "corouselLeftButton" },
        _react2.default.createElement("div", { className: "corouselLeftIcon1" }),
        _react2.default.createElement("div", { className: "corouselLeftIcon2" })
      )
    ),
    _react2.default.createElement(
      "div",
      {
        className: "corouselRight",
        onClick: function onClick(evt) {
          if (data.isActive) {
            props.carouselClick(evt);
          }
        }
      },
      _react2.default.createElement(
        "div",
        { className: "corouselRightButton" },
        _react2.default.createElement("div", { className: "corouselRightIcon1" }),
        _react2.default.createElement("div", { className: "corouselRightIcon2" })
      )
    )
  );
};

exports.default = PictureFrame;