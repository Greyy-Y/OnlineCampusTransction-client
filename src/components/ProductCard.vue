<template>
	<div class="goods-container">
		<div class="goods" v-for="(item, index) in goods" :key="index" @click="toDetail(item)">
			<el-card :body-style="bodyStyle" shadow="always">
				<img :src="item.pic" class="image" />
				<div class="good-intro">
					<div class="good-name">
						{{ item.name }}
					</div>
					<div class="good-info">
						<time class="time">{{ "更新于 " + item.updatedAt }}</time>
						<span>{{ item.viewed + " 浏览" }}</span>
					</div>
					<div class="good-desc">
						{{ item.desc }}
					</div>
					<div class="good-price">
						{{ `￥${item.price}元` }}
					</div>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	import { GetGoods } from "@/api/goods";
	export default {
		data() {
			return {
				goods: [],
				bodyStyle: {
					padding: "2px",
					height: "auto",
				},
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
					item.updatedAt = this.dayjs(item.updatedAt).format("YYYY-MM-DD");
				});
			},
			toDetail(item) {
				this.$router.push({ name: "Goods_detail", params: { gid: item._id } });
			},
		},

		mounted: function() {
			this.getGoods();
		},
	};
</script>

<style lang="scss" scoped>
	.goods-container {
		width: 80vw;
		columns: 5;
		column-gap: 30px;
		margin: 30px auto;
		.goods {
			width: 100%px;
			break-inside: avoid;
			margin: 20px 0;
			cursor: pointer;
			.image {
				transition: ease 0.3s;
				object-fit: cover;
				width: 100%;
				cursor: pointer;
				overflow: hidden;
			}
			.image:hover {
				transform: scale(1.1);
			}
			.good-intro {
				display: flex;
				flex-direction: column;
				.good-name {
					margin: 12px 6px 6px 6px;
				}
				.good-info {
					display: flex;
					justify-content: space-around;
					font-size: 0.6rem;
					color: #93999f;
					margin: 5px 0;
					span {
						margin: 0 0 0 14px;
					}
					time {
						margin-left: -8px;
					}
				}
				.good-desc {
					display: -webkit-box;
					text-align: left;
					letter-spacing: 1px;
					color: #93999f;
					font-size: 0.7rem;
					overflow: hidden;
					text-overflow: ellipsis;
					word-wrap: break-word;
					word-break: break-all;
					-webkit-line-clamp: 3; //块元素显示的文本行数
					-webkit-box-orient: vertical;
					margin: 5px 0;
					padding: 0 0 0 4px;
				}
				.good-price {
					color: #2a9d8f;
					margin: 2px 0;
				}
			}
		}
	}
</style>
