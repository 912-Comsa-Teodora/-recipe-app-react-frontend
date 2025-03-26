# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# 🍽️ Recipe App — React + TypeScript

A full-featured recipe management app built with **React**, **TypeScript**, **Tailwind CSS**, and **Recharts**. It supports all CRUD operations, live stats with charts, category filtering, search, pagination, and full testing with Vitest.

---

## 🚀 Features

✅ Add / Edit / Delete Recipes  
✅ Dynamic Ingredients + Nutritional Info  
✅ Filter by Category (multi-select)  
✅ Search by Recipe Title or Ingredients  
✅ Pagination (client-side)  
✅ Highlight min / max / average calories with colors  
✅ 📊 Three live-updating charts (Bar, Pie, Line)  
✅ 🧪 Unit + integration tests using Vitest

---

## 🧰 Tech Stack

- ⚛️ React + TypeScript
- 🎨 Tailwind CSS
- 📊 Recharts
- 🧪 Vitest + @testing-library/react
- 📁 File-based mock data
- ✅ Context API for global state

---

## 🛠 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/912-Comsa-Teodora/recipe-app-react-frontend.git
cd recipe-app-react-frontend
npm install
npm run dev
npm run test
