<template>
	<div class="mywanteds-wrapper">
		<div class="mywanted-box" v-for="(item, index) in myWanteds" :key="index">
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
					<el-button type="primary" size="mini">
						<span v-if="item.state === 1">待审核</span>
						<span v-else-if="item.state === 0">未通过</span>
						<span v-if="item.state === 2">已通过</span>
					</el-button>
					<el-button type="danger" size="mini">删除</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetMyWanted } from "@/api/user";
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
			}
		}
		.mywanted-box:hover {
			box-shadow: 1px 1px 8px #929292;
		}
	}
</style>
