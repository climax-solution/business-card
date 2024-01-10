<template>
  <v-navigation-drawer width="310" v-model="iconShow" absolute>
    <v-container>
      <v-list nav dense>
        <v-list-item-group active-class="text--accent-4">
          <v-row style="cursor: pointer">
            <v-col cols="12" @click="seticonShow()">
              <v-icon>mdi-arrow-left-thin</v-icon>
              Menu
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
							<v-text-field
								label=""
								height="30"
								outlined
								clearable
								placeholder="Search Icon"
								v-model="searchTerm"
							></v-text-field>
            </v-col>
          </v-row>
        </v-list-item-group>
        <v-row>
          <v-col
            cols="3"
            v-for="(name, index) in currentIcons"
            :key="index"
            link
            @click.stop="onIconClick(name)"
          >
            <v-icon>mdi-{{ name }}</v-icon>
          </v-col>
        </v-row>
				<v-row>
					<v-col cols="12" class="d-flex justify-space-between">
						<v-btn
							depressed
							@click="onPrev()"
							color="success"
						>
							<v-icon>
								mdi-arrow-left
							</v-icon>
						</v-btn>
						<v-btn
							depressed
							@click="onNext()"
							color="primary"
						>
							<v-icon>
								mdi-arrow-right
							</v-icon>
						</v-btn>
					</v-col>
				</v-row>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import iconData from "../assets/icons/material.json";

export default {
  name: "Icons",
  props: ["isShow"],
  data() {
    return {
			currentPage: 1,
			pageSize: 32,		// initial page size
			pageCount: 171,	// total count = 5455
			totalIcons: iconData,
      currentIcons: [],
			searchTerm: "",
      iconShow: this.isShow,
    };
  },
  mounted() {
		this.updateCurrentIcons();
  },
  watch: {
    isShow(newVal) {
      this.iconShow = newVal;
    },
		searchTerm: function (val) {
			if(val == null || val == "") {
				this.searchTerm = "";
				this.currentPage = 1;
				this.totalIcons = iconData;
				this.pageSize = 32;
			}
			else {
				this.searchTerm = val;
				this.totalIcons = iconData.filter((item) => item.includes(val));
				this.currentPage = 1;
				if(this.totalIcons.length < this.pageSize) {		// totalSize < pageSize
					this.pageCount = 1;
					this.pageSize = this.totalIcons.length;
				}
				else if(this.totalIcons.length % this.pageSize > 0) {
					this.pageCount = (this.totalIcons.length - this.totalIcons.length % this.pageSize) / this.pageSize;
				}
				else {
					this.pageCount = this.totalIcons.length / this.pageSize;
				}
			}
			this.updateCurrentIcons();
    },
  },
  methods: {
    seticonShow() {
      this.iconShow = false;
      this.$emit("update:isShow", this.iconShow);
    },
    onIconClick(name) {
			this.$store.commit('updateIconName', name);
    },
		onPrev() {
			if(this.currentPage > 1) {
				let temp = [];
				for(let i = (this.currentPage - 2) * this.pageSize ; i < (this.currentPage - 1) * this.pageSize ; i ++) {
					temp.push(this.totalIcons[i]);
				}
				this.currentPage -= 1;
				this.currentIcons = temp;
			}
		},
		onNext() {
			if(this.currentPage < this.pageCount) {
				let temp = [];
				for(let i = this.currentPage * this.pageSize ; i < (this.currentPage + 1) * this.pageSize ; i ++) {
					temp.push(this.totalIcons[i]);
				}
				this.currentPage += 1;
				this.currentIcons = temp;
			}
		},
		updateCurrentIcons() {
			let temp = [];
			for(let i = 0 ; i < this.pageSize ; i ++) {
				temp.push(this.totalIcons[i]);
			}
			this.currentIcons = temp;
		}
  },
};
</script>
