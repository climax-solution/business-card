import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
		fontFamily: "",		// current fontFamily
		fontSize: 30,
		fontColor: "#000000FF",
		isBold: false,
		isItalic: false,
		isUnderline: false,
		alignDirection: "left",
		isDelete: false,
    textIndex: 0,						// add text button
		imageIndex: 0,					// add image button
		backgroundIndex: 0,			// set background button
		backgroundColor: "#000000FF",
		isImageSet: false,			// background image is set
		undoIndex: false,
		redoIndex: false,
		iconName: "",						// current clicked icon's name
		saveToJson: false,			// save button
		loadFromJson: false,		// load json
		exportPDF: false,			// export as pdf
    cardType: "front",					// card side
  },
  mutations: {
		updateFontFamily: (state, payload) => {
			state.fontFamily = payload;
		},
		updateFontSize: (state, payload) => {
			state.fontSize = payload;
		},
		updateFontColor: (state, payload) => {
			state.fontColor = payload;
		},
		updateIsBold: (state, payload) => {
			state.isBold = payload;
		},
		updateIsItalic: (state, payload) => {
			state.isItalic = payload;
		},
		updateIsUnderline: (state, payload) => {
			state.isUnderline = payload;
		},
		updateAlignDirection: (state, payload) => {
			state.alignDirection = payload;
		},
		updateIsDelete: (state, payload) => {
			state.isDelete = payload;
		},
    updateTextIndex: (state) => {
      state.textIndex ++;
    },
		updateImageIndex: (state) => {
      state.imageIndex ++;
    },
		updateBackgroundIndex: (state) => {
			state.backgroundIndex ++;
		},
		updateBackgroundColor: (state, payload) => {
			state.backgroundColor = payload;
		},
		updateIsImageSet: (state, payload) => {
			state.isImageSet = payload;
		},
    updateIconName: (state, payload) => {
      state.iconName = payload;
    },
    updateUndoIndex: (state) => {
			state.undoIndex ++;
    },
    updateRedoIndex: (state) => {
      state.redoIndex ++;
    },
		updateSaveToJson: (state, payload) => {
			state.saveToJson = payload;
		},
		updateLoadFromJson: (state, payload) => {
			state.loadFromJson = payload;
		},
		updateExportPDF: (state, payload) => {
			state.exportPDF = payload;
		},
    updateCardType: (state, payload) => {
      state.cardType = payload;
    },
  },
})