module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier'
  ],
  overrides: [
    {
      rules: {
        // Disable specific type-related rules here
        '@typescript-eslint/no-explicit-any': 'off' // Example rule to disable explicit "any" types
        // Add more rules as needed
      }
    }
  ]
}
