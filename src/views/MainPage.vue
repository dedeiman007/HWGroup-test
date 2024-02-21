<template>
  <div class="container" @click="is_show_search_box = false">
    <div class="header">
      <div class="d-flex no-flex mt-1">
        <div class="d-flex align-items-center justify-content-center">
          <div class="hw-logo">
            <img src="../assets/logo.webp" width="50" alt="" />
          </div>
          <div class="ml-1 hw-logo-title">Group</div>
        </div>
        <div class="search-form-body ml-auto position-relative m-mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            role="img"
            class="search-icon"
          >
            <path
              d="M1.5 7.75C1.5 9.4076 2.15848 10.9973 3.33058 12.1694C4.50269 13.3415 6.0924 14 7.75 14C9.4076 14 10.9973 13.3415 12.1694 12.1694C13.3415 10.9973 14 9.4076 14 7.75C14 6.0924 13.3415 4.50269 12.1694 3.33058C10.9973 2.15848 9.4076 1.5 7.75 1.5C6.0924 1.5 4.50269 2.15848 3.33058 3.33058C2.15848 4.50269 1.5 6.0924 1.5 7.75V7.75Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12.814 12.8132L15.5 15.4999"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <input
            type="text"
            class="search-form"
            placeholder="Search..."
            v-model="search"
            @input="changeSearch()"
          />
          <div class="search-box" v-if="is_show_search_box">
            <div
              v-bind:class="{
                'scroll-dropdown': filteredSearch.length > 8,
              }"
            >
              <template v-if="filteredSearch.length > 0">
                <div v-for="(data, index) in filteredSearch" :key="index">
                  <div class="search-title" @click="onInputSearch(data, index)">
                    {{ data.title }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="no-result">No Result Found</div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="second-header">
      <div class="d-flex align-items-center no-flex m-center">
        <div>
          Indonesia’s Biggest & Fastest Growing Lifestyle Entertainment Company.
        </div>
        <div class="ml-auto m-mt-1">
          <button class="btn-primary" @click="goWebsite()">
            Go to Website <i class="fa fa-angle-right ml-button"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="slider position-relative">
      <ul>
        <li
          v-for="(slide, index) in sliders"
          :key="index"
          :class="{ active: index === currentIndex }"
        >
          <img :src="slide.image_url" :alt="index" />
          <div class="slider-title">
            CURATORS OF<br />
            UNFORGETTABLE<br />
            EXPERIENCES
          </div>
        </li>
      </ul>
      <div class="body-button-slider">
        <button @click="roll('prev')" class="button-slider left">
          <i class="fa fa-angle-left"></i>
        </button>
        <button @click="roll('next')" class="button-slider right">
          <i class="fa fa-angle-right"></i>
        </button>
      </div>
    </div>
    <div class="container-gallery">
      <h1 class="mt-2">Gallery List</h1>
      <div>See All Your Gallery List.</div>
      <div class="scrolling-wrapper-flexbox">
        <div
          v-for="(item, index) in is_click_search ? filteredSearch : datas"
          :key="index"
          class="card"
        >
          <div
            class="gallery-box position-relative mt-galery"
            :style="{
              'background-image': 'url(' + item.image_url + ')',
            }"
          >
            <div class="bookmark-box">
              <span class="top-tooltip-text"> Save Now </span>
              <i class="fa fa-bookmark-o"></i>
            </div>
            <div class="galery-body position-relative">
              <div class="title-body">
                <div>{{ item.title }}</div>
                <div class="mt-rating">
                  <label
                    class="star-rating"
                    v-for="(rating, index) in ratings"
                    :class="{
                      'is-selected':
                        item.rating >= rating && item.rating != null,
                      'is-disabled': '',
                    }"
                    :key="index"
                  >
                    <input
                      class="star-rating star-rating-checkbox"
                      type="radio"
                    />
                    <i class="fa fa-star mr-star"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <footer class="footer">
        <img src="../assets/logo-white.webp" width="90" alt="" />
        <div>© 2024 HWGroup Indonesia All rights reserved.</div>
      </footer>
    </div>
  </div>
</template>

<script>
import datas from "../json/images.json";
import slide1 from "../assets/slide-1.webp";
import slide2 from "../assets/slide-2.webp";
import slide3 from "../assets/slide-3.webp";
import slide4 from "../assets/slide-4.webp";
import slide5 from "../assets/slide-5.webp";
export default {
  name: "MainPage",
  props: {},
  data() {
    return {
      datas: datas,
      ratings: [1, 2, 3, 4, 5],
      playing: false,
      currentIndex: 0,
      time_of_slide: 2000,
      timer: null,
      sliders: [
        {
          image_url: slide1,
        },
        {
          image_url: slide2,
        },
        {
          image_url: slide3,
        },
        {
          image_url: slide4,
        },
        {
          image_url: slide5,
        },
      ],
      is_show_search_box: false,
      search: "",
      filteredSearch: [],
      is_click_search: false,
    };
  },
  created() {
    clearInterval(this.timer);
    this.setAutoRoll();
  },
  methods: {
    goWebsite() {
      window.open("https://new.hwgroup.id/", "_blank");
    },
    setAutoRoll() {
      let vueSelf = this;
      this.timer = setInterval(function () {
        vueSelf.addIndex();
      }, this.time_of_slide);
    },
    addIndex() {
      let newIndex = this.currentIndex + 1;
      this.currentIndex = newIndex === this.sliders.length ? 0 : newIndex;
    },
    roll(direction) {
      let diff = direction === "prev" ? -1 : 1;
      this.currentIndex = this.getTargetIndex(diff);
    },
    getTargetIndex(diff) {
      let length = this.sliders.length;
      let index = this.currentIndex + diff;
      if (index === -1) {
        return length - 1;
      }
      if (index === length) {
        return 0;
      }
      return index;
    },
    onInputSearch(data, index) {
      this.is_click_search = true;
      this.search = data.title;
      this.datas[index].is_show_search_box =
        !this.datas[index].is_show_search_box;
      var filteredSearch = this.datas.filter((item) => {
        return item.title.toLowerCase().includes(this.search.toLowerCase());
      });
      return (this.filteredSearch = filteredSearch);
    },
    changeSearch() {
      this.is_click_search = false;
      this.is_show_search_box = true;
      var filteredSearch = this.datas.filter((item) => {
        return item.title.toLowerCase().includes(this.search.toLowerCase());
      });
      return (this.filteredSearch = filteredSearch);
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
