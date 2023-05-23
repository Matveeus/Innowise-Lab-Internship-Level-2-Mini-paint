module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint-config-airbnb-base'],
    parserOptions: {
        project: './tsconfig.json',
    },
    overrides: [
        {
            files: ['src/**/*.js', 'src/**/*.jsx'],
            rules: {
                "react/jsx-filename-extension": [
                    1,
                    { "extensions": [".js", ".jsx"] }
                ]
            }
        }
    ],
    plugins: [
        'react',
    ],
};
