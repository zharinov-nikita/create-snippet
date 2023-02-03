import { prompt, PromptObject } from 'prompts'
import type { TypeArgs } from '../../types'
import { UtilConfig } from '../config'

type Question = PromptObject[]

export class UtilPrompt {
  private config: UtilConfig

  constructor() {
    this.config = new UtilConfig()
  }

  private createQuestion(): Question {
    return [
      {
        type: 'select',
        name: 'template',
        message: 'Pick a template',
        choices: this.config.generate().map(({ template }) => ({ title: template, value: template })),
        initial: 0,
      },
      { type: 'text', name: 'name', message: 'Pick a name' },
      { type: 'text', name: 'path', message: 'Pick a path' },
      { type: 'toggle', name: 'isPreview', message: 'Pick isPreview' },
    ]
  }

  public async getArgs(): Promise<TypeArgs> {
    const question = this.createQuestion()
    return await prompt(question)
  }
}
