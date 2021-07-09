const path = require('path');

import external from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import alias from '@rollup/plugin-alias';
import copy from 'rollup-plugin-copy';
import analyze from 'rollup-plugin-analyzer';

export default {
  input: './src/index.tsx',
  output: [
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'default',
    },
    {
      file: 'dist/bundle.js',
      format: 'umd',
      name: 'lsdChat',
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  watch: {
    include: ['dist/**'],
  },
  plugins: [
    alias({
      entries: {
        'ui-kit': path.resolve('./src/ui-kit'),
      },
    }),
    external(),
    url(),
    svgr(),
    postcss({
      plugins: [autoprefixer()],
      modules: true,
      inject: true,
      // extract: true,
      minimize: true,
      sourceMap: true,
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
    copy({
      targets: [{ src: 'src/ui-kit/assets/icons/**/*', dest: 'dist/ui-kit/assets/icons' }],
    }),
    terser(),
    analyze(),
  ],
};