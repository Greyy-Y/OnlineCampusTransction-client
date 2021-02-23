<template>
	<div class="app">
		<Navbar />
		<Menu @sort-type="sort" />
		<div class="goods">
			<ProductCard :vgoods="vgoods" :sortCate="sortCate" />
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
			ProductCard,
		},
		data() {
			return {
				sortType: {},
				goods: [],
				vgoods: [],
				sortCate: {},
			};
		},
		methods: {
			async getGoods() {
				const res = await GetGoods();
				this.goods = res.data.data;
				// 更新商品图片路径 ，日期格式
				this.goods.map((item) => {
					item.pic.forEach((element) => {
						item.pic = "http://localhost:3000/" + element;
					});
					item.date = this.dayjs(item.createdAt).unix();
					item.createdAt = this.dayjs(item.createdAt).format("YYYY-MM-DD");
				});
			},
			// 子组件传递的菜单排序字段
			sort(item, status) {
				this.sortType = { type: item, asc: status };
			},
		},
		watch: {
			sortType() {
				this.sortCate = this.sortType;
			},
			goods() {
				this.vgoods = this.goods;
			},
		},
		mounted: function() {
			this.getGoods();
		},
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
		}
	}
</style>
