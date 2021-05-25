module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      nodeModulesPath: ['./node_modules']
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
