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
        name: 'snippet',
        message: 'Pick a snippet',
        choices: this.config.generate().map(({ snippet }) => ({ title: snippet, value: snippet })),
        initial: 0,
      },
      { type: 'text', name: 'name', message: 'Pick a name' },
      { type: 'text', name: 'path', message: 'Pick a path' },
      {
        type: 'toggle',
        name: 'isFlat',
        message: 'Create a flat file structure?',
        initial: false,
        active: 'yes',
        inactive: 'no',
      },
    ]
  }

  public async getArgs(): Promise<TypeArgs> {
    const question = this.createQuestion()
    return await prompt(question)
  }
}
