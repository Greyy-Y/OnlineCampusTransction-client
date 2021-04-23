<template>
	<div class="to-pay-wrapper">
		<Navbar />
		<div class="to-pay">
			<div class="to-pay-top">
				<div class="submit-success">提交订单成功<i class="iconfont icon-gou"></i></div>
				<div class="choose-pay">
					<div @click="chooseWechat" :class="this.payType === 1 ? ' wechat-active' : 'wechat'">
						<i class="iconfont icon-weixinzhifu"></i>
					</div>
					<div @click="chooseAlipay" :class="this.payType === 2 ? 'alipay-active' : 'alipay'">
						<i class="iconfont icon-ali_pay"></i>
					</div>
				</div>
				<div class="total">
					<div class="recevier-info">
						<div class="title">收货信息</div>
						<div class="content">
							<div class="name">收货人：{{ address.receiver }}</div>
							<div class="phone">电话:{{ address.phone }}</div>
							<div class="address">收货地址:{{ address.detailAdd }}</div>
						</div>
					</div>
					<div class="should-pay">
						应付金额：<span>￥{{ totalPrice }}</span>
					</div>
					<el-button type="primary" @click="pay">立即支付</el-button>
				</div>
			</div>
			<div class="to-pay-bottom">
				<div class="goods-info-container">
					<div class="goods-container">
						<div class="title">
							<span>商品信息</span>
							<span>单价</span>
							<span>数量</span>
							<span>小结</span>
						</div>
						<div class="goods" v-for="(goodItem, index) in goods" :key="index">
							<div class="name">{{ goodItem.good.name }}</div>
							<div class="price">￥{{ goodItem.good.price }}</div>
							<div class="count">{{ goodItem.count }}</div>
							<div class="total">￥{{ goodItem.count * goodItem.good.price }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import { GetOrderById, OrderPayed } from "@/api/order";
	import { NewNotice } from "@/api/notice";
	import Footer from "@/components/Footer";
	import Navbar from "@/components/Navbar";
	export default {
		components: {
			Footer,
			Navbar,
		},
		data() {
			return {
				payType: 1,
				order: [],
				oid: "",
				goods: [],
				address: {},
				totalPrice: "",
				orderID: "",
			};
		},
		methods: {
			// 从路由获取订单信息
			getOrderId() {
				this.oid = this.$route.params.oid;
				console.log(this.oid);
				this.getOrderById();
			},
			async getOrderById() {
				let data = {
					oid: this.oid,
				};
				const res = await GetOrderById(data);
				if (res.status === 200) {
					this.order = res.data.order[0];
				} else {
					this.$message.error({
						message: "获取订单信息失败",
					});
					return;
				}
				console.log(this.order);
			},
			chooseWechat() {
				this.payType = 1;
			},
			chooseAlipay() {
				this.payType = 2;
			},
			async newNotice(data) {
				await NewNotice(data);
			},
			async pay() {
				let data = {
					oid: this.oid,
					payType: this.payType,
				};
				const res = await OrderPayed(data);
				if (res.status === 200) {
					this.$message({
						type: "success",
						message: "支付成功",
					});
					this.$router.push("/myOrder");
					for (let i = 0; i < this.order.goods.length; i++) {
						let noticeData = {
							orderId: this.order._id,
							buyerId: this.order.uid,
							sellerId: this.order.goods[i].good.uid,
							count: this.order.goods[i].count,
							good: this.order.goods[i].good._id,
							orderTime: this.order.orderTime,
							address: this.order.address[0],
						};
						this.newNotice(noticeData);
					}
				} else {
					this.$message({
						type: "warning",
						message: "支付失败",
					});
					return;
				}
			},
		},
		created: function() {
			this.getOrderId();
		},
		watch: {
			order() {
				this.goods = this.order.goods;
				this.address = this.order.address[0];
				this.totalPrice = this.order.totalPrice;
			},
		},
	};
</script>

<style lang="scss" coped>
	.to-pay-wrapper {
		width: 100%;
		.to-pay {
			background: #f7f7f7;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.to-pay-top {
				box-shadow: 3px 3px 10px #e4e4e4;
				padding: 20px 0;
				margin: 20px;
				width: 80%;
				background: #fff;
				border-radius: 10px;
				display: flex;
				justify-content: flex-start;
				flex-direction: column;

				.submit-success {
					margin: 0 20px;
					padding: 20px 0;
					font-weight: 600;
					font-size: 1.6rem;
					display: flex;
					justify-content: flex-start;
					border-bottom: 1px #b6b6b6 solid;
					align-items: center;
					color: #2a9d8f;
					i {
						font-size: 1.85rem;
						margin-left: 5px;
						transform: translateY(2px);
					}
				}
				.choose-pay {
					margin: 10px 20px;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					border-bottom: 1px #b6b6b6 solid;
					.wechat {
						cursor: pointer;
						border: #afafaf 1px solid;
						padding: 10px;
						border-radius: 10px;
						:hover {
							opacity: 0.6;
						}
						i {
							font-size: 2rem;
							display: block;
							color: rgb(0, 180, 1);
						}
						margin: 20px;
					}
					.wechat-active {
						cursor: pointer;
						border: #2a9d8f 1px solid;
						background-color: rgb(235, 235, 235);
						padding: 10px;
						border-radius: 10px;
						i {
							font-size: 2rem;
							display: block;
							color: rgb(0, 180, 1);
						}
						margin: 20px;
					}
					.alipay {
						padding: 10px;
						cursor: pointer;
						margin-left: 10px;
						border-radius: 10px;
						border: #afafaf 1px solid;
						:hover {
							opacity: 0.6;
						}
						i {
							font-size: 2rem;
							display: block;
							color: rgb(18, 150, 219);
						}
						margin: 20px;
					}
					.alipay-active {
						cursor: pointer;
						border: #2a9d8f 1px solid;
						background-color: rgb(235, 235, 235);
						padding: 10px;
						margin-left: 10px;
						border-radius: 10px;
						i {
							font-size: 2rem;
							display: block;
							color: rgb(18, 150, 219);
						}
						margin: 20px;
					}
				}
				.total {
					display: flex;
					margin-left: 20px;
					align-items: center;
					.recevier-info {
						display: flex;
						flex-direction: column;
						margin-bottom: 10px;
						.title {
							font-weight: 600;
							padding: 10px 0;
							text-align: left;
							margin-left: 10px;
						}
						.content {
							text-align: left;
							margin: 0 10px 0 10px;
							color: #919191;
							font-size: 0.8rem;
						}
					}
					.should-pay {
						margin-left: 690px;
						span {
							color: #2a9d8f;
							font-weight: 600;
							font-size: 1.2rem;
							margin-right: 10px;
						}
					}
				}
			}
			.to-pay-bottom {
				display: flex;
				padding: 20px 0;
				box-shadow: 3px 3px 10px #e4e4e4;
				margin: 20px;
				width: 80%;
				background: #fff;
				border-radius: 10px;
				.goods-info-container {
					width: 100%;
					.goods-container {
						.title {
							display: flex;
							justify-content: space-around;
							padding: 10px;
							span {
								margin-right: 20px;
								width: 360px;
							}
						}
						.goods {
							display: flex;
							padding: 10px 0;
							.name {
								width: 360px;
								text-align: left;
							}
							.price {
								width: 360px;
								text-align: left;
							}
							.count {
								width: 360px;
								text-align: left;
							}
						}
					}
				}
			}
		}
	}
</style>
