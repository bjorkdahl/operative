module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    "rules": {
        "ban-ts-ignore": 0,
        "react/prop-types": 0,
        "react/self-closing-comp": ["error", {
            "component": true,
            "html": true
        }]
    }
};