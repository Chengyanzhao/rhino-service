module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true,
    },
    'extends': 'airbnb-base',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
        'ecmaVersion': 2018,
    },
    'rules': {
        // node
        'no-console': 'off',
        'no-unresolved': 'off',
        // common
        'semi': ['error', 'never'], // 不允许分号语句的末尾
        'arrow-parens': ['error', 'as-needed'], // 当只有一个参数时允许省略参数括号。
        'object-curly-newline': ['error', { // 对象文字或解构赋值的大括号内强制执行一致的换行符。
            'ObjectPattern': { 'multiline': true }
        }],
        'no-plusplus': ['error', { // 允许一元运算符++和循环--的后缀（最终表达式）for
            'allowForLoopAfterthoughts': true
        }],
        'no-underscore-dangle': 'off',
        'consistent-return': 0, // 要求使用一致的 return 语句，关闭。
        'no-param-reassign': ['error', { 'props': false }],
        'no-restricted-globals': 0, // 禁用特定的全局变量，关闭。
        'no-unused-expressions': ['error', { allowShortCircuit: true }],
        'import/prefer-default-export': 0,
        'radix': ['error', 'as-needed'],
        'new-cap': 'off',
    },
}
