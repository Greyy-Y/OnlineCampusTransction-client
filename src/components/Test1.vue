<template>
	<div class="goods-wrapper">
		<div class="no-content" v-if="this.goods.length == 0">
			<img src="../assets/img/nocontent.png" />
			<span>暂无相关商品~~</span>
		</div>
		<div class="goods-container">
			<div class="goods" v-for="(item, index) in goods" :key="index" @click="toDetail(item)">
				<el-card :body-style="bodyStyle" shadow="always">
					<img :src="baseUrl + item.pic" class="image" />
					<div class="good-intro">
						<div class="good-name">
							{{ item.name }}
						</div>
						<div class="good-info">
							<time class="time">{{ "创建于 " + item.createdAt }}</time>
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
	</div>
</template>

//
<script>
	import { AddViewed } from "@/api/goods";
	export default {
		props: {
			vgoods: {
				type: Array,
			},
			sortCate: {
				type: Object,
				default: function() {
					return { value: "date" };
				},
			},
		},

		data() {
			return {
				goods: [],
				bodyStyle: {
					padding: "2px",
					height: "auto",
				},
				baseUrl: "http://localhost:3000/",
			};
		},
		methods: {
			async addViewed(gid) {
				const res = await AddViewed(gid);
				console.log(res);
			},
			toDetail(item) {
				this.addViewed(item._id);
				this.$router.push({ name: "Goods_detail", params: { gid: item._id } });
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
			},
		},
		watch: {
			vgoods(newData) {
				this.goods = newData;
			},
			sortCate() {
				this.goods = this.goods.sort(this.compareSort(this.sortCate.type, this.sortCate.asc));
			},
		},
		mounted: function() {
			// this.goods1 = this.vgoods;
		},
	};
</script>

<style lang="scss" scoped>
	.goods-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80vw;
		.no-content {
			width: 100%;
			transform: translateX(100px);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin-bottom: 20px;
			img {
				display: block;
			}
			span {
				color: #93999f;
			}
		}
		.goods-container {
			columns: 5;
			column-gap: 30px;
			margin: 30px auto;
			.goods {
				width: 100%px;
				break-inside: avoid;
				margin-top: 10px;
				padding: 10px 0;
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
						font-size: 0.4rem;
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
	}
</style>
