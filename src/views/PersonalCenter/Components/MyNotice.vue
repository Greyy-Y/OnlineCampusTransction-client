<template>
	<div class="mynotice-wrapper">
		<div class="empty" v-if="this.myNotice.length === 0">
			<img src="../../../assets/img/nogood.png" alt="" />
			<span>暂无消息~</span>
		</div>

		<div class="mynotice" v-for="(item, index) in myNotice" :key="index">
			<div class="mynotice-box">
				<div class="mynotice-box-title">
					<div class="date">
						订单时间：<span>{{ item.orderTime }}</span>
					</div>
					<div class="oid">
						订单号:<span>{{ item._id._id }}</span>
					</div>
				</div>
				<div class="mynotice-box-content">
					<div class="desc">
						<div class="pic"><img :src="baseUrl + item.good.pic[0]" /></div>
						<div class="text">
							<div class="name">商品名：{{ item.good.name }}</div>
							<div class="price">售价：{{ item.good.price }}</div>
							<div class="count">数量：{{ item.count }}</div>
						</div>
					</div>
					<div class="address">
						<div class="detail">地址：{{ item.address[0].detailAdd }}</div>
						<div class="receiver">收货人：{{ item.address[0].receiver }}</div>
						<div class="phone">电话：{{ item.address[0].phone }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetMyNotice } from "@/api/notice";
	import { SendGood, AckSendGood } from "@/api/order";
	export default {
		data() {
			return {
				myNotice: [],
				newmyNotice: [],
				baseUrl: "http://localhost:3000/",
			};
		},
		methods: {
			async getMyNotice() {
				let data = {
					sellerId: this.$store.state.userID,
				};
				const res = await GetMyNotice(data);
				this.myNotice = res.data.data;
				this.myNotice.forEach((v) => {
					v.orderTime = this.dayjs(v.orderTime).format("YYYY-MM-DD hh:ss");
					return v;
				});
				console.log(this.myNotice);
			},
			async sendGood(gid, oid) {
				let data = {
					gid: gid,
					oid: oid,
				};
				const res = await SendGood(data);
				if (res.status == 200) {
					this.$message.success(res.data.message);
					const res1 = AckSendGood(oid);
					if (res1.status == 200) {
						this.$message(res.data.message);
					}
				} else {
					this.$message.error("未知错误");
				}
			},
			// async deleteNotice(oid) {
			// 	let data = {
			// 		oid,
			// 	};
			// 	const res = await DeleteOrder(data);
			// 	if (res.status === 200) {
			// 		this.$message({
			// 			type: "success",
			// 			message: "删除成功",
			// 		});
			// 		this.getMyOrder();
			// 	} else {
			// 		this.$message({
			// 			type: "warning",
			// 			message: "删除失败",
			// 		});
			// 	}
			// },
			// toPay(oid) {
			// 	this.$router.push({ name: "ToPay", params: { oid: oid } });
			// },
			// toOrderDetail(oid) {
			// 	this.$router.push({ name: "OrderDetail", params: { oid: oid } });
			// },
		},
		created: function() {
			this.getMyNotice();
		},
	};
</script>

<style lang="scss" scoped>
	.mynotice-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.mynotice {
			width: 88%;
			margin: 10px 0;
			.mynotice-box {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				border: solid 1px #d8d7d7;
				border-radius: 5px;
				&-title {
					display: flex;
					margin: 10px 20px;
					span {
						color: #2a9d8f;
						margin-left: 10px;
					}
					.date {
						margin-right: 40px;
					}
				}
				&-content {
					display: flex;
					.desc {
						max-width: 400px;
						display: flex;
						.pic {
							margin: 10px 20px;
							width: 110px;
							height: 110px;
							img {
								width: 100%;
								height: 100%;
							}
						}
						.text {
							display: flex;
							flex-direction: column;
							text-align: left;
							padding: 10px;
							div {
								margin-top: 10px;
							}
							div:nth-child(1) {
								margin: 0;
							}
						}
					}

					.address {
						display: flex;
						flex-direction: column;
						margin: 10px auto;
						text-align: left;
						.receiver,
						.phone {
							margin-top: 10px;
						}
					}
					.send {
						margin: 10px 30px;
					}
				}
			}
			.mynotice-box:hover {
				box-shadow: 8px 8px 15px #e4e4e4;
			}
			.empty {
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
		}
		::-webkit-scrollbar {
			width: 0 !important;
		}
		::-webkit-scrollbar {
			width: 0 !important;
			height: 0;
		}
	}
</style>
