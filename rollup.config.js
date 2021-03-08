import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import strip from '@rollup/plugin-strip'
// import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import filesize from 'rollup-plugin-filesize'
// import { terser } from "rollup-plugin-terser";
import pkg from './package.json'
// import path from 'path'
const input = 'src/index.ts'
export default [
  {
    input,
    output: [
      {
        file: pkg.module,
        format: 'es',
        exports: 'default',
        sourcemap: false
      },
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'auto',
        sourcemap: false
      }
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      resolve(),
      commonjs(),
      // babel({
      //   babelHelpers: "runtime",
      //   exclude: "node_modules/**"
      // })
      // getBabelOutputPlugin({
      //   // allowAllFormats: true,
      //   configFile: path.resolve(__dirname, 'babel.config.js')
      // }),
      strip(),
      filesize()
    ],
    external: id => /lodash|core-js/.test(id) || id.includes('@babel/runtime')
  }
]
