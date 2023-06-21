"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PictureFrame = require("./PictureFrame");

var _PictureFrame2 = _interopRequireDefault(_PictureFrame);

var _slideActions = require("./slideActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Carousel = function (_React$Component) {
  _inherits(Carousel, _React$Component);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

    _this.state = {
      height: '100%',
      width: '100%',
      legendType: "dots",
      imageList: _typeof(_this.props.images) === "object" ? _this.props.images : 0,
      fwdEnter: "corouselQueuedImage",
      backEnter: "corouselQueuedImage",
      exitMove: "corouselImageInit",
      backIdx: _typeof(_this.props.images) === "object" ? _this.props.images.length - 1 : 0,
      currentIdx: 0,
      forwardIdx: 1,
      activeDot: 0,
      isActive: true
    };

    _this.carouselClick = _this.carouselClick.bind(_this);
    _this.carouselApi = _this.carouselApi.bind(_this);
    return _this;
  }

  _createClass(Carousel, [{
    key: "carouselClick",
    value: function carouselClick(evt) {
      var _this2 = this;

      // timeout is same length as CSS slide animation
      // so the image sliding out changes it's background
      // AFTER it's out of view
      var next = void 0,
          back = void 0,
          current = void 0;
      if (evt.target.className[8] === "R") {
        // check if we're at end of array, if so show 0 again
        if (this.state.currentIdx === this.state.imageList.length - 1) {
          next = 1;
          current = 0;
          back = this.state.imageList.length - 1;

          this.setState((0, _slideActions.moveToStart)(this.state));
        } else {
          back = this.state.currentIdx;
          current = this.state.forwardIdx;

          if (this.state.forwardIdx === this.state.imageList.length - 1) {
            next = 0;
          } else {
            next = this.state.forwardIdx + 1;
          }

          this.setState((0, _slideActions.forwardClick)(this.state));
        }
      } else if (evt.target.className[8] === "L") {
        // check if we're at start of image array, if so show image at arr[n]
        if (this.state.currentIdx === 0) {
          next = 0;
          current = this.state.imageList.length - 1;
          back = this.state.imageList.length - 2;

          this.setState((0, _slideActions.moveToEnd)(this.state));
        } else {
          next = this.state.currentIdx;
          current = this.state.currentIdx - 1;

          if (this.state.backIdx === 0) {
            back = this.state.imageList.length - 1;
          } else {
            back = this.state.backIdx - 1;
          }

          this.setState((0, _slideActions.backwardClick)(this.state));
        }
      }
      // reset shared properties
      // same length as css transition
      setTimeout(function () {
        _this2.setState(Object.assign({}, _this2.state, {
          backEnter: "corouselQueuedImage",
          fwdEnter: "corouselQueuedImage",
          exitMove: "corouselImageInit",
          isActive: true,
          forwardIdx: next,
          currentIdx: current,
          backIdx: back
        }));
      }, 1000);
    }
  }, {
    key: "carouselApi",
    value: function carouselApi() {
      var height = void 0,
          width = void 0,
          legend = void 0;
      this.props.height ? height = this.props.height : height = this.state.height;

      this.props.width ? width = this.props.width : width = this.state.width;

      this.props.legend ? legend = this.props.legend : legend = this.state.legendType;

      this.setState(Object.assign({}, this.state, {
        height: height,
        width: width,
        legendType: legend
      }));
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.carouselApi();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.imageList === 0) {
        return null;
      }

      return _react2.default.createElement(_PictureFrame2.default, { state: this.state, carouselClick: this.carouselClick });
    }
  }]);

  return Carousel;
}(_react2.default.Component);

exports.default = Carousel;