<template>
	<div class="app">
		<Navbar />
		<div class="main">
			<div class="container">
				<div class="good_detail">
					<div class="good_pic">
						<img :src="this.good.pic" />
					</div>
					<div class="good_info">
						<div class="good_publisher">
							<div class="avatar"><el-avatar icon="el-icon-user-solid" :src="this.publisher.avatar"></el-avatar></div>
							<div class="user_name">{{ this.publisher.nickName }}</div>
						</div>
						<div class="good_name">{{ this.good.name }}</div>
						<div class="good_desc">{{ this.good.desc }}</div>
						<div class="good_price">
							<i class="iconfont icon-jiage"></i>
							价格：
							<div class="price">{{ this.good.price + "元" }}</div>
							<div class="oprice">
								<s>{{ "原价" + this.good.originPrice + "元" }}</s>
							</div>
						</div>
						<div class="good_level">
							<i class="iconfont icon-xinkaobei"></i>
							成色：
							<span class="new">{{ this.good.new }} </span>
						</div>
						<div class="good_count">
							<i class="iconfont icon-kucunweb"></i>
							库存：<span class="count">{{ this.good.count }}</span>
						</div>
						<div class="good_time">
							<i class="iconfont icon-zhongbiao"></i>
							{{ this.good.createdAt }}
						</div>
						<div class="addcart">
							<el-button type="success" class="addtocart" @click="addToCart"
								><i class="iconfont icon-gouwuche"></i>加入购物车</el-button
							>
						</div>
					</div>
				</div>
				<div class="comment-box">
					<div class="comment-title">
						<span>商品评价</span>
						<div class="publish-button">
							<el-button type="primary" size="small" @click="publishComment">发表评论</el-button>
						</div>
					</div>
					<el-divider><i class="iconfont icon-pingjia"></i></el-divider>
					<div class="comment-item" v-for="(item, index) in comment" :key="index">
						<div class="avatar">
							<el-avatar icon="el-icon-user-solid" :src="item.user.avatar"></el-avatar>
						</div>
						<div class="user">
							<div class="name">{{ item.user.nickName }}</div>
							<div class="time">{{ item.createdAt }}</div>
						</div>
						<div class="content-box">
							<div class="rate"><el-rate v-model="item.rate" :disabled="disabled"> </el-rate></div>
							<div class="content">{{ item.content }}</div>
						</div>
					</div>
					<div class="none" v-if="this.comment.length === 0">
						<span>暂无相关评论</span>
					</div>
				</div>
				<div class="comment-dailog">
					<el-dialog title="发表评论" :visible.sync="dialogFormVisible" width="500px" center="">
						<el-form :model="form">
							<div class="comment-dailog-rate"><el-rate v-model="form.rate"></el-rate></div>
							<div class="comment-dailog-content">
								<el-input v-model="form.content" autocomplete="off" placeholder="输入评论内容..."> </el-input>
							</div>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary" @click="submitComment">确 定</el-button>
						</div>
					</el-dialog>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import { GetGoodsByID, GetGoodComment, SubmitComment } from "@/api/goods";
	import { AddToCart } from "@/api/user";
	import Navbar from "@/components/Navbar";
	import Footer from "../../components/Footer.vue";

	export default {
		components: {
			Footer,
			Navbar,
		},
		data() {
			return {
				gid: "",
				publisher: {},
				good: [],
				comment: [],
				disabled: true,
				//评论分数
				form: {
					rate: null,
					content: "",
				},
				dialogFormVisible: false,
				formLabelWidth: "140px",
			};
		},
		methods: {
			getGid() {
				this.gid = this.$route.params.gid;
			},
			async addToCart() {
				if (!this.$store.state.isLogin) {
					this.$message({
						type: "warning",
						message: "请登录后再进行操作!",
					});
					return;
				}
				let data = {
					uid: this.$store.state.userID,
					goodId: this.gid,
				};
				const res = await AddToCart(data);
				console.log(res);
				if (res.status === 200) {
					this.$message({
						type: "success",
						message: "成功加入购物车！",
					});
					//更新vuex购物车
					this.$store.commit("setMyCart", { cart: res.data.user.cart });
					// this.router.push("/personalCenter");
				}
			},
			async getGoodsByID() {
				const data = await GetGoodsByID(this.gid);
				this.good = data.data.good[0];
				this.good.createdAt = this.dayjs(this.good.createdAt).format("YYYY-MM-DD");
				this.good.pic = "http://localhost:3000/" + this.good.pic;
				this.publisher = data.data.good[0].uid;
				this.publisher.avatar = "http://localhost:3000/" + this.publisher.avatar;
			},
			async getComment() {
				const data = await GetGoodComment(this.gid);
				this.comment = data.data.comment[0].comment;
				this.comment.map((v) => {
					v.createdAt = this.dayjs(v.createdAt).fromNow();
					v.user.avatar = "http://localhost:3000/" + v.user.avatar;
				});
			},
			//
			publishComment() {
				if (!this.$store.state.isLogin) {
					return this.$message({
						type: "warning",
						message: "请先登录！",
					});
				}
				this.dialogFormVisible = true;
			},
			async submitComment() {
				let data = {
					uid: this.$store.state.userID,
					gid: this.gid,
					rate: this.form.rate,
					content: this.form.content,
				};
				const res = await SubmitComment(data);
				if (res.status === 200) {
					this.$message({
						type: "success",
						message: "评论成功！",
					});
					this.getComment();
					this.dialogFormVisible = false;
				} else {
					this.$message.error("评论失败");
				}
			},
		},
		mounted: function() {
			this.getGid();
			this.getGoodsByID();
			this.getComment();
		},
	};
</script>

<style lang="scss" scoped>
	.app {
		display: flex;
		flex-direction: column;
	}
	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 30px 0;
		.container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 1200px;
			.good_detail {
				width: 80%;
				margin: 30px;
				height: 480px;
				display: flex;
				background: #f7f7f7;
				i {
					font-size: 1.4rem;
					margin-right: 10px;
				}
				.good_pic {
					img {
						display: block;
						margin: 20px;
						width: 350px;
						height: 400px;
						object-fit: cover;
					}
				}
				.good_info {
					margin: 20px 20px 20px 40px;
					text-align: left;
					.good_publisher {
						display: flex;
						align-items: center;
						justify-content: flex-start;
						.avatar {
						}
						.user_name {
							margin: 0 10px;
							font-size: 0.9rem;
						}
					}
					.good_name {
						margin-top: 10px;
						text-align: left;
						font-size: 1.2rem;
						font-weight: 600;
						color: black;
					}
					.good_desc {
						font-size: 0.9rem;
						margin: 20px 0;
						max-width: 400px;
					}
					.good_price {
						display: flex;
						align-items: center;
						.price {
							color: #2a9d8f;
							font-weight: 600;
						}
						.oprice {
							margin-left: 20px;
						}
					}
					.good_level {
						margin: 10px 0;
						display: flex;
						align-items: center;
						.new {
							color: #2a9d8f;
							font-weight: 600;
							margin-right: 10px;
							transform: translateY(1px);
						}
					}
					.good_count {
						margin: 10px 0;
						display: flex;
						.count {
							color: #2a9d8f;
							font-weight: 600;
							transform: translateY(2px);
						}
					}
					.good_time {
						display: flex;
						align-items: center;
					}
					.addcart {
						i {
							font-size: 0.9rem;
						}
					}
					.addtocart {
						padding: 8px;
						margin-top: 10px;
					}
				}
			}
			.comment-box {
				width: 80%;
				display: flex;
				flex-direction: column;
				background: #f7f7f7;
				.comment-title {
					display: flex;
					justify-content: space-between;
					.publish-button {
						margin: 10px 20px;
					}
					span {
						margin: 10px 20px;
					}
				}
				.el-divider__text.is-center {
					left: 50%;
					transform: translateX(-50%) translateY(-50%);
					background: #f7f7f7;
					i {
						font-size: 1.4rem;
					}
				}
				.comment-item {
					display: flex;
					margin: 10px;
					padding: 10px;
					border-bottom: 1px solid #dcdfe6;
					.avatar {
					}
					.user {
						margin: 0 10px;
						.name {
							font-size: 0.8rem;
							font-weight: 600;
						}
						.time {
							font-size: 0.4rem;
							margin: 10px 0;
						}
					}
					.content-box {
						display: flex;
						flex-direction: column;
						width: 400px;
						text-align: left;
						margin: 0 50px;
						.rate {
						}
						.content {
							margin: 5px 0;
						}
					}
				}
				.none {
					font-size: 1.3rem;
					height: 60px;
				}
			}
			.comment-dailog {
				display: flex;
				justify-content: center;
				align-items: center;
				.comment-dailog-rate {
					display: flex;
					justify-content: flex-start;
					margin-left: 46px;
				}
				.comment-dailog-content {
					margin-top: 20px;
					display: flex;
					justify-content: center;
					width: 90%;
					.el-input {
						margin-left: 48px;
					}
				}
			}
		}
	}
</style>
