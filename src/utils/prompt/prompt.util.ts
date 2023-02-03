import { prompt, PromptObject } from 'prompts'

interface Config {
  template: string
  name: string
  path: string
}

export class UtilPrompt {
  private question: PromptObject[]

  constructor() {
    this.question = [
      { type: 'text', name: 'template', message: 'Pick a template' },
      { type: 'text', name: 'name', message: 'Pick a name' },
      { type: 'text', name: 'path', message: 'Pick a path' },
    ]
  }

  async getConfig(): Promise<Config> {
    return await prompt(this.question)
  }
}
