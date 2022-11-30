/**
 * @fileoverview 自定义插件
 * @author zx
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
// module.exports.rules = requireIndex(__dirname + "/rules");
module.exports = {
  rules: requireIndex(__dirname + '/rules'),
  // 让插件可以直接被 extends
  configs: {
    recommended: {
      plugins: ['zlint'],
      rules: {
        'zlint/no-var': ['error']
      }
    }
  },
  processors: {
    // 会优先执行这里的逻辑，vue 会把 script标签中的代码提取出来
    '.vue': {
      preprocess(code) {
        return [code];
      },
      postprocess() {}
    }
  }
};
