<template>
  <v-footer
    color="white"
    class="mobileView"
    style="border-top: 2px solid #eaeaea"
    :class="{ [footerPosition]: true }"
  >
    <div class="main-footer">
      <v-btn
        v-for="item in items"
        :key="item.key"
        text
        rounded
        class="flex-grow-1"
        @click.stop="onItemClick(item.key)"
      >
        <div class="buttonDesign1">
          <v-icon color="primary">
            {{
              item.key == "setBackground" && background_clicked
                ? "mdi-delete"
                : item.icon
            }}
          </v-icon>
          <p style="font-size: 12px; margin-bottom: 0">{{ item.title }}</p>
        </div>
      </v-btn>
    </div>
    <icons :iconView.sync="iconView" />
    <back-color :colorView.sync="colorView" />
  </v-footer>
</template>

<script>
import BackColor from "./sidebar/mobile/BackColor";
import Icons from "./sidebar/mobile/Icons";

export default {
  name: "Footer",

  components: {
    BackColor,
    Icons,
  },

  data() {
    return {
      footerPosition: "",
      background_clicked: false,
      iconView: false,
      colorView: false,
      items: [
        {
          key: "addText",
          title: "Add Text",
          icon: "mdi-format-textbox",
        },
        {
          key: "addImage",
          title: "Add Image",
          icon: "mdi-image",
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
        },
        {
          key: "redo",
          title: "Redo",
          icon: "mdi-arrow-u-right-top",
        },
        {
          key: "upload",
          title: "Load",
          icon: "mdi-upload",
        },
        {
          key: "download",
          title: "Export as pdf",
          icon: "mdi-file-download-outline",
        },
        {
          key: "save",
          title: "Save",
          icon: "mdi-content-save",
        },
      ],
    };
  },

  mounted() {
    const browserType = this.detectBrowser();
    this.footerPosition = `ui-${browserType.toLowerCase()}`;
  },

  watch: {
    "$store.state.isImageSet": function () {
      // update fontFamily of activeObject
      this.background_clicked = this.$store.state.isImageSet;
    },
  },

  methods: {
    detectBrowser() {
      if (
        (navigator.userAgent.indexOf("Opera") ||
          navigator.userAgent.indexOf("OPR")) != -1
      ) {
        return "Opera";
      } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
      } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
      } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
      } else if (
        navigator.userAgent.indexOf("MSIE") != -1 ||
        !!document.documentMode == true
      ) {
        return "IE"; //crap
      } else {
        return "Unknown";
      }
    },

    onItemClick(key) {
      switch (key) {
        case "addText":
          this.$store.commit("updateTextIndex");
          break;
        case "addImage":
          this.$store.commit("updateImageIndex");
          break;
        case "setBackground":
          if (this.background_clicked) {
            this.$store.commit("updateIsImageSet", false);
          } else {
            this.$store.commit("updateBackgroundIndex");
          }
          break;
        case "setBackColor":
          this.colorView = !this.colorView;
          break;
        case "icons":
          this.iconView = !this.iconView;
          break;
        case "undo":
          this.$store.commit("updateUndoIndex");
          break;
        case "redo":
          this.$store.commit("updateRedoIndex");
          break;
        case "save":
          this.$store.commit("updateSaveToJson", true);
          break;
        case "upload":
          this.$store.commit("updateLoadFromJson", true);
          break;
        case "download":
          this.$store.commit("updateExportPDF", true);
          break;
      }
    },
  },
};
</script>

<style scoped>
footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.main-footer {
  width: 100%;
  overflow: auto hidden;
  display: flex;
  flex-wrap: nowrap;
  padding: 10px 0;
}

.buttonDesign {
  display: flex;
  flex-direction: column;
}

@media screen and (min-width: 1200px) {
  .mobileView {
    display: none;
  }
}
</style>