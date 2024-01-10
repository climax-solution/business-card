<template>
  <v-card width="310" style="overflow-y: auto" class="sidebar_container">
		<v-list>
			<v-list-item
				v-for="item in items"
				:key="item.key"
				link
				@click.stop="onItemClick(item.key)"
			>
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>

				<v-list-item-icon>
					<v-icon>{{ item.key != "setBackground" ? item.arrow : (!background_clicked ? item.arrow : "mdi-delete") }}</v-icon>
				</v-list-item-icon>

			</v-list-item>
		</v-list>
    <Icons :isShow.sync="icons_clicked" />
    <BackColor :isShow.sync="color_clicked" />
  </v-card>
</template>

<script>
import Icons from "./Icons.vue";
import BackColor from "./BackColor.vue";

export default {
  name: "SideBar",
  components: {
    Icons,
		BackColor,
	},

  data() {
    return {
			background_clicked: false,
      icons_clicked: false,
			color_clicked: false,
      items: [
        {
          key: "addText",
          title: "Add Text",
          icon: "mdi-format-textbox",
          arrow: "mdi-plus",
        },
        {
          key: "addImage",
          title: "Add Image",
          icon: "mdi-image",
          arrow: "mdi-plus",
        },
        {
          key: "setBackground",
          title: "Background",
          icon: "mdi-image",
          arrow: "mdi-chevron-right",
        },
        {
          key: "setBackColor",
          title: "Color",
          icon: "mdi-invert-colors",
          arrow: "mdi-chevron-right",
        },
        {
          key: "icons",
          title: "Icons",
          icon: "mdi-plus-circle-outline",
          arrow: "mdi-chevron-right",
        },
        {
          key: "undo",
          title: "Undo",
          icon: "mdi-arrow-u-left-top",
          arrow: "",
        },
        {
          key: "redo",
          title: "Redo",
          icon: "mdi-arrow-u-right-top",
          arrow: "",
        },
        {
          key: "upload",
          title: "Load",
          icon: "mdi-upload",
          arrow: "",
        },
        {
          key: "download",
          title: "Export as pdf",
          icon: "mdi-file-download-outline",
          arrow: "",
        },
        {
          key: "save",
          title: "Save",
          icon: "mdi-content-save",
          arrow: "",
        },
      ],
      right: null,
    };
  },

	watch: {
		"$store.state.isImageSet": function () {			// update fontFamily of activeObject
			this.background_clicked = this.$store.state.isImageSet;
    },
	},

  methods: {
    onItemClick(key) {
      console.log(this);
      switch (key) {
        case "addText":
          this.$store.commit('updateTextIndex');
          break;
				case "addImage":
          this.$store.commit('updateImageIndex');
          break;
				case "setBackground":
					if(this.background_clicked) {
						this.$store.commit('updateIsImageSet', false);
					}
					else {
						this.$store.commit('updateBackgroundIndex');
					}
					break;
				case "setBackColor":
          this.color_clicked = !this.color_clicked;
					break;
        case "icons":
          this.icons_clicked = !this.icons_clicked;
          break;
        case "undo":
					this.$store.commit('updateUndoIndex');
          break;
        case "redo":
					this.$store.commit('updateRedoIndex');
          break;
				case "save":
					this.$store.commit('updateSaveToJson', true);
					break;
				case "upload":
					this.$store.commit('updateLoadFromJson', true);
					break;
				case "download":
					this.$store.commit('updateExportPDF', true);
					break;
      }
    },
  },
};
</script>

<style scoped>
.v-list-item--link {
  border-bottom: 1px solid;
  border-color: #eaeaea;
}

.v-list-item__title {
  color: #000 !important;
  font-size: 18px;
  font-family: TT Norms Pro Bold;
}

.v-icon {
  color: #0070c9;
}

@media screen and (max-width: 1200px) {
  .sidebar_container {
    display: none;
  }
}
</style>