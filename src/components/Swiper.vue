<template>
  <div class="swiper-container">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide><img src="../assets/agao1.jpg"/></swiper-slide>
      <swiper-slide><img src="../assets/agao2.jpg"/></swiper-slide>
      <swiper-slide><img src="../assets/agao3.jpg"/></swiper-slide>
      <!-- //标页码 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </swiper>
  </div>
</template>

<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "Swiper",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        roundLengths: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //允许分页点击跳转
          bulletActiveClass: "my-bullet-active"
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  }
};
</script>
<style lang="scss" scoped>
.swiper-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: #2a9d8f;
}
.swiper-container .swiper-slide {
  width: 100%;
  line-height: 200px;
  background: yellowgreen;
  color: #000;
  font-size: 16px;
  text-align: center;
}
.swiper-button-prev {
  left: 20px;
}
.swiper-button-next {
  right: 20px;
}
.my-bullet-active {
  background: #ff6600;
  opacity: 1;
}
</style>
