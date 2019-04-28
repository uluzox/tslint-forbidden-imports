# TSLint Rule to forbid imports in certain paths
A tslint rule to forbid imports of certain RegExes in specified paths. It is not related to but inspired by [https://github.com/electroma/tslint-forbidden-imports](https://github.com/electroma/tslint-forbidden-imports). I did not use `electroma` as it does not have support for relative typescript paths[1](https://github.com/electroma/tslint-forbidden-imports/issues/4) e.g. tsconfig.json:
```
"paths": {
      "@shortcutToPath/*": ["./my/very/much/to/long/path/*"]
}
```

## Usage
- Add Rule to your repository.
- Update your `tslint.json`

```
{
  "rulesDirectory": [
    "node_modules/forbidden-imports-tslint/src"
  ],
  "rules": {
    "forbidden-imports": [true,
      {
        "my-client": ["@someOtherClient*"],
        "client-common/components": ["not/this/path/*"],
        "client-common/directives": ["@someOtherClient*", "myClient*"]
    
      }
    ]
  }
}

```
- Run tslint. In Angular you can use `ng lint`.

## Adaption of the TSLint Rule

To adapt this custom TSLint rule
- install Typescript globally `yarn global add typescript`
- adapt the `forbiddenImportsRule.ts`
- compile it to JS -> `yarn build`