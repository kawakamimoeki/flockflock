import pkg from './package.json';
import { terser } from "rollup-plugin-terser";

export default {
  input: './index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
     },
     {
      file: pkg.module,
      format: 'es'
     },
     {
      file: pkg.browser,
      format: 'iife',
      name: 'Boid'
     }
  ],
  plugins: [
    terser()
  ]
}
