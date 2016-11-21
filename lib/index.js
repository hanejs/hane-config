'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configValidFields = ['blog', 'render', 'deployer'];

class HaneConfig {
  static getDefault() {
    if (!HaneConfig.defaultConfig) {
      const root = _path2.default.join(__dirname, '..');
      HaneConfig.defaultConfig = new HaneConfig(root).config;
    }
  }
  constructor(root) {
    let config;
    try {
      const configPath = _path2.default.join(root, 'hane.yml');
      const data = fs.readFileSync(configPath, 'utf8');
      config = _jsYaml2.default.safeLoad(data);
      config = (0, _lodash.pick)(config, configValidFields);
      config = _extends({}, HaneConfig.defaultConfig, config);
    } catch (e) {
      config = {};
    }
    this.config = config;
  }
  get render() {
    return this.config.render || {};
  }
}

HaneConfig.defaultConfig = null;
HaneConfig.getDefault();

exports.default = HaneConfig;

