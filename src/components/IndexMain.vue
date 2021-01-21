<template>
	<div class="container">
		<div class="swiper">
			<el-carousel :interval="3000" height="480px">
				<el-carousel-item>
					<div class="recommend">
						<div class="recommend-item">
							<div class="recommend-item-title">
								<h1>{{ recommendItem[0].title }}</h1>
							</div>
							<div class="recommend-item-desc">
								<p>
									{{ recommendItem[0].desc }}
								</p>
							</div>
						</div>
						<div class="recommend-item-pic">
							<img src="../assets/MacBookAir.jpeg" />
						</div>
					</div>
				</el-carousel-item>
				<el-carousel-item>
					<div class="recommend">
						<div class="recommend-item">
							<div class="recommend-item-title">
								<h1>{{ recommendItem[1].title }}</h1>
							</div>
							<div class="recommend-item-desc">
								<p>
									{{ recommendItem[1].desc }}
								</p>
							</div>
						</div>
						<div class="recommend-item-pic">
							<img src="../assets/jsbook.jpg" />
						</div>
					</div>
				</el-carousel-item>
				<el-carousel-item>
					<div class="recommend">
						<div class="recommend-item">
							<div class="recommend-item-title">
								<h1>{{ recommendItem[2].title }}</h1>
							</div>
							<div class="recommend-item-desc">
								<p>
									{{ recommendItem[2].desc }}
								</p>
							</div>
						</div>
						<div class="recommend-item-pic">
							<img :src="recommendItem[2].src" />
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>

		<hr />
		<div class="featured-product">
			<div class="featured-product-title"><h2>精选商品</h2></div>
			<div class="card-contaner">
				<ProductCard
					:imgSrc="featuredProductSrc[0].src"
					:productName="featuredProductSrc[0].name"
					:productPrice="featuredProductSrc[0].price"
				></ProductCard>
				<ProductCard
					:imgSrc="featuredProductSrc[1].src"
					:productName="featuredProductSrc[1].name"
					:productPrice="featuredProductSrc[1].price"
				></ProductCard>
				<ProductCard
					:imgSrc="featuredProductSrc[2].src"
					:productName="featuredProductSrc[2].name"
					:productPrice="featuredProductSrc[2].price"
				></ProductCard>
				<ProductCard
					:imgSrc="featuredProductSrc[3].src"
					:productName="featuredProductSrc[3].name"
					:productPrice="featuredProductSrc[3].price"
				></ProductCard>
				<ProductCard
					:imgSrc="featuredProductSrc[4].src"
					:productName="featuredProductSrc[4].name"
					:productPrice="featuredProductSrc[4].price"
				></ProductCard>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetGoods } from "@/api/goods";
	import ProductCard from "@/components/ProductCard";
	export default {
		name: "IndexMain",
		components: {
			ProductCard,
		},
		data() {
			return {
				data: null,
				recommendItem: [
					{
						title: "Apple MacBook Air 13.3英寸电脑",
						desc: `Apple M1 芯片的到来，让这部我们最薄、最轻的笔记本电脑由内在焕然一新。与前代相比，中央处理器最高提速至 3.5
							倍，图形处理器最高提速至 5 倍，先进的神经网络引擎将机器学习最高提速至 9 倍；续航能力创下 MacBook Air
							之最；无风扇设计，运行时安静无声。这个身手轻巧的行动派，现在实力更是强到离谱。`,
						src: "../assets/MacBookAir.jpeg",
					},
					{
						title: "Javascript 高级程序设计",
						desc: `经典红宝书，前端必看。`,
						src: "../assets/agao1.jpg",
					},
					{
						title: "吉安娜手办",
						desc: `吉安娜·普罗德摩尔是暴雪娱乐公司出品的即时战略游戏《魔兽争霸Ⅲ》及大型多人在线角色扮演游戏《魔兽世界》中的人类角色。
	法力强大的的法师吉安娜·普罗德摩尔曾是已被摧毁的塞拉摩统治者、肯瑞托领袖，现在是库尔提拉斯的海军统帅。`,
						src: "http://localhost:8080/img/jina.db0e8a1f.jpg",
					},
				],
				featuredProductSrc: [
					{ name: "Javascript 高级程序设计", src: "/img/jsbook.fbf42bd7.jpg", price: 39 },
					{ name: "MacBook", src: "http://localhost:8080/img/mac0.9d7845d7.jpg", price: 3999 },
					{ name: "AirPods", src: "http://localhost:8080/img/airpods.f2dd609d.jpeg", price: 266 },
					{ name: "山地车", src: "http://localhost:8080/img/bike.14c2a529.jpeg", price: 199 },
					{ name: "吉安娜手办", src: "http://localhost:8080/img/jina.db0e8a1f.jpg", price: 299 },
				],
			};
		},
		methods: {
			handlePre() {
				console.log("you clicked last-one button");
				if (this.recommendItemId === 0) {
					this.recommendItemId = 2;
				} else {
					this.recommendItemId -= 1;
				}
			},
			handleNext() {
				console.log("you clicked next-one button");
				if (this.recommendItemId === 2) {
					this.recommendItemId = 0;
				} else {
					this.recommendItemId += 1;
				}
			},
		},
		// computed: {
		// 	currentRecommendItemId: function() {
		// 		return this.recommendItemId;
		// 	},
		// currentRecommendItemPic: function() {
		// 	return this.recommendItem[recommendItemId].src;
		// },
		mounted: function() {
			GetGoods().then((res) => {
				(this.data = res.data.data), console.log("z这是从后台获取回来的data");
				console.log(this.data);
			});
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
		height: 480px;
		margin-top: 40px;
		.recommend {
			height: 480px;
			display: flex;
			border-radius: 20px;
			background-color: rgb(228, 227, 227);
			.recommend-item {
				flex: 1;
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
					width: 500px;
					height: 400px;
					// object-fit: cover;
					// object-fit: fill;
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
		margin-top: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: rgb(228, 227, 227);
		.featured-product-title {
			padding-bottom: 10px;
		}
		.card-contaner {
			display: flex;
			justify-content: space-around;
		}
	}
</style>
