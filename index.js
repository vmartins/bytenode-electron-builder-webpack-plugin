const Module = require('module')
const bytenode = require('bytenode')

require('v8').setFlagsFromString('--no-lazy')

class BytenodeElectronBuilderWebpackPlugin {
  constructor (options = {}) {
    this.options = Object.assign({
      pattern: "(app|chunk)\..*\.js$"
    }, options)
  }

  apply (compiler) {
    compiler.hooks.emit.tapPromise('BytenodeElectronBuilderWebpackPlugin', async (compilation) => {
      for (const filename in compilation.assets) {
        if ((new RegExp(this.options.pattern)).test(filename)) {
          const source = Module.wrap(compilation.assets[filename].source())

          // create compiled file
          const bytecode = await bytenode.compileElectronCode(source)
          compilation.assets[filename.replace('.js', '.jsc')] = {
            source: () => bytecode,
            size: () => bytecode.length
          }

          // replace source file
          const newSource = `require("bytenode");\nrequire('app://../../${filename.replace('.js', '.jsc')}');`
          compilation.assets[filename] = {
            source: () => newSource,
            size: () => newSource.length
          }
        }
      }
    })
  }
}

module.exports = BytenodeElectronBuilderWebpackPlugin

