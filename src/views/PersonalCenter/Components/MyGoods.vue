<template>
	<div class="mygoods-wrapper">
		<div class="no-content" v-if="newMyGoods.length == 0">
			<img src="../../../assets/img/nocontent.png" />
			<span>没有更多了~</span><el-button @click="toRealease">去发布</el-button>
		</div>
		<div class="mygoods-container" v-else>
			<div class="mygoods-box" v-for="(item, index) in newMyGoods" :key="index">
				<div class="mygoods-box-img">
					<img :src="baseUrl + item.pic" />
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
							<div class="price" v-if="item.new">
								成色:<span>{{ item.new }}</span>
							</div>
							<div class="date">
								{{ item.modifyTime }}
							</div>
						</div>
						<div class="mygoods-button">
							<div class="status">
								<el-button v-if="item.state === 1" size="mini">待审核</el-button>
								<el-button v-else-if="item.state === 0" type="primary" size="mini">未通过</el-button>
								<el-button v-if="item.state === 2" type="success" size="mini">已通过</el-button>
							</div>
							<el-button type="warning" size="mini" @click="handleEdit(item._id)">编辑</el-button>
							<el-button type="danger" size="mini" @click="handleDelete(item._id)">删除</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetMyGoods, DeleteReleaseGood } from "@/api/user";
	export default {
		data() {
			return {
				myGoods: [],
				baseUrl: "http://localhost:3000/",
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
				});
				this.myGoods = this.myGoods.reverse();
			},
			handleDelete(gid) {
				this.$confirm("确认删除该商品?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						let data = {
							uid: this.$store.state.userID,
							goodId: gid,
						};
						DeleteReleaseGood(data);
						this.getMyGoods();
						this.$message({
							type: "success",
							message: "成功删除",
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
			handleEdit(gid) {
				this.$router.push({ name: "EditGood", params: { gid: gid } });
			},
			toRealease() {
				this.$router.push("/releaseGoods");
			},
		},
		computed: {
			newMyGoods() {
				return this.myGoods;
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
							font-size: 0.7rem;
						}
					}
				}
				.mygoods-button {
					display: flex;
					.status {
						margin: 0 10px;
					}
				}
			}
		}
		.mygoods-box:hover {
			box-shadow: 1px 1px 8px #929292;
		}
		.no-content {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			span {
				color: #93999f;
				margin-bottom: 10px;
			}
		}
	}
</style>
