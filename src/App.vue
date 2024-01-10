<template>
  <v-app>
    <nav-bar />
		<v-main>
			<div style="display: flex; height: 100%;">
				<side-bar />
				<business-card />
			</div>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import BusinessCard from "./components/BusinessCard";
import axios from "axios";

export default {
  name: "App",

  components: {
    NavBar,
    SideBar,
    BusinessCard,
  },

  data: () => ({
    //
  }),

  mounted() {
    // Add a request interceptor
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  },
};
</script>

<style scoped lang="scss">
::v-deep .v-application--wrap {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}
@font-face {
  font-family: TT Norms Pro Bold;
  src: url("./assets/fonts/TT Norms Pro Bold.otf");
}
@font-face {
	font-family: Palatino LT;
	src: url("./assets/fonts/Palatino LT.otf");
}
@font-face {
	font-family: Amethyste;
	src: url("./assets/fonts/Amethyste.otf");
}
@font-face {
	font-family: AgedBook;
	src: url("./assets/fonts/AgedBook.ttf");
}
@font-face {
	font-family: Arial;
	src: url("./assets/fonts/Arial.ttf");
}
@font-face {
	font-family: Arial Rounded MT;
	src: url("./assets/fonts/Arial Rounded MT.ttf");
}
@font-face {
	font-family: Avenir Next LT Pro;
	src: url("./assets/fonts/Avenir Next LT Pro.otf");	
}
@font-face {
	font-family: AZ Cut Script;
	src: url("./assets/fonts/AZ Cut Script.otf");	
}
@font-face {
	font-family: BankGothic Lt BT;
	src: url("./assets/fonts/BankGothic Lt BT.ttf");	
}
@font-face {
	font-family: Bebas;
	src: url("./assets/fonts/Bebas.ttf");	
}
@font-face {
	font-family: Bernhard Fashion Com;
	src: url("./assets/fonts/Bernhard Fashion Com.ttf");	
}
@font-face {
	font-family: Blue Century;
	src: url("./assets/fonts/Blue Century.ttf");	
}
@font-face {
	font-family: Broadway MT Std;
	src: url("./assets/fonts/Broadway MT Std.otf");	
}
@font-face {
	font-family: CA Emeralda Script;
	src: url("./assets/fonts/CA Emeralda Script.otf");	
}
</style>
