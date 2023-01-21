import { TypeConfig } from "./types";

export const config: TypeConfig = [
    {
      template: 'ui',
      files: [
        '.cli/ui/template-name.component.ts',
        '.cli/ui/template-name.test.ts',
        '.cli/ui/template-name.type.ts',
      ],
    },
    {
      template: 'page',
      files: [
        '.cli/page/template-name.component.ts',
        '.cli/page/template-name.test.ts',
        '.cli/page/template-name.type.ts',
      ],
    },
  ]