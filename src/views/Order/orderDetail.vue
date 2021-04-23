<template>
	<div class="order-detail-wrapper">
		<Navbar />
		<div class="order-detail">
			<div class="order-detail-container">
				<div class="reciver-box">
					<div class="address-box-wrapper">
						<div class="address-box">
							<div class="content">
								<span>收货人: &nbsp;&nbsp;{{ address.receiver }}</span>
								<span>收货地址:&nbsp;{{ address.detailAdd }}</span>
								<span>手机号码:&nbsp;{{ address.phone }}</span>
								<span v-if="order.state >= 2">支付方式:&nbsp;{{ order.payType === 1 ? "微信" : "支付宝" }}</span>
								<span v-if="order.state >= 2">实付金额:&nbsp;￥{{ order.totalPrice }}</span>
							</div>
						</div>
						<div class="progress">
							<div class="steps">
								<el-steps :active="order.state + 1" finish-status="success" align-center style="width:700px">
									<el-step title="下单"></el-step>
									<el-step title="付款"></el-step>
									<el-step title="已发货"></el-step>
									<el-step title="确认收货"></el-step>
									<el-step title="交易完成"></el-step>
								</el-steps>
							</div>
							<div class="desc">
								<div class="readyToPay" v-if="order.state + 1 === 1">
									<h3>订单状态：未支付</h3>
									<el-button style="margin-left:20px" @click="toPay">去支付</el-button>
								</div>

								<h3 v-if="order.state + 1 === 2">订单状态：已支付，请等待商家发货</h3>
								<div class="receiveGoods" v-if="order.state + 1 === 3">
									<h3>订单状态：已发货，请耐心等待</h3>
									<el-button style="margin-left:70px" @click="ackGood">确认收货</el-button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="order-list">
					<div class="goods">
						<el-table :data="goods" style="width: 100%">
							<el-table-column label="商品信息" width="520" show-overflow-tooltip>
								<template slot-scope="scope">
									<div class="good-info">
										<img :src="baseUrl + scope.row.good.pic[0]" /><span>{{ scope.row.good.name }}</span>
									</div></template
								>
							</el-table-column>
							<el-table-column label="单价/￥" width="160" align="center"
								><template slot-scope="scope">{{ scope.row.good.price }}</template>
							</el-table-column>
							<el-table-column label="数量" width="160" align="center">
								<template slot-scope="scope"> {{ scope.row.count }} </template>
							</el-table-column>
							<el-table-column label="小计/￥" show-overflow-tooltip width="160" align="center"
								><template slot-scope="scope">{{ scope.row.count * scope.row.good.price }}</template>
							</el-table-column>
						</el-table>
						<div class="order-bottom">
							<!-- <div class="price">
								实付金额: <span>￥{{ this.totalPrice }}</span>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		Good
		<Footer />
	</div>
</template>

<script>
	import { GetOrderById, AckGood } from "@/api/order";
	import Footer from "@/components/Footer";
	import Navbar from "@/components/Navbar";
	export default {
		components: {
			Footer,
			Navbar,
		},
		data() {
			return {
				oid: "",
				order: [],
				goods: [],
				address: {},
				baseUrl: "http://localhost:3000/",
				formLabelWidth: "80px",
			};
		},
		methods: {
			// 从路由获取订单id
			getOrder() {
				this.oid = this.$route.params.oid;
				// console.log(this.order);
			},
			async getOrderDetail() {
				let data = {
					oid: this.oid,
				};
				const res = await GetOrderById(data);
				this.order = res.data.order[0];
				console.log(this.order);
			},
			toPay() {
				this.$router.push({ name: "ToPay", params: { oid: this.oid } });
			},
			async ackGood() {
				let data = {
					id: this.oid,
					state: 3,
				};
				const res = await AckGood(data);
				if (res.status === 200) {
					this.$message.success("已确认收货！");
				} else {
					this.$message.error(res.message);
				}
				this.getOrderDetail();
			},
		},
		watch: {
			// totalPrice() {
			// 	return this.order.reduce((total, cur) => {
			// 		return total + cur.count * cur.good.price;
			// 	}, 0);
			// },
			order() {
				this.address = this.order.address[0];
				this.goods = this.order.goods;
			},
		},
		mounted: function() {
			this.getOrder();
			this.getOrderDetail();
		},
	};
</script>

<style lang="scss" scoped>
	.order-detail-wrapper {
		width: 100%;
	}
	.order-detail {
		background: #f7f7f7;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.order-detail-container {
			width: 80%;
			margin: 20px;
		}
		.reciver-box {
			margin: 20px 0;
			border-radius: 10px;
			text-align: left;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: #fff;
			.reciver-box-title {
				width: 95%;
				display: flex;
				justify-content: flex-start;
				margin: 10px 20px;
				flex-direction: row;
			}
			.address-box-wrapper {
				display: flex;
				width: 100%;
				margin-left: 30px;
				padding: 20px 0;
				.address-box {
					flex: 1;
					cursor: pointer;
					max-width: 200px;
					margin: 10px 10px;
					padding: 20px;
					border: 1px #dbdbdb solid;
					border-radius: 10px;
					text-align: left;
					background: #2646533a;
					.operate {
						margin-top: 10px;
						display: flex;
						justify-content: flex-end;
					}
					.content {
						display: flex;
						justify-content: flex-start;
						flex-direction: column;
						color: #3f3f3f;
						font-size: 0.8rem;
						span {
							margin: 5px 0;
						}
					}
				}
				.progress {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					margin-left: 100px;
				}
				.steps {
					flex: 4;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				// .desc {
				// 	margin-left: 250px;
				// }
			}
		}
		.order-list {
			border-radius: 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			.goods {
				margin: 10px;
				.good-info {
					display: flex;
					align-items: center;
					img {
						display: block;
						width: 80px;
						height: 80px;
						object-fit: contain;
						margin-right: 10px;
					}
				}
			}
			.order-bottom {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				margin-top: 10px;
				.price {
					span {
						font-weight: 600;
						color: #2a9d8f;
						font-size: 1.2rem;
					}
					margin-right: 20px;
				}
			}
		}
	}
</style>
