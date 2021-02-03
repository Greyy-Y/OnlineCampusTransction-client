<template>
	<div class="app">
		<Navbar />
		<main>
			<div class="container">
				<div class="good_detail">
					<div class="good_pic">
						<img :src="this.good.pic" />
					</div>
					<div class="good_info">
						<div class="good_publisher">
							<div class="avtar"><el-avatar icon="el-icon-user-solid"></el-avatar></div>
							<div class="user_name">{{ this.publisher.nickName }}</div>
						</div>
						<div class="good_name">{{ this.good.name }}</div>
						<div class="good_desc">{{ this.good.desc }}</div>
						<div class="good_price">
							<i class="iconfont icon-jiage"></i>
							<div class="price">{{ this.good.price + "元" }}</div>
							<div class="oprice">
								<s>{{ "原价" + this.good.originPrice + "元" }}</s>
							</div>
						</div>
						<div class="good_level">
							<i class="iconfont icon-xinkaobei"></i>
							<span class="new">{{ this.good.new }} </span><span>成新</span>
						</div>
						<div class="good_time">
							<i class="iconfont icon-zhongbiao"></i>
							{{ this.good.updatedAt }}
						</div>
						<el-button type="success" class="addtocart">加入购物车</el-button>
					</div>
				</div>
			</div>
		</main>
		<Footer />
	</div>
</template>

<script>
	import { GetGoodsByID } from "@/api/goods";
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
			};
		},
		methods: {
			getGid() {
				this.gid = this.$route.params.gid;
			},
			async getGoodsByID() {
				const data = await GetGoodsByID(this.gid);
				this.good = data.data.good[0];
				this.good.updatedAt = this.dayjs(this.good.updatedAt).format("YYYY-MM-DD");
				this.good.pic = "http://localhost:3000/" + this.good.pic;
				this.publisher = data.data.good[0].uid;
				this.publisher.avtar = "http://localhost:3000/" + this.publisher.avtar;
			},
		},
		mounted: function() {
			this.getGid();
			this.getGoodsByID();
		},
	};
</script>

<style lang="scss" scoped>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		.container {
			display: flex;
			justify-content: center;
			margin-top: 4px;
			height: 80vh;
			width: 88vw;
			background: #f7f7f7;
			.good_detail {
				width: 70%;
				margin: 30px;
				height: 480px;
				display: flex;
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
						.avtar {
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
					.good_time {
						display: flex;
						align-items: center;
					}
					.addtocart {
						padding: 8px;
						margin-top: 10px;
					}
				}
			}
		}
	}
</style>
