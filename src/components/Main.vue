<template>
	<div class="container">
		<div class="banner">
			<div class="recommend">
				<div class="recommend-title">
					<h3>{{ recommendItem[0].title }}</h3>
				</div>
				<div class="recommend-desc">
					<p>
						{{ recommendItem[0].desc }}
					</p>
				</div>
			</div>
			<div class="pic">
				<img src="" />
			</div>
		</div>
		<hr />
		<div class="featured-product">
			<div class="featured-product-title"><h2>精选商品</h2></div>
			<div class="card-contaner">
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div>
		</div>
	</div>
</template>

<script>
	import ProductCard from "@/components/ProductCard";
	export default {
		name: "Main",
		components: {
			ProductCard,
		},
		data() {
			return {
				recommendItemId: 1,
				recommendItem: [
					{
						id: 1,
						title: "Apple MacBook Air 13.3英寸电脑",
						desc: `Apple M1 芯片的到来，让这部我们最薄、最轻的笔记本电脑由内在焕然一新。与前代相比，中央处理器最高提速至 3.5
						倍，图形处理器最高提速至 5 倍，先进的神经网络引擎将机器学习最高提速至 9 倍；续航能力创下 MacBook Air
						之最；无风扇设计，运行时安静无声。这个身手轻巧的行动派，现在实力更是强到离谱。`,
					},
					{
						id: 2,
						title: "Javascript 高级程序设计",
						desc: `经典红宝书，前端必看。`,
					},
				],
			};
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
	.banner {
		min-width: 830px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80vw;
		margin-top: 40px;
		display: flex;
		background-color: rgb(228, 227, 227);
		border-radius: 10px;
		height: 450px;
		.recommend {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 1;
			color: #264653;
			.recommend-title {
				font-size: 1.8rem;
				padding: 20px;
			}
			.recommend-desc {
				font-size: 0.8rem;
				width: 420px;
				letter-spacing: 1px;
			}
		}
		.pic {
			flex: 1;
			justify-content: center;
			align-items: center;
			display: flex;
			img {
				// display: block;
				width: 400px;
				height: 300px;
			}
		}
	}

	.featured-product {
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
