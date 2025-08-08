// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    settings: { react: { version: 'detect' } },
    ignorePatterns: ['dist', 'node_modules'],
    rules: {
        'indent': ['error', 4, { SwitchCase: 1 }],
        'react/react-in-jsx-scope': 'off'
    }
};
