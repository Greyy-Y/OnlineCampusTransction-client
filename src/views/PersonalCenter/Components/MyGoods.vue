<template>
	<div class="mygoods-wrapper">
		<div class="mygoods-container" v-if="myGoods != null">
			<div class="mygoods-box" v-for="(item, index) in myGoods" :key="index">
				<div class="mygoods-box-img">
					<img :src="item.pic" />
				</div>
				<div class="mygoods-box-content">
					<div class="mygoods-title">
						{{ item.name }}
					</div>
					<div class="mygoods-desc">
						{{ item.desc }}
					</div>
					<div class="mygoods-info">
						<div class="details">
							<div class="price" v-if="item.price">
								标价￥:<span>{{ item.price }}</span>
							</div>
							<div class="date">
								{{ item.modifyTime }}
							</div>
						</div>
						<div class="mygoods-button">
							<el-button type="primary" size="mini">
								<span v-if="item.state === 1">待审核</span>
								<span v-else-if="item.state === 0">未通过</span>
								<span v-if="item.state === 2">已通过</span>
							</el-button>
							<el-button type="warning" size="mini">编辑</el-button>
							<el-button type="danger" size="mini">删除</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="no-content" v-else>
			<el-button> 没有更多了</el-button>
		</div>
	</div>
</template>

<script>
	import { GetMyGoods } from "@/api/user";
	export default {
		data() {
			return {
				myGoods: [],
			};
		},
		methods: {
			async getMyGoods() {
				let data = {
					uid: this.$store.state.userID,
				};
				const res = await GetMyGoods(data);
				this.myGoods = res.data.data[0].myGoods;
				this.myGoods.map((v) => {
					v.modifyTime = this.dayjs(v.modifyTime).format("YYYY-MM-DD");
					v.pic = `http://localhost:3000/${v.pic}`;
				});
			},
		},
		mounted: function() {
			this.getMyGoods();
		},
	};
</script>

<style lang="scss" scoped>
	.mygoods-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		.mygoods-container {
			width: 86%;
		}
		.mygoods-box {
			margin: 20px 0;
			display: flex;
			width: 100%;
			height: 150px;
			border-radius: 5px;
			border: 1px #cfcfcf solid;
			cursor: pointer;
			.mygoods-box-img {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					display: block;
					border: 1px solid #dbdbdb;
					width: 100px;
					height: 100px;
				}
			}
			.mygoods-box-content {
				flex: 5;
				display: flex;
				flex-direction: column;
				.mygoods-title {
					display: flex;
					justify-content: flex-start;
					margin: 10px 20px;
					font-weight: 600;
				}
				.mygoods-desc {
					font-size: 0.9rem;
					display: flex;
					justify-content: flex-start;
					min-height: 50px;
					color: #93999f;
					margin: 0 20px;
				}
				.mygoods-info {
					display: flex;
					font-size: 0.9rem;
					align-items: center;
					justify-content: space-between;
					margin: 20px 10px 0 10px;
					.details {
						display: flex;
						align-items: center;
						margin: 0 10px;
						.price {
							margin-right: 10px;
							color: #93999f;
							span {
								margin-left: 4px;
								color: #2a9d8f;
								font-weight: 600;
							}
						}
						.date {
							color: #93999f;
						}
					}
				}
			}
		}
		.mygoods-box:hover {
			box-shadow: 1px 1px 8px #929292;
		}
		.no-content {
			margin: 20px 0;
		}
	}
</style>
