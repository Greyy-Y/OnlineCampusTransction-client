<template>
  <div class="app">
    <Navbar @find-goods-by-name="findGoodsByName" />
    <Menu
      @sort-type="sort"
      @cate-goodlist="updateGoodList"
      @reset-goodlist="resetGoodList"
    />
    <div class="goods">
      <el-backtop target=".goods"></el-backtop>
      <ProductCard :vgoods="vgoods" :sortCate="sortCate" />
      <el-pagination
        v-if="vgoods.length != 0"
        background
        layout="prev, pager, next"
        :total="goods.length"
        :page-size="20"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
    <Footer />
  </div>
</template>

<script>
import { GetGoods } from "@/api/goods";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
export default {
  name: "Goods",
  components: {
    Navbar,
    Footer,
    Menu,
    ProductCard
  },
  data() {
    return {
      sortType: {},
      goods: [],
      vgoods: [],
      sortCate: {},
      baseUrl: "",
      page: 1
    };
  },
  methods: {
    async getGoods() {
      const res = await GetGoods();
      this.goods = res.data.data;
      // 更新商品图片路径 ，日期格式
      this.goods.map(item => {
        item.date = this.dayjs(item.createdAt).unix();
        item.createdAt = this.dayjs(item.createdAt).format("YYYY-MM-DD");
      });
      this.goods = this.goods.sort(this.compareSort("date", false));
      this.vgoods = this.goods.slice(0, this.page * 20);
      console.log(this.vgoods);
    },
    // 子组件传递的菜单排序字段
    sort(item, status) {
      this.sortType = { type: item, asc: status };
    },
    //子组件传递的特定目录的商品
    updateGoodList(goodList) {
      this.goods = goodList;
      this.vgoods = goodList;
    },
    //重置商品列表（显示所有商品）
    resetGoodList() {
      this.getGoods();
    },
    findGoodsByName(goodList) {
      this.goods = goodList;
      this.vgoods = this.goods;
    },
    handlePageChange(curPage) {
      if (curPage - this.page > 0) {
        this.vgoods = this.vgoods.concat(
          this.goods.slice((curPage - 1) * 20, curPage * 20)
        );
        this.page = curPage;
      } else {
        this.vgoods = this.goods.slice(0, curPage * 20);
        this.page = curPage;
      }
    },
    // 排序
    compareSort(prop, desc = false) {
      return function(obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (desc == true) {
          // 升序排列
          return val1 - val2;
        } else {
          // 降序排列
          return val2 - val1;
        }
      };
    }
  },
  watch: {
    sortType() {
      this.sortCate = this.sortType;
    }
  },
  mounted: function() {
    this.getGoods();
  }
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .goods {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
}
</style>
