# TSLint Rule to forbid imports in certain paths
A tslint rule to forbid imports of certain RegExes in specified paths. It is not related to but inspired by [https://github.com/electroma/tslint-forbidden-imports](https://github.com/electroma/tslint-forbidden-imports). I did not use `electroma` as it does not have support for relative typescript paths[1](https://github.com/electroma/tslint-forbidden-imports/issues/4) e.g. tsconfig.json:
```
"paths": {
      "@shortcutToPath/*": ["./my/very/much/to/long/path/*"]
}
```

## Usage
- Add rule as dev dependency:
```
yarn add -D forbidden-imports-tslint
```
Assuming you have the following file structure:
- my-client
- client-common
    - components
    - directives
    - services
- other-client

And the following `paths` are defined in your `tsconfig.json`:
```
"paths": {
      "@someOtherClient/*": ["./other-client/*"],
      "@myClient/*": ["./my-client/*"],
}
```
If you want to forbid each of the clients to import components from the other client and also want to forbid 
the common components and directives to import (unshared) components from the clients while common services have no import restriction.
Define the following rule in your `tslint.json`:
```
{
  "rulesDirectory": [
    "node_modules/forbidden-imports-tslint/src"
  ],
  "rules": {
    "forbidden-imports": [true,
      {
        "my-client": ["@someOtherClient*"],
        "other-client": ["@myClient*"],
        "client-common/components": ["@someOtherClient*", "@myClient*"],
        "client-common/directives": ["@someOtherClient*", "@myClient*"]
    
      }
    ]
  }
}

```
- Run tslint. In Angular you can use `ng lint`.

## Development

To adapt this custom TSLint rule
- install Typescript globally `yarn global add typescript`
- adapt the `forbiddenImportsRule.ts`
- compile it to JS -> `yarn build`