<template>
	<div class="wanted">
		<Navbar />
		<div class="wanted-container">
			<div class="wanted-item" v-for="(item, index) in wanteds" :key="index">
				<div class="info">
					<div class="avatar">
						<el-avatar icon="el-icon-user-solid" :src="item.uid.avatar"></el-avatar>
					</div>
					<div class="user">
						<div class="name">{{ item.uid.nickName }}</div>
					</div>
					<div class="time">更新于{{ item.modifyTime }}</div>
				</div>
				<div class="content-box-wrapper">
					<div class="content-box">
						<div class="title">{{ item.name }}</div>
						<div class="desc">{{ item.desc }}</div>
						<div class="budget">预算：{{ item.budget }}</div>
						<div class="contact">{{ item.contact }}</div>
					</div>
					<div class="pic" v-if="item.pic[0] !== undefined">
						<el-image style="width: 100px; height: 100px" :src="item.pic[0]" :preview-src-list="item.pic"> </el-image>
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import { GetWanteds } from "@/api/wanteds";
	import Navbar from "@/components/Navbar";
	import Footer from "@/components/Footer";
	export default {
		name: "Wanteds",
		components: {
			Navbar,
			Footer,
		},
		data() {
			return {
				wanteds: [],
			};
		},
		methods: {
			async getWanteds() {
				const res = await GetWanteds();
				this.wanteds = res.data.data;
				this.wanteds.map((v) => {
					v.modifyTime = this.dayjs(v.modifyTime).format("YYYY-MM-DD");
					if (v.pic[0] !== undefined) {
						v.pic[0] = "http://localhost:3000/" + v.pic[0];
					}
					v.uid.avatar = "http://localhost:3000" + v.uid.avatar;
				});
			},
		},
		mounted: function() {
			this.getWanteds();
		},
	};
</script>
<style lang="scss" scoped>
	.wanted {
		display: flex;
		flex-direction: column;
		.wanted-container {
			width: 100%;
			background: #f7f7f7;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin: 10px 0;
			.wanted-item {
				width: 70%;
				// height: 230px;
				// border: 1px solid #cacaca;
				background: white;
				margin: 10px 0;
				border-radius: 10px;
				.info {
					display: flex;
					margin: 10px;
					align-items: center;
					.user {
						margin: 0 10px;
					}
					.time {
						font-size: 0.8rem;
						color: #93999f;
					}
				}
				.content-box-wrapper {
					display: flex;
					justify-content: space-between;
					.content-box {
						display: flex;
						flex-direction: column;
						text-align: left;
						margin: 0px 20px;
						.title {
							font-size: 1.1rem;
							font-weight: 600;
						}
						.desc {
							margin: 10px 0;
						}
						.budget {
							font-size: 0.8rem;
							color: #2a9d8f;
						}
						.contact {
							font-size: 0.8rem;
							color: #93999f;
							margin: 10px 0;
						}
					}
					.pic {
						margin-right: 100px;
					}
				}
			}
			.wanted-item:hover {
				box-shadow: 1px 1px 5px #93999f;
				transition: ease 0.3s;
			}
		}
	}
</style>
