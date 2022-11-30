module.exports = {
  // 描述全局变量：当前可以使用哪个环境下的全局变量
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  // extends 和 plugin 的区别
  // extends = plugin + rules; 如果配到了extends下则既有插件又有规则；如果只在 plugin 中配置了插件是没有规则的，需要再去配置规则

  // 使用 extends
  // parser: '@typescript-eslint/parser'
  // extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  // plugin: []
  // rules: {}

  // 不使用 extends
  // parser: '@typescript-eslint/parser'
  // extends: 'eslint:recommended',
  // plugins: ['@typescript-eslint'],

  extends: ['plugin:zlint/recommended'],
  // plugins: ['zlint'],
  // rules: {
  //   'zlint/no-var': ['error']
  // },

  parserOptions: {
    ecmaVersion: 'latest', // 描述语法
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true // 支持 jsx
    }
  },
  globals: {
    // 'readonly' 'writable'
    custome: 'readonly'
  }
};
