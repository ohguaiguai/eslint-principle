# eslint-plugin-lint

自定义插件

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-lint`:

```sh
npm install eslint-plugin-lint --save-dev
```

## Usage

Add `lint` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lint"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "lint/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


