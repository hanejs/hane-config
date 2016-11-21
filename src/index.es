
import path from 'path'
import yaml from 'js-yaml'
import { pick } from 'lodash'

const configValidFields = [ 'render', 'deployer' ]

class HaneConfig {
  constructor(root) {
    let config
    try {
      const configPath = path.join(root, 'hane.yml')
      const data = fs.readFileSync(configPath, 'utf8')
      config = yaml.safeLoad(data)
      config = pick(config, configValidFields)
    } catch (e) {
      config = {}
    }
    this.config = config
  }
  get render() {
    return this.config.render || {}
  }
}

export default HaneConfig
