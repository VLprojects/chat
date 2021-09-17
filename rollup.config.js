import path from 'path';
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
import json from '@rollup/plugin-json';
import analyze from 'rollup-plugin-analyzer';
import dotenv from 'rollup-plugin-dotenv';
import image from '@rollup/plugin-image';

const config = {
  input: './src/lib/index.tsx',
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
  ],
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
    url({ include: ['**/*.woff', '**/*.woff2'], limit: Infinity }),
    svgr(),
    dotenv(),
    image(),
    json(),
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

export default config;
