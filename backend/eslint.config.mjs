export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off', // ✅ Desativa erro de tipagem insegura
      '@typescript-eslint/no-unsafe-call': 'off', // ✅ Desativa erro ao chamar funções tipadas indiretamente
      '@typescript-eslint/no-unsafe-member-access': 'off', // ✅ Desativa erro ao acessar propriedades de objetos tipados
      '@typescript-eslint/no-unsafe-return': 'off', // ✅ Permite retornar valores sem erro do ESLint
    },
  },
);
