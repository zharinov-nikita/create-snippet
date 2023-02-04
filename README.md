#### Installation

To install the `create-snippet` package, run the command:

```
npm i -D create-snippet
```

Setup

<iframe width="560" height="315" src="https://www.youtube.com/embed/U77RNYuk1LA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

1. In the root of your project, create a directory `.create-snippet`
2. In the `.create-snippet` directory, create a subdirectory with an arbitrary name in the `kebab-case` format (for example, my-snippet)
3. Next, in the created subdirectory, create files of any format

```ts
//example
📁.create-snippet/
└── 📁my-snippet-1/
    ├── 📑snippet-name.ts
    └── 📑snippet-name.test.ts
    └── 📑index.ts
└── 📁my-snippet-2/
    ├── 📑snippet-name.ts
    └── 📑snippet-name.test.ts
    └── 📑index.ts
```

4. Call the `npc create-snippet` command in the terminal
5. Select the snippet you want to create
6. Choose a name
7. Select the path where the snippet will be created

All the contents in the files specified as `snippet-name` are transformed into the name that you specify when creating the snippet.

|case| string | formatted |
|---| ------------- |:------------------: |
|camelCase| `snippetName` |`helloWorld` |
|PascalCase| `SnippetName` |`HelloWorld` |  
|lower_snake_case| `snippet_name` |`hello_world ` |
|UPPER_SNAKE_CASE| `SNIPPET_NAME` |`HELLO_WORLD` |
|lower-kebab-case| `snippet-name` |`hello-world` |
|UPPER-KEBAB-CASE| `SNIPPET-NAME` |`HELLO-WORLD` |

⚠️ Changeable file names can only be specified in the `kebab-case' format!
