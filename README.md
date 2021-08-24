# Bytenode Electron-Builder Webpack Plugin

Compile JavaScript into bytecode using [`bytenode`](https://www.npmjs.com/package/bytenode) for [Electron Builder](https://www.npmjs.com/package/electron-builder).

Inspired by [`bytenode-webpack-plugin`](https://www.npmjs.com/package/bytenode-webpack-plugin).

Tested with [`vue-cli-plugin-electron-builder`](https://www.npmjs.com/package/vue-cli-plugin-electron-builder)

## Install

```
npm i bytenode@^1.3.3
npm i -D git+https://github.com/vmartins/bytenode-electron-builder-webpack-plugin.git
```

## Usage
- `webpack`
```javascript
// webpack.config.js

const BytenodeElectronBuilderWebpackPlugin = require('bytenode-electron-builder-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new BytenodeElectronBuilderWebpackPlugin()
  ]
}
```

- `vue-cli-plugin-electron-builder`
```javascript
// vue.config.js

const BytenodeElectronBuilderWebpackPlugin = require('bytenode-electron-builder-webpack-plugin')

module.exports = {
  // ...
  configureWebpack: {
    plugins: [
      new BytenodeElectronBuilderWebpackPlugin(),
    ],
  },
  productionSourceMap: false,
  pluginOptions: {
    electronBuilder: {
      externals: ['bytenode']
    }
  }
}
```

## Options

| Name          | Type     | Default                | Description                                            |
|---------------|----------|------------------------|--------------------------------------------------------|
| **`pattern`** | `string` | `(app\|chunk)\..*\.js$` | Regular expression of the files that will be compiled. |


To use options:

```javascript
// webpack.config.js

const BytenodeElectronBuilderWebpackPlugin = require('bytenode-electron-builder-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new BytenodeElectronBuilderWebpackPlugin({
      pattern: "(app|chunk)\..*\.js$"
    })
  ]
}
```
