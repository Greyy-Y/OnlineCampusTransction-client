<template>
	<div class="mywanteds-wrapper">
		<div class="no-content" v-if="newMyWanteds.length == 0">
			<img src="../../../assets/img/nocontent.png" />
			<span>没有更多了~</span><el-button @click="toWanted">去求购</el-button>
		</div>
		<div class="mywanted-box" v-for="(item, index) in newMyWanteds" :key="index" v-else>
			<div class="mywanted-title">
				{{ item.name }}
			</div>
			<div class="mywanted-desc">
				{{ item.desc }}
			</div>
			<div class="mywanted-info">
				<div class="details">
					<div class="budget" v-if="item.budget">
						预算:￥<span>{{ item.budget }}</span>
					</div>
					<div class="date">
						{{ item.modifyTime }}
					</div>
				</div>
				<div class="mywanted-button">
					<div class="status">
						<el-button v-if="item.state === 1" size="mini">待审核</el-button>
						<el-button v-else-if="item.state === 0" type="primary" size="mini">未通过</el-button>
						<el-button v-if="item.state === 2" type="success" size="mini">已通过</el-button>
					</div>
					<el-button type="danger" size="mini" @click="handleDelete(item._id)">删除</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetMyWanted, DeleteWanted } from "@/api/user";
	export default {
		data() {
			return {
				myWanteds: [],
			};
		},
		methods: {
			async getMyWanted() {
				let data = {
					uid: this.$store.state.userID,
				};
				const res = await GetMyWanted(data);
				this.myWanteds = res.data.data[0].myWanteds;
				this.myWanteds.map((v) => {
					v.modifyTime = this.dayjs(v.modifyTime).format("YYYY-MM-DD");
				});
			},

			handleDelete(wid) {
				this.$confirm("确认删除该商品?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						let data = {
							uid: this.$store.state.userID,
							wantedId: wid,
						};
						DeleteWanted(data);
						this.getMyWanted();
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
				this.getMyWanted();
			},
			toWanted() {
				this.$router.push("/releaseWanted");
			},
		},
		computed: {
			newMyWanteds() {
				return this.myWanteds;
			},
		},
		mounted: function() {
			this.getMyWanted();
		},
	};
</script>

<style lang="scss" scoped>
	.mywanteds-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		.mywanted-box {
			width: 86%;
			height: 150px;
			border-radius: 5px;
			border: 2px #f7f7f7 solid;
			cursor: pointer;
			display: flex;
			flex-direction: column;
			margin: 20px;
			.mywanted-title {
				display: flex;
				justify-content: flex-start;
				margin: 10px 20px;
				font-weight: 600;
			}
			.mywanted-desc {
				font-size: 0.9rem;
				display: flex;
				justify-content: flex-start;
				min-height: 50px;
				color: #93999f;
				margin: 0 20px;
			}
			.mywanted-info {
				display: flex;
				font-size: 0.9rem;
				align-items: center;
				justify-content: space-between;
				margin: 20px 10px 0 10px;
				.details {
					display: flex;
					align-items: center;
					margin: 0 10px;
					.budget {
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
				.mywanted-button {
					display: flex;
					.status {
						margin: 0 10px;
					}
				}
			}
		}
		.mywanted-box:hover {
			box-shadow: 1px 1px 8px #929292;
		}
		.no-content {
			margin: 0;
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
