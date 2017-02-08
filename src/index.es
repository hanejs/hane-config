
import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { pick, cloneDeep } from 'lodash'

const configValidFields = [ 'blog', 'render', 'theme', 'deployer' ]

class HaneConfig {
  static defaultConfig = null
  static getDefault() {
    if (!HaneConfig.defaultConfig) {
      const root = path.join(__dirname, '..')
      HaneConfig.defaultConfig = new HaneConfig(root).config
    }
  }
  constructor(root) {
    let config = HaneConfig.defaultConfig
               ? cloneDeep(HaneConfig.defaultConfig)
               : {}

    if (root) {
      try {
        const configPath = path.join(root, 'hane.yml')
        const data = fs.readFileSync(configPath, 'utf8')
        let _config = yaml.safeLoad(data)
        _config = pick(_config, configValidFields)
        config = { ...config, ..._config }
      } catch (e) {
        config = cloneDeep(HaneConfig.defaultConfig)
      }
    }

    this.config = config
  }
  get render() {
    return this.config.render || {}
  }
  get theme() {
    return this.config.theme || {}
  }
}

HaneConfig.getDefault()

export default HaneConfig
