import postcssImport from 'postcss-import';
import postcssNesting from 'postcss-nesting';
import tailwindcss from 'tailwindcss';

// 跨瀏覽器自動處理樣式 (css styles)
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    postcssImport,
    tailwindcss,
    postcssNesting,
    autoprefixer,
  ],
};