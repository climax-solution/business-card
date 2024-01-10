<template>
  <v-container>
    <v-row :class="{ [rowClass]: true }">
      <v-spacer></v-spacer>
      <v-responsive :aspect-ratio="1.75 / 1" class="designLayer">
        <canvas id="canvas_content" class="canvas_content"></canvas>
        <div style="height: 0px; overflow: hidden">
          <input type="file" @change="addImage" id="imgLoader" />
        </div>
        <div style="height: 0px; overflow: hidden">
          <input type="file" @change="setBackgroundImage" id="backLoader" />
        </div>
        <div style="height: 0px; overflow: hidden">
          <input type="file" @change="loadJson" id="jsonLoader" />
        </div>
      </v-responsive>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { fabric } from "fabric";
import { install } from "@yassidev/fabric-extensions";
import * as mdi from "@mdi/js";
import { kebabCase } from "lodash";
import jsPDF from "jspdf";
import "../assets/css/scrollbar.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "fabric-history";
import $ from "jquery";

install(fabric);
// icons(fabric)

fabric.util.registerIconLibrary("mdi", () => {
  return Object.entries(mdi).reduce((all, [key, value]) => {
    const normalized = kebabCase(key.replace(/^mdi/, ""));
    all[normalized] = value;
    return all;
  }, {});
});

export default {
  name: "CardContent",

  props: ["type"],

  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key == "Delete") {
        const length = this.canvas.getActiveObjects().length;
        if (length == 1) {
          const activeObject = this.canvas.getActiveObject();
          if (!activeObject.isEditing) {
            this.canvas.remove(activeObject);
          }
        } else {
          this.removeItems();
        }
      }
    });
  },

  data() {
    return {
      rowClass: "",
      canvas: null,
      frontJSON: null,
      backJSON: null,
      frontImage: null,
      backImage: null,
      imgLoader: null,
      backLoader: null,
      jsonLoader: null,
      showFront: true,
      showBack: false,
      pdfOption: {
        orientation: "landscape",
        format: "a4",
        unit: "px",
        lineHeight: 2,
        putOnlyUsedFonts: true,
        width: 774,
        height: 454,
      },
    };
  },

  mounted() {
    this.drawCanvas();
    const browserType = this.detectBrowser();
    this.rowClass = `ui-${browserType.toLowerCase()}`;
  },

  watch: {
    "$store.state.cardType": function () {
      // update frontShow of current card
      let json = this.canvas.toJSON();
      if (this.$store.state.cardType == "front") {
        json.backgroundImage = this.backImage;
        this.backJSON = JSON.stringify(json);
        if (this.frontJSON == null) {
          this.canvas.clear();
        } else {
          this.canvas.loadFromJSON(
            JSON.parse(this.frontJSON),
            this.canvas.renderAll.bind(this.canvas)
          );
        }
      } else {
        json.backgroundImage = this.frontImage;
        this.frontJSON = JSON.stringify(json);
        if (this.backJSON == null) {
          this.canvas.clear();
        } else {
          this.canvas.loadFromJSON(
            JSON.parse(this.backJSON),
            this.canvas.renderAll.bind(this.canvas)
          );
        }
      }
    },
    "$store.state.fontFamily": function () {
      // update fontFamily of activeObject
      this.updateCurrentFont(this.$store.state.fontFamily);
    },
    "$store.state.fontSize": function () {
      // update fontSize of activeObject
      this.updateCurrentSize(this.$store.state.fontSize);
    },
    "$store.state.fontColor": function () {
      // update fontColor of activeObject
      this.updateCurrentColor(this.$store.state.fontColor);
    },
    "$store.state.isBold": function () {
      // update bold status of activeObject
      this.updateBold(this.$store.state.isBold);
    },
    "$store.state.isItalic": function () {
      // update italic status of activeObject
      this.updateItalic(this.$store.state.isItalic);
    },
    "$store.state.isUnderline": function () {
      // update underline status of activeObject
      this.updateUnderline();
    },
    "$store.state.alignDirection": function () {
      // update align direction of activeObject
      this.updateAlignDirection(this.$store.state.alignDirection);
    },
    "$store.state.isDelete": function () {
      // delete activeObject
      this.deleteActiveObject();
    },
    "$store.state.textIndex": function () {
      // add text
      this.addText();
    },
    "$store.state.imageIndex": function () {
      // add image
      this.imgLoader.click();
    },
    "$store.state.backgroundIndex": function () {
      // set background
      this.backLoader.click();
    },
    "$store.state.backgroundColor": function () {
      // set background color
      this.updateBackColor(this.$store.state.backgroundColor);
    },
    "$store.state.isImageSet": function () {
      // remove background image
      if (!this.$store.state.isImageSet) {
        this.removeBackImage();
      }
    },
    "$store.state.undoIndex": function () {
      // undo clicked
      this.canvas.undo();
    },
    "$store.state.redoIndex": function () {
      // redo clicked
      this.canvas.redo();
    },
    "$store.state.iconName": function () {
      // add icon
      this.addIcon();
    },
    "$store.state.saveToJson": function () {
      // save to json
      if (this.$store.state.saveToJson) {
        this.saveCanvas();
        this.$store.commit("updateSaveToJson", false);
      }
    },
    "$store.state.loadFromJson": function () {
      // load from json
      if (this.$store.state.loadFromJson) {
        this.jsonLoader.click();
        this.$store.commit("updateLoadFromJson", false);
      }
    },
    "$store.state.exportPDF": function () {
      // export as pdf
      if (this.$store.state.exportPDF) {
        this.exportAsPDF();
        this.$store.commit("updateExportPDF", false);
      }
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
        console.log("Chrome");
        return "Chrome";
      } else if (navigator.userAgent.indexOf("Safari") != -1) {
        console.log("Safari");
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

    drawCanvas() {
      let box = document.querySelector(".v-responsive__sizer"); // set canvas size
      let width = box.clientWidth;
      let height = box.clientHeight;
      let canvas = document.getElementById("canvas_content");
      canvas.width = width;
      canvas.height = height;
      this.canvas = new fabric.Canvas("canvas_content", {
        // init canvas content
        backgroundColor: "#FFFFFF",
      });
      this.imgLoader = $("#imgLoader"); // init image loader
      this.backLoader = $("#backLoader"); // init background loader
      this.jsonLoader = $("#jsonLoader"); // init image loader
    },

    searchObjById(id) {
      const objs = this.canvas.getObjects();
      for (let i = 0; i < objs.length; i++) {
        if (objs[i].get("id") == id) {
          return objs[i];
        }
      }
    },

    updateCurrentFont(newFont) {
      if (this.canvas.getActiveObject() != undefined) {
        this.canvas.getActiveObject().set("fontFamily", newFont);
        this.canvas.renderAll();
      }
    },

    updateCurrentSize(newSize) {
      if (this.canvas.getActiveObject() != undefined) {
        this.canvas.getActiveObject().set("fontSize", newSize);
        this.canvas.renderAll();
      }
    },

    updateCurrentColor(newColor) {
      if (this.canvas.getActiveObject() != undefined) {
        this.canvas.getActiveObject().set("fill", newColor);
        this.canvas.renderAll();
      }
    },

    updateBold(isBold) {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject != undefined) {
        if (isBold) {
          activeObject.set("fontWeight", "bold");
        } else {
          activeObject.set("fontWeight", "normal");
        }
        this.canvas.renderAll();
      }
    },

    updateItalic(isItalic) {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject != undefined) {
        if (isItalic) {
          activeObject.set("fontStyle", "italic");
        } else {
          activeObject.set("fontStyle", "normal");
        }
        this.canvas.renderAll();
      }
    },

    updateUnderline() {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject != undefined) {
        activeObject["underline"] = !activeObject["underline"];
        activeObject.set("textDecoration", "underline");
        activeObject.setSelectionStyles({ underline: true });
        this.canvas.renderAll();
      }
    },

    updateAlignDirection(alignDirection) {
      const activeObject = this.canvas.getActiveObject();
      if (activeObject != undefined) {
        activeObject.set("textAlign", alignDirection);
      }
      this.canvas.renderAll();
    },

    deleteActiveObject() {
      if (this.$store.state.isDelete) {
        this.canvas.getActiveObjects().forEach((obj) => {
          this.canvas.remove(obj);
        });
        this.canvas.discardActiveObject().renderAll();
        this.$store.commit("updateIsDelete", false);
      }
    },

    addText() {
      const text = new fabric.IText("Click to edit text...", {
        id: 1,
        left: 100,
        top: 100,
        fontFamily: this.$store.state.fontFamily,
        fontSize: this.$store.state.fontSize,
        fill: this.$store.state.fontColor,
        fontWeight: this.$store.state.isBold ? "bold" : "normal",
        fontStyle: this.$store.state.isItalic ? "italic" : "normal",
        underline: this.$store.state.isUnderline,
        textAlign: this.$store.state.alignDirection,
      });
      this.canvas.add(text);
      this.canvas.setActiveObject(text);
      this.canvas.renderAll();
    },

    addImage(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var { canvas } = this;
      reader.onload = function (f) {
        var data = f.target.result;
        fabric.Image.fromURL(data, function (img) {
          var oImg = img.set({
            angle: 0,
            padding: 10,
            cornersize: 50,
          });
          oImg.scaleToHeight(150);
          oImg.scaleToWidth(150);
          canvas.centerObject(oImg);
          canvas.add(oImg);
          // onSelectionCleared();
          canvas.setActiveObject(oImg);
          canvas.renderAll();
          // var dataURL = canvas.toDataURL({ format: "png", quality: 0.8 });
        });
      };
      reader.readAsDataURL(file);
      $("#imgLoader")[0].value = "";
    },

    setBackgroundImage(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var { canvas } = this;
      var self = this;
      reader.onload = function (f) {
        var data = f.target.result;
        if (self.$store.state.cardType == "front") {
          self.frontImage = data;
        } else {
          self.backImage = data;
        }
        fabric.Image.fromURL(data, function (img) {
          img.set({
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height,
          });
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
          canvas.backgroundColor = "#FFFFFFFF";
          self.$store.commit("updateIsImageSet", true);
        });
      };
      reader.readAsDataURL(file);
      $("#backLoader")[0].value = "";
    },

    updateBackColor(color) {
      this.canvas.setBackgroundImage(null);
      this.canvas.backgroundColor = color;
      this.canvas.renderAll();
    },

    removeBackImage() {
      this.canvas.setBackgroundImage(null);
      this.canvas.renderAll();
    },

    addIcon() {
      const object = new fabric.Icon({
        iconName: this.$store.state.iconName,
        iconLibrary: "mdi", // unnecessary here as there is only one library
        width: 100,
        height: 100,
      });
      this.canvas.add(object);
    },

    saveCanvas() {
      var json = this.canvas.toJSON();
      if (this.$store.state.cardType == "front") {
        json.backgroundImage = this.frontImage;
      } else {
        json.backgroundImage = this.backImage;
      }
      var a = document.createElement("a");
      var file = new Blob([JSON.stringify(json)], {
        type: "text/plain",
      });
      a.href = URL.createObjectURL(file);
      a.download = "business_card.json";
      a.click();
    },

    loadJson(e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      const self = this;
      reader.onload = function (f) {
        var data = f.target.result;
        var json = JSON.parse(data);
        if (self.$store.state.cardType == "front") {
          self.frontImage = JSON.stringify(json.backgroundImage);
        } else {
          self.backImage = JSON.stringify(json.backgroundImage);
        }
        self.canvas.loadFromJSON(
          JSON.parse(data),
          self.canvas.renderAll.bind(self.canvas)
        );
      };
      reader.readAsText(file);
      $("#jsonLoader")[0].value = "";
    },

    exportAsPDF() {
      this.canvas.toDataURL("image/jpeg", 1.0).then((imgData) => {
        var pdf = new jsPDF(this.pdfOption);
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.save("business_card.pdf");
      });
    },

    removeItems() {
      this.canvas.getActiveObjects().forEach((obj) => {
        this.canvas.remove(obj);
      });
      this.canvas.discardActiveObject().renderAll();
    },
  },
};
</script>

<style scoped>
.ui-chrome {
  margin-top: 2%;
  margin-bottom: 2%;
  padding-left: 2%;
  padding-right: 2%;
}

.ui-safari {
  margin-top: 2%;
  margin-bottom: 2%;
  padding-left: 2%;
  padding-right: 2%;
}
.canvas-container {
  width: 100% !important;
  height: 100% !important;
}

.canvas_content {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.designLayer {
  width: 600px;
  height: 460px;
  background-color: #fff;
  border: 3px solid #0099cc;
}

.designDetail {
  display: flex;
  flex-grow: 1;
}

.panel-default {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-color: #ddd;
}

#properties {
  margin-left: 2%;
  margin-right: 2%;
  flex-basis: 50%;
}

#layers {
  flex-basis: 50%;
}

._card {
  height: 430px;
  overflow-y: scroll;
  white-space: nowrap;
}

.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}

.backgroundButton {
  margin-left: 10%;
  width: 85%;
}

#sortable {
  list-style-type: none;
  padding-left: 0 !important;
}

.layeritem {
  padding: 10px;
  color: blue;
}

@media screen and (max-width: 1200px) {
  ._card {
    height: 280px;
  }
  .designLayer {
    width: 80%;
    height: 400px;
  }
  .designDetail {
    width: 100%;
    justify-content: center;
  }
  ._card {
    height: 270px;
  }
}
</style>