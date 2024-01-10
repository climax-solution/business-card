<template>
  <div class="business_card">
    <card-content />
		<v-container>
      <v-row justify="center">
				<div :class="{ active_btn: isFront, disable_btn: !isFront }" @click="onFront">Front</div>
				<div style="width: 50px"></div>
				<div :class="{ active_btn: !isFront, disable_btn: isFront }" @click="onBack">Back</div>
			</v-row>
		</v-container>
    <Footer />
  </div>
</template>

<script>
import CardContent from "./CardContent";
import Footer from "./Footer";

export default {
  name: "BusinessCard",

  components: {
    CardContent,
    Footer,
  },

  data: () => ({
    isFront: true,
    isBack: false,
  }),

  methods: {
    onFront() {
      this.isFront = true;
			this.isBack = false;
			this.$store.commit('updateCardType', "front");
    },

    onBack() {
      this.isFront = false;
			this.isBack = true;
			this.$store.commit('updateCardType', "back");
    },
  },
};
</script>

<style scoped>
.business_card {
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	justify-content: start;
	background-color: #F7F7F7;
}

.active_btn {
	width: 120px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	font-weight: bold;
	background-color: #fff;
	border: 1px solid #CDCDCF;
}

.disable_btn {
	width: 120px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	background-color: #fff;
	border: 1px solid #CDCDCF;
	color: grey;
	cursor: pointer;
}
.v-btn {
  font-family: TT Norms Pro Bold !important;
  font-size: 14px !important;
}

.v-snack:not(.v-snack--absolute) {
    height: 0 !important;
    position: static !important;
}

.v-snack:not(.v-snack--centered):not(.v-snack--top) {
  align-items: baseline !important;
}
</style>