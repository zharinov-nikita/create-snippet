![](https://i.ibb.co/vmkY3c0/Logo.png)


#### Installation ([watch video](https://youtu.be/U77RNYuk1LA))

To install the `create-snippet` package, run the command:

`npm i -D create-snippet`

`npx create-snippet --help` will show hints
`npx create-snippet --init` initializes the project
`npx create-snippet --generate` generates a new snippet

New snippet

When creating a new snippet, create a directory inside the 
directory .create-snippet with an arbitrary name,
create the required number of files and directories inside this directory.
    
SnippetName
    
The strings [snippetName] specified inside the file or in the file name 
will be converted to a custom string when generating a new snippet.
    
PrefixName
    
The strings [prefixName] specified inside the file when generating a new
snippet will be converted to custom strings.
    
SuffixName
    
The strings [suffixName] specified inside the file when generating a new
snippet will be converted to custom strings.

Supported cases for strings

1) camelCase
2) PascalCase
3) lower_snake_case
4) UPPER_SNAKE_CASE
5) lower-kebab-case
6) UPPER-KEBAB-CASE

Specifying parameters via the console

1) snippet - any string
2) name - any string in the format lower-kebab-case
3) path - any string
4) prefix - any string in the format lower-kebab-case
4) suffix - any string in the format lower-kebab-case
