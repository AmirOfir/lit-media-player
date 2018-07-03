import browsersync from 'rollup-plugin-browsersync'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
const jsnext = true;
const preferBuiltins = true;

export default {
  input: 'lit-video-player',
  output: {
    file: 'demo/bundle.js',
    format: 'es',
    sourcemap: true,
  },
  watch: {
    include: ['*/.', 'demo/*/.', '*'],
  },
  plugins: [
    resolve({ browser: true, module: true, jsnext, preferBuiltins }),
    commonjs(),
    browsersync()
    // browsersync({ browser, port, proxy, ui })
    //browsersync({port: 8080, proxy: "http://localhost:8081", ui: false})
  ]
}
