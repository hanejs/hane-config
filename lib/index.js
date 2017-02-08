'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configValidFields = ['blog', 'render', 'theme', 'deployer'];

class HaneConfig {
  static getDefault() {
    if (!HaneConfig.defaultConfig) {
      const root = _path2.default.join(__dirname, '..');
      HaneConfig.defaultConfig = new HaneConfig(root).config;
      console.log(HaneConfig.defaultConfig);
    }
  }
  constructor(root) {
    let config = HaneConfig.defaultConfig ? (0, _lodash.cloneDeep)(HaneConfig.defaultConfig) : {};

    if (root) {
      try {
        const configPath = _path2.default.join(root, 'hane.yml');
        const data = _fs2.default.readFileSync(configPath, 'utf8');
        let _config = _jsYaml2.default.safeLoad(data);
        _config = (0, _lodash.pick)(_config, configValidFields);
        config = _extends({}, config, _config);
      } catch (e) {
        config = (0, _lodash.cloneDeep)(HaneConfig.defaultConfig);
      }
    }

    this.config = config;
  }
  get render() {
    return this.config.render || {};
  }
  get theme() {
    return this.config.theme || {};
  }
}

HaneConfig.defaultConfig = null;
HaneConfig.getDefault();

exports.default = HaneConfig;

