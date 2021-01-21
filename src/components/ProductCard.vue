<template>
	<div class="product-card">
		<el-card :body-style="{ padding: '0px' }" class="card">
			<img :src="imgSrc" class="image" />
			<div style="padding: 14px;">
				<span style="font-size:1.1rem">{{ productName }}</span>
				<div class="bottom clearfix">
					{{ `￥` + productPrice }}
					<br /><br />
					<time class="time">{{ currentDate }}</time>
					<!-- <el-button type="text" class="button">操作按钮</el-button> -->
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: "ProductCard",
		props: ["imgSrc", "productName", "productPrice"],
		data() {
			return {
				currentDate: new Date(),
				// src: this.imageSrc,
			};
		},
		methods: {},
	};
</script>

<style scoped>
	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both;
	}
	.card {
		width: 180px;
		margin: 5px 26px;
	}
</style>
