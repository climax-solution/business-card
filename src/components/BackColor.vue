<template>
  <v-navigation-drawer width="310" v-model="iconShow" absolute>
    <v-container>
      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4">
          <v-row style="cursor: pointer">
            <v-col cols="12" @click="seticonShow()">
              <v-icon>mdi-arrow-left-thin</v-icon>
              Menu
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
							<v-color-picker v-model="currentColor" flat />
            </v-col>
          </v-row>
        </v-list-item-group>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: "BackColor",
  props: ["isShow"],
  data() {
    return {
      iconShow: this.isShow,
			currentColor: '#FFFFFFFF',
    };
  },
  mounted() {
  },
  watch: {
    isShow(newVal) {
      this.iconShow = newVal;
    },
		currentColor: function () {
			this.$store.commit('updateBackgroundColor', this.currentColor);
			this.$store.commit('updateIsImageSet', false);
		},
  },
  methods: {
    seticonShow() {
      this.iconShow = false;
      this.$emit("update:isShow", this.iconShow);
    },
  },
};
</script>
