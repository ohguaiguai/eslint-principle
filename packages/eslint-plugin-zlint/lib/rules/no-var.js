/**
 * @fileoverview 禁止使用var
 * @author zx
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    messages: {
      unexpected: '不能用 {{type}}'
    },
    docs: {
      description: '禁止使用var',
      recommended: false,
      url: null // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [] // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    const sourceCode = context.getSourceCode(); // 需要用这个来修复代码
    return {
      // visitor functions for different types of nodes
      VariableDeclaration(node) {
        if (node.kind === 'var') {
          context.report({
            node,
            messageId: 'unexpected',
            data: { type: 'var' },
            fix(fixer) {
              // 从源码里找到 kind 是 var 的 VariableDeclaration 节点
              const varToken = sourceCode.getFirstToken(node, {
                filter: (t) => t.value === 'var'
              });
              return fixer.replaceText(varToken, 'let');
            }
          });
        }
      }
    };
  }
};
