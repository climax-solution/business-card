<template>
	<div :class="{ icon_button_active: isActive, icon_button: !isActive }" @click="onIconClick">
		<v-icon>{{iconPath}}</v-icon>
	</div>
</template>

<script>

export default {
  name: "IconButton",

	props: ["iconName", "isSelected"],

  components: {
		
	},

	data() {
		return {
			isActive: this.isSelected,
			iconPath: this.iconName
		}
	},

	mounted() {
	},

	watch: {
		isSelected(newVal) {
      this.isActive = newVal;
    },
	},

	methods: {
		onIconClick() {
			switch(this.iconName) {
				case "mdi-format-bold":
					this.isActive = !this.isActive;
					this.$store.commit('updateIsBold', !this.$store.state.isBold);
					break;
				case "mdi-format-italic":
					this.isActive = !this.isActive;
					this.$store.commit('updateIsItalic', !this.$store.state.isItalic);
					break;
				case "mdi-format-underline":
					this.isActive = !this.isActive;
					this.$store.commit('updateIsUnderline', !this.$store.state.isUnderline);
					break;
				case "mdi-format-align-left":
					this.$store.commit('updateAlignDirection', "left");
					break;
				case "mdi-format-align-center":
					this.$store.commit('updateAlignDirection', "center");
					break;
				case "mdi-format-align-right":
					this.$store.commit('updateAlignDirection', "right");
					break;
				case "mdi-magnify":
					break;
				case "mdi-rotate-3d-variant":
					break;
				case "mdi-crop":
					break;
				case "mdi-delete":
					this.$store.commit('updateIsDelete', true);
					break;
			}
		}
	}
};
</script>

<style scoped>
.icon_button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border: 1px solid grey;
	border-radius: 5px;
	margin-left: 10px;
}

.icon_button:hover, .icon_button_active {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border: 1px solid #0070C9;
	border-radius: 5px;
	margin-left: 10px;
}
.icon_button .v-icon {
	color: #1F2D3D;
}
.icon_button_active .v-icon {
	color: #0070c9;
}
.icon_button:hover .v-icon {
	color: #0070c9;
}

</style>