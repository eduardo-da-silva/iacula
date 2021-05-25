<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title><h1>Atos de Presença de Deus</h1></v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
  name: "App",
  mounted() {
    ipcRenderer.on("navigate", (e, routePath) => {
      if (this.$route.name !== routePath.name) {
        this.$router.push(routePath);
      }
      ipcRenderer.send("window:maximize");
    });
  },
};
</script>

