<template>
  <div :class="`root${DrawerValue ? '' : ' collapse'}`">
		<v-row>
			<v-color-picker hide-canvas hide-sliders v-model="currentColor" flat />
			<v-icon  x-large class="_close" @click="setDrawer" color="#000">mdi-close</v-icon>
		</v-row>
  </div>
</template>

<script>

export default {
  name: "BackColor",
  props: ["colorView"],
  data() {
    return {
      DrawerValue: this.colorView,
      file: null,
			currentColor: '#000000FF',
    };
  },
  watch: {
    colorView(newVal) {
      this.DrawerValue = newVal;
    },
		currentColor: function () {
			this.$store.commit('updateBackgroundColor', this.currentColor);
			this.$store.commit('updateIsImageSet', false);
		},
  },
  methods: {
    setDrawer() {
      this.DrawerValue = false;
      this.$emit("update:colorView", this.DrawerValue);
    },
  },
};
</script>

<style scoped>
.v-list-item__title {
  line-height: 2rem;
}

h2 {
  font-family: TT Norms Pro Bold !important;
  font-size: 22px !important;
}

@media screen and (min-width: 1026px) {
  .mobileView {
    display: none;
  }
}

@media screen and (max-width: 1025px) {
  .mobileView {
    display: block;
  }
}

.root {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: top ease 0.3s;
  background-color: #fff;
}

.collapse {
  top: 170%;
}

._space {
  margin-left: 10px;
  margin-right: 10px;
}
</style>