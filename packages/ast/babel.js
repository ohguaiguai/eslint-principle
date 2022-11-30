const babel = require('@babel/core');
const types = require('@babel/types');
// const arrowFunctions = require('babel-plugin-transform-es2015-arrow-functions');
// const code = `const sum = (a, b) => a + b`;

// const code = `const sum = (a, b) => console.log(this)`;
const code = ` function a () { const sum = (a, b) => console.log(this) }`;

const transformFunction = {
  visitor: {
    ArrowFunctionExpression(path) {
      let { node } = path;
      node.type = 'FunctionExpression';
      let body = node.body;

      if (!types.isBlockStatement(body)) {
        node.body = types.blockStatement([types.returnStatement(body)]);
      }

      hoistFunctionEnv(path);
    }
  }
};

function getThisPaths(path) {
  const thisPaths = [];
  // path 上的 traverse 方法
  path.traverse({
    ThisExpression(path) {
      thisPaths.push(path);
    }
  });
  return thisPaths;
}

// 箭头函数没有this，需要找到父级作用域
// hoist： 提升
function hoistFunctionEnv(path) {
  // 查找父作用域: 1.是函数并且不是箭头函数 2.最顶层
  const thisEnv = path.findParent(
    (parent) =>
      (parent.isFunction() && !parent.isArrowFunctionExpression()) ||
      parent.isProgram()
  );

  const bindingThis = '_this';

  // 找到路径下所有的包含this的path, 并且替换为 _this
  const thisPaths = getThisPaths(path);
  thisPaths.forEach((path) => {
    path.replaceWith(types.identifier(bindingThis));
  });

  // 添加 var _this = this;
  thisEnv.scope.push({
    id: types.identifier(bindingThis),
    init: types.thisExpression()
  });
}

const result = babel.transform(code, {
  plugins: [transformFunction]
});

console.log(result.code);
