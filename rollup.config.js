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
      globals: {
        react: 'React',
        crypto: 'crypto',
        '@supabase/supabase-js': 'supabase',
        stream: 'stream',
        zlib: 'zlib',
        buffer: 'buffer',
        events: 'events',
        https: 'https',
        http: 'http',
        net: 'net',
        tls: 'tls',
        url: 'url',
        resend: 'resend',
        'firebase/app': 'firebase',
        'firebase/firestore': 'firestore',
      },
      sourcemap: true,
    },
  ],
  plugins: [typescript(), resolve(), commonjs()],
  external: [
    'react',
    'react-dom',
    '@supabase/supabase-js',
    'firebase/app',
    'firebase/firestore',
    'resend',
    'crypto',
    'stream',
    'zlib',
    'buffer',
    'events',
    'https',
    'http',
    'net',
    'tls',
    'url',
  ],
};
