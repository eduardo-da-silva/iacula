<template>
  <v-container @click="minimize">
    <v-spacer></v-spacer>
    <v-img contain max-height="400" max-width="500" :src="image" />
    <span class="iacula">
      {{ currentIacula }}
    </span>
    <hr />
  </v-container>
</template>

<script>
const { ipcRenderer } = require("electron");
const product = require("../../setences.json");
import { mapState } from "vuex";

export default {
  data() {
    return {
      minutes: 0,
      seconds: 0,
      image: null,
      product: product,
      day: 1,
      currentIacula: "",
      intId: 0,
    };
  },
  computed: {
    ...mapState("settings", ["interval", "showTime"]),
  },
  watch: {
    image() {
      const sound = new Audio("./assets/sound.wav");
      sound.play();
      this.currentIacula = this.product[this.day - 1].iaculas[
        Math.floor(Math.random() * this.product[this.day - 1].iaculas.length)
      ].iacula;
      setTimeout(this.minimize, this.showTime);
    },
    interval() {
      this.updateTimer();
    },
  },
  methods: {
    minimize() {
      ipcRenderer.send("window:minimize");
    },
    maximize() {
      ipcRenderer.send("window:maximize");
    },
    updateTimer() {
      clearInterval(this.intId);
      this.intId = setInterval(() => {
        this.getSetenceAndImage();
      }, this.interval);
    },
    start() {
      this.updateTimer();
    },
    getSetenceAndImage() {
      this.getImage();
    },
    getImage() {
      this.maximize();
      const now = new Date();
      const dayOfWeek = now.getDayOfWeek();
      this.day = dayOfWeek;
      const img = ipcRenderer.sendSync("getImages", dayOfWeek);
      this.image = img;
    },
  },
  created() {
    if (this.intId === 0) {
      this.getSetenceAndImage();
      this.updateTimer();
    }
  },
  beforeDestroy() {
    clearInterval(this.intId);
  },
};
</script>

<style>
.iacula {
  font-size: 2em;
  font-family: "Texturina", serif;
}
</style>