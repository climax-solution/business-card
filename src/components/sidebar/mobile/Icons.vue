<template>
  <div :class="`root${DrawerValue ? '' : ' collapse'}`">
    <v-row class="footer-nowrap">
      <div
        class="_space"
        v-for="name in totalIcons"
        :key="name"
        @click.stop="onItemClick(name)"
      >
        <v-icon>mdi-{{ name }}</v-icon>
      </div>
      <v-icon x-large class="_close" @click="setDrawer" color="#000">mdi-close</v-icon>
    </v-row>
  </div>
</template>

<script>
import iconData from "../../../assets/icons/material.json";

export default {
  name: "Icons",

  props: ["iconView"],

  components: {
  },

  data() {
    return {
      DrawerValue: this.iconView,
      totalIcons: iconData,
    };
  },
  watch: {
    iconView(newVal) {
      this.DrawerValue = newVal;
    },
  },
  methods: {
    setDrawer() {
      this.DrawerValue = false;
      this.$emit("update:iconView", this.DrawerValue);
    },

    onItemClick(name) {
      this.$store.commit('updateIconName', name);
    },
  },
};
</script>

<style>
.v-list-item__title {
  line-height: 2rem;
  font-size: 18px !important;
  line-height: 1.2rem !important;
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

.root {
  display: flex;
  align-items: center;
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

.footer-nowrap {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 0;
  flex-wrap: nowrap;
  overflow: auto hidden;
}

._space {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}

._close {
  position: absolute !important;
  top: 10px;
  left: 90%;
}

.iconImg {
  width: 30px;
  height: 30px;
}
</style>