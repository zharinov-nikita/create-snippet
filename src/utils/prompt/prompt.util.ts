import { prompt } from 'prompts'
import type { TypeArgs } from '../../types'
import { UtilConfig } from '../config'
import type { TypeQuestion } from './prompt.type'

export class UtilPrompt {
  private config: UtilConfig

  constructor() {
    this.config = new UtilConfig()
  }

  private createQuestion(): TypeQuestion {
    return [
      {
        type: 'select',
        name: 'snippet',
        message: 'Pick a snippet',
        choices: this.config.generate().map(({ snippet }) => ({ title: snippet, value: snippet })),
        initial: 0,
      },
      { type: 'text', name: 'name', message: 'Pick a name (required)' },
      { type: 'text', name: 'path', message: 'Pick a path (required)' },
      {
        type: 'toggle',
        name: 'isFlat',
        message: 'Create a flat file structure?',
        initial: false,
        active: 'yes',
        inactive: 'no',
      },
      { type: 'text', name: 'prefix', message: 'Pick a prefix (optional - to skip, press enter)' },
      { type: 'text', name: 'suffix', message: 'Pick a suffix (optional - to skip, press enter)' },
    ]
  }

  public async getArgs(): Promise<TypeArgs> {
    const question = this.createQuestion()
    const args = await prompt(question)
    return args
  }
}
