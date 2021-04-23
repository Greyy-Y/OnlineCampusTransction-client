<template>
	<div class="container">
		<div class="swiper" v-loading="loading" element-loading-text="加载中...">
			<el-carousel :interval="3000" height="400px">
				<el-carousel-item v-for="(item, index) in recommendItem" :key="index">
					<div class="recommend" @click="toDetail(item)">
						<div class="recommend-item">
							<div class="recommend-item-title">
								<h1>{{ item.good.name }}</h1>
							</div>
							<div class="recommend-item-desc">
								<p>
									{{ item.good.desc }}
								</p>
							</div>
						</div>
						<div class="recommend-item-pic">
							<img :src="baseUrl + item.good.pic" />
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>

		<hr />
		<div class="featured-product">
			<div class="featured-product-title"><h2>精选商品</h2></div>
			<div class="card-contaner">
				<featuredProductCard
					v-for="(item, index) in featuredItem"
					:key="index"
					:gid="item.good._id"
					:imgSrc="baseUrl + item.good.pic"
					:productName="item.good.name"
					:productPrice="item.good.price"
					:updatedAt="item.good.updatedAt"
				></featuredProductCard>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetRecommend, GetFeatured, AddViewed } from "@/api/goods";
	import featuredProductCard from "@/components/featuredProductCard";
	export default {
		name: "IndexMain",
		components: {
			featuredProductCard,
		},
		data() {
			return {
				loading: true,
				data: [],
				// 推荐商品
				recommendItem: [],
				//精选商品
				featuredItem: [],
				// baseUrl: "http://localhost:3000/",
				baseUrl:this.baseUrl,
			};
		},
		methods: {
			async getRecommend() {
				const res = await GetRecommend();
				//将请求的内容缓存到data
				let data = res.data.data;
				//获取推荐商品
				this.recommendItem = data;
				//循环遍历 更新推荐商品图片路径
				this.recommendItem.map((item) => {
					item.good.updatedAt = this.dayjs(item.good.updatedAt).format("YYYY-MM-DD");
				});
				this.loading = false;
			},
			async getFeatured() {
				const res = await GetFeatured();
				let data = res.data.data;
				//获取推荐商品
				this.featuredItem = data;
				//循环遍历 更新推荐商品图片路径
				this.featuredItem.map((item) => {
					item.good.updatedAt = this.dayjs(item.good.updatedAt).format("YYYY-MM-DD");
				});
			},
			toDetail(item) {
				this.addViewed(item.good._id);
				this.$router.push({ name: "Goods_detail", params: { gid: item.good._id } });
			},
			async addViewed(gid) {
				const res = await AddViewed(gid);
				console.log(res);
			},
		},
		mounted() {
			this.getRecommend();

			this.getFeatured();
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.swiper {
		width: 80vw;
		height: 400px;
		margin-top: 20px;
		.recommend {
			height: 400px;
			display: flex;
			border-radius: 20px;
			background-color: rgb(247, 247, 247);
			cursor: pointer;
			.recommend-item {
				flex: 1;
				min-width: 400px;
				justify-content: center;
				align-items: center;
				display: flex;
				flex-direction: column;
				margin-left: 80px;
				.recommend-item-title {
					font-size: 1.4rem;
					letter-spacing: 1px;
				}
				.recommend-item-desc {
					width: 90%;
				}
			}
			.recommend-item-pic {
				flex: 1;
				justify-content: center;
				align-items: center;
				display: flex;
				img {
					width: 450px;
					height: 350px;
					object-fit: contain;
				}
			}
		}
	}
	.featured-product {
		border-radius: 20px;
		min-width: 830px;
		color: #264653;
		width: 80vw;
		margin: 6px 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: rgb(247, 247, 247);

		.card-contaner {
			display: flex;
			justify-content: space-around;
		}
	}
	.el-card__body {
		cursor: pointer;
	}
</style>
