<template>
  <div>
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab> Configurações </v-tab>
      <v-tab> Sobre </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <general-settings />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <about-info />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import GeneralSettings from "@/components/settings/GeneralSettings";
import AboutInfo from "@/components/settings/AboutInfo";

export default {
  components: { GeneralSettings, AboutInfo },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style>
</style>