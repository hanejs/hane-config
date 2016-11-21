
import path from 'path'
import yaml from 'js-yaml'
import { pick, cloneDeep } from 'lodash'

const configValidFields = [ 'blog', 'render', 'deployer' ]

class HaneConfig {
  static defaultConfig = null
  static getDefault() {
    if (!HaneConfig.defaultConfig) {
      const root = path.join(__dirname, '..')
      HaneConfig.defaultConfig = new HaneConfig(root).config
    }
  }
  constructor(root) {
    let config
    try {
      const configPath = path.join(root, 'hane.yml')
      const data = fs.readFileSync(configPath, 'utf8')
      config = yaml.safeLoad(data)
      config = pick(config, configValidFields)
      config = { ...HaneConfig.defaultConfig, ...config }
    } catch (e) {
      config = cloneDeep(HaneConfig.defaultConfig)
    }
    this.config = config
  }
  get render() {
    return this.config.render || {}
  }
}

HaneConfig.getDefault()

export default HaneConfig
