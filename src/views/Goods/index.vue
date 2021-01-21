<template>
	<div class="app">
		<Navbar />
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
							<img src="../../assets/MacBookAir.jpeg" />
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
							<img src="../../assets/jsbook.jpg" />
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
							<img src="../../assets/img/jina.jpg" />
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar";
	import Footer from "@/components/Footer";
	export default {
		name: "Goods",
		components: {
			Navbar,
			Footer,
		},
		data() {
			return {
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
						src: "../assets/agao2.jpg",
					},
				],
			};
		},
	};
</script>

<style lang="scss" scoped>
	.swiper {
		width: 80%;
		height: 480px;
		margin-top: 20px;
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

	// .el-carousel__item h3 {
	// 	color: #475669;
	// 	font-size: 14px;
	// 	opacity: 0.75;
	// 	line-height: 200px;
	// 	margin: 0;
	// }
</style>
