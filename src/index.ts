import { ModuleConfig } from './modules'

class Cli {
  private moduleConfig: ModuleConfig

  constructor() {
    this.moduleConfig = new ModuleConfig('.create-snippet')
  }

  public start() {
    this.moduleConfig.initialize()
  }
}

new Cli().start()
