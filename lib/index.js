'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configValidFields = ['render', 'deployer'];

class HaneConfig {
  constructor(root) {
    let config;
    try {
      const configPath = _path2.default.join(root, 'hane.yml');
      const data = fs.readFileSync(configPath, 'utf8');
      config = _jsYaml2.default.safeLoad(data);
      config = (0, _lodash.pick)(config, configValidFields);
    } catch (e) {
      config = {};
    }
    this.config = config;
  }
  get render() {
    return this.config.render || {};
  }
}

exports.default = HaneConfig;

