<template>
	<nav>
		<div class="container">
			<div class="nav-main-wrapper">
				<div class="logo">
					<img src="../assets/rock.jpg" />
				</div>
				<div class="nav-main">
					<!-- 解决LEMENT-UI中EL-MENU组件作为VUE-ROUTER模式在刷新页面后DEFAULT-ACTIVE属性与当前路由页面不一致问题的方法 -->
					<el-menu
						:default-active="$route.path"
						class="el-menu-demo"
						mode="horizontal"
						@select="handleSelect"
						:router="true"
						active-text-color="#2a9d8f"
					>
						<el-menu-item index="/index">首页</el-menu-item>
						<el-menu-item index="/goods">二手</el-menu-item>
						<el-menu-item index="/wanteds">求购</el-menu-item>
					</el-menu>
				</div>
			</div>
			<div class="nav-sub-wrapper">
				<div class="nav-sub">
					<div class="serchbar"><searchbar @find-goods-by-name="findGoodsByname" /></div>
					<div class="publish">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link"> 发布<i class="el-icon-arrow-down el-icon--right"></i> </span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="/releaseGoods">发布</el-dropdown-item>
								<el-dropdown-item command="/releaseWanted">求购</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<div class="avatar" v-if="this.$store.state.isLogin">
						<el-avatar size="medium" :src="this.$store.getters.getAvatar"></el-avatar>
						<span class="username" @click="handlePersonal">{{ this.$store.state.userName }}</span>
					</div>

					<div class="login" v-if="this.$store.state.isLogin === false">
						<el-link type="primary" :underline="false" @click="jumpToLogin">登录</el-link>
						|
						<el-link type="primary" :underline="false" @click="jumpToRegister">注册</el-link>
					</div>
					<div class="logout" v-else>
						<div class="cart" @click="handleToMyCary">
							<el-badge
								:value="this.$store.state.myCart === null ? 0 : this.$store.state.myCart.length"
								type="success"
								class="item"
							>
								<i class="iconfont icon-gouwuche"></i
							></el-badge>
						</div>
						<div class="loute-texte"><el-link type="primary" :underline="false" @click="logOut">退出</el-link></div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>
<script>
	import Searchbar from "./searchbar.vue";
	export default {
		name: "Navbar",
		components: {
			Searchbar,
		},
		data() {
			return {
				goodList: [],
			};
		},
		methods: {
			handleSelect(key) {
				this.activeIndex = key;
			},
			jumpToLogin() {
				this.$router.push("/login");
			},
			jumpToRegister() {
				this.$router.push("/register");
			},
			handleCommand(command) {
				if (!this.$store.state.isLogin) {
					this.$message({
						type: "warning",
						message: "请先登录，再进行操作",
					});
					return;
				}
				this.$router.push(command);
			},
			logOut() {
				// 清除session
				sessionStorage.clear();
				// 更新vuex里的全局变量
				this.$store.commit("logout");
				this.$message({
					type: "success",
					message: "成功退出",
				});
				this.$router.push("/index");
			},
			handlePersonal() {
				if (this.$store.state.userID) {
					this.$router.push("/userInfo");
				} else {
					this.$message({
						type: "warning",
						message: "请登录后再进行操作",
					});
					return;
				}
			},
			handleToMyCary() {
				console.log("tocart");
				this.$router.push("/myCart");
			},
			findGoodsByname(goodList) {
				this.goodList = goodList;
				console.log(this.goodList);
				this.$emit("find-goods-by-name", this.goodList);
			},
		},
	};
</script>

<style lang="scss" scoped>
	nav {
		width: 99vw;
		height: 60px;
		box-sizing: border-box;
		border-bottom: #264653 5px;
		box-shadow: #264653 3px 12px 8px -12px;
		letter-spacing: 1px;
		// position: fixed;
		.container {
			display: flex;
			.nav-main-wrapper {
				min-width: 440px;
				flex: 1;
				display: flex;
				.logo {
					padding: 0px 20px;
					img {
						height: 50px;
						width: 50px;
						border-radius: 50%;
						transform: translateY(3px);
					}
				}
				.nav-main {
					margin-left: 40px;
					font-size: 30px;
				}
			}
			.nav-sub-wrapper {
				flex: 2;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.nav-sub {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					margin-right: 10px;
					.publish {
						margin: 0 10px;
					}
					.avatar {
						font-size: 16px;
						font-weight: 600;
						display: flex;
						align-items: center;
						.username {
							margin: 0 10px;
							cursor: pointer;
							opacity: 0.7;
						}
						.username:hover {
							opacity: 1;
						}
					}
					.serchbar {
						.search-container {
							transform: translateX(60px);
						}
					}
				}
				.logout {
					display: flex;
					margin-right: 20px;
					.cart {
						margin-right: 20px;
						i {
							font-size: 1.2rem;
						}
					}
				}
				.login {
					margin-right: 20px;
				}
				.cart {
					cursor: pointer;
				}
			}
		}
	}
	.el-menu-item {
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		opacity: 0.7;
	}
	.el-menu-item:hover {
		opacity: 1;
	}
	.el-dropdown {
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		opacity: 0.7;
	}
	.el-dropdown:hover {
		opacity: 1;
	}
	.el-link {
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		opacity: 0.7;
	}
	.el-link:hover {
		opacity: 1;
	}
</style>
