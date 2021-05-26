module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      nodeModulesPath: ['./node_modules'],
      builderOptions: {
        productName: "Iacula",
        appId: "com.example.iacua",
        artifactName: "${name}_${os}_${arch}-setup.${ext}",
        publish: [
          {
            "provider": "github",
            "owner": "eduardo-da-silva",
            "repo": "iacula",
          }
        ],
        "linux": {
          "category": "Utility",
          "icon": "build/icons",
          "publish": [
            "github"
          ],
          "target": [
            {
              "target": "deb",
              "arch": [
                "x64"
              ]
            },
            {
              "target": "pacman",
              "arch": [
                "x64"
              ]
            }
          ]
        }
      }
    }
  },

  transpileDependencies: [
    'vuetify'
  ]
}
