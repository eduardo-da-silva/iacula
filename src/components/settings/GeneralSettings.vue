<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submit">
        <validation-provider
          v-slot="{ errors }"
          name="Intervalo"
          rules="required"
        >
          <v-text-field
            v-model="interval"
            :error-messages="errors"
            label="Intervalo"
            type="number"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Tempo de exibição"
          rules="required"
        >
          <v-text-field
            v-model="showTime"
            :error-messages="errors"
            label="Tempo de exibição"
            type="number"
            required
          ></v-text-field>
        </validation-provider>

        <v-btn class="mr-4" type="submit" :disabled="invalid"> Enviar </v-btn>
      </form>
    </validation-observer>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");

import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

import { mapActions } from "vuex";
export default {
  components: { ValidationProvider, ValidationObserver },
  computed: {
    interval: {
      get() {
        return this.$store.state.settings.interval;
      },
      set(value) {
        this.updateInterval(value);
      },
    },
    showTime: {
      get() {
        return this.$store.state.settings.showTime;
      },
      set(value) {
        this.updateShowTime(value);
      },
    },
  },
  data() {
    return {
      settings: {
        interval: this.interval,
        showTime: this.showTime,
      },
    };
  },
  created() {
    // this.getInterval();
  },
  methods: {
    ...mapActions("settings", ["updateInterval", "updateShowTime"]),
    submit() {
      this.$router.push("/");
      ipcRenderer.send("window:minimize");
    },
  },
};
</script>

<style>
</style>