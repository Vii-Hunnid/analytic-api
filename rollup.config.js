// rollup.config.js
const typescript = require('@rollup/plugin-typescript');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      name: 'analyticApi',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'analyticApi',
      sourcemap: true,
    },
  ],
  plugins: [typescript(), resolve(), commonjs()],
  external: [
    'react',
    'react-dom',
    '@supabase/supabase-js',
    'firebase',
    'resend',
  ],
};
