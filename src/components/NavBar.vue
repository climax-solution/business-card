<template>
	<v-app-bar app color="#fff" class="header-bar">
		<!-- your logo here -->
		<h1 style="color: #0070C9" class="card-title">Business card</h1>
		<v-spacer></v-spacer>
		<div class="navbar-font-select">
			<model-select
				:options="availableFonts"
				v-model="currentFont"
				placeholder="font family"
				:customAttr="(va) => onAriaAttrs(va)"
			>
			</model-select>
		</div>
		<div class="navbar-size-select ml-3 mr-3">
			<model-select
				:options="availableSizes"
				v-model="currentSize"
				placeholder="font size">
			</model-select>
		</div>
		<v-menu v-model="menu" top style="max-width: 36px; max-height: 36px" nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
			<template v-slot:activator="{ on }">
				<div :style="swatchStyle" v-on="on" />
			</template>
			<v-card>
				<v-card-text class="pa-0">
					<v-color-picker v-model="currentColor" flat />
				</v-card-text>
			</v-card>
		</v-menu>
		<icon-button iconName="mdi-format-bold" :isSelected="false" />
		<icon-button iconName="mdi-format-italic" :isSelected="false" />
		<icon-button iconName="mdi-format-underline" :isSelected="false" />
		<icon-button iconName="mdi-format-align-left" :isSelected.sync="isLeft" />
		<icon-button iconName="mdi-format-align-center" :isSelected.sync="isCenter" />
		<icon-button iconName="mdi-format-align-right" :isSelected.sync="isRight" />
		<!-- <icon-button iconName="mdi-magnify" />
		<icon-button iconName="mdi-rotate-3d-variant" />
		<icon-button iconName="mdi-crop" /> -->
		<icon-button iconName="mdi-delete" :isSelected="false" />
		<v-spacer></v-spacer>
	</v-app-bar>
</template>

<script>
import { ModelSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'
import IconButton from "./IconButton";

export default {
  name: "NavBar",

  components: {
		ModelSelect,
		IconButton,
	},

  data: () => ({
		mask: '!#XXXXXXXX',
		menu: false,
		currentColor: '#000000FF',
		currentSize: { value: 30, text: '30' },
		currentFont: { value: 0, text: 'Palatino LT' },
		availableFonts: [
			{ value: 0, text: 'Palatino LT' },
			{ value: 1, text: 'Amethyste' },
			{ value: 2, text: 'AgedBook' },
			{ value: 3, text: 'Arial' },
			{ value: 4, text: 'Arial Rounded MT' },
			{ value: 5, text: 'Avenir Next LT Pro' },
			{ value: 6, text: 'AZ Cut Script' },
			{ value: 7, text: 'BankGothic Lt BT' },
			{ value: 8, text: 'Bebas' },
			{ value: 9, text: 'Bernhard Fashion Com' },
			{ value: 10, text: 'Blue Century' },
			{ value: 11, text: 'Broadway MT Std' },
			{ value: 12, text: 'CA Emeralda Script' },
		],
		apiKey: "AIzaSyCIQ8DiqI7acYF1mQlxCMM8Ay2o9bx5sYc",
    availableSizes: [],
		isLeft: true,
		isCenter: false,
		isRight: false,
  }),

	computed: {
    swatchStyle() {
      const { currentColor, menu } = this
      return {
        backgroundColor: currentColor,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    }
  },

	mounted() {
		for(let i = 30 ; i <= 100; i ++) {
			const newItem = {value: i, text: i + "" };
			this.availableSizes.push(newItem);
		}
	},

	watch: {
		currentFont: function () {
			this.$store.commit('updateFontFamily', this.currentFont.text);
    },
		currentSize: function () {
			this.$store.commit('updateFontSize', parseInt(this.currentSize.text));
		},
		currentColor: function () {
			this.$store.commit('updateFontColor', this.currentColor);
		},
		"$store.state.alignDirection": function () {
			this.isLeft = this.$store.state.alignDirection == "left";
			this.isCenter = this.$store.state.alignDirection == "center";
			this.isRight = this.$store.state.alignDirection == "right";
    },
	},

	methods: {
		onFontSelect(e) {
			this.fontFamily = e.family;
		},
		onAriaAttrs(va) {
			return `"style='font-family:` + va.text + `'"`;
		}
	}
};
</script>

<style scoped>
.font-picker {
	width: 250px;
	height: 38px;
	border: 1px solid #DEDEDF;
	border-radius: 5px;
	padding-left: 15px;
}
.navbar-font-select {
	width: 230px;
}
.navbar-size-select {
	width: 80px;
}
.dropdown-button {
	background-color: white !important;
}
.theme--light.v-icon {
  color: rgba(0, 0, 0, 0.8);
}

.v-icon:hover {
  color: #0070c9;
}

.spacer {
  flex-grow: 4 !important;
}

._save {
  background-color: #fff !important;
  border: 1px solid;
  border-color: #444 !important;
}

@media screen and (max-width: 1200px) {
  .card-title {
		display: none;
	}
	.header-bar {
		overflow-x: visible;
		overflow-y: visible;
		height: 70px;
	}
}
</style>