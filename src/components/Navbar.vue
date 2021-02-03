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
						<el-menu-item index="/tobuy">求购</el-menu-item>
					</el-menu>
				</div>
			</div>
			<div class="nav-sub-wrapper">
				<div class="nav-sub">
					<div class="publish">
						<el-dropdown>
							<span class="el-dropdown-link"> 发布<i class="el-icon-arrow-down el-icon--right"></i> </span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>发布</el-dropdown-item>
								<el-dropdown-item>求购</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<div class="avatar">
						<el-avatar icon="el-icon-user-solid"></el-avatar>
						<span class="username" @click="handlePersonal">{{ this.$store.state.userName }}</span>
					</div>
					<div class="login" v-if="this.$store.state.isLogin === false">
						<el-link type="primary" :underline="false" @click="jumpToLogin">登录</el-link>
						|
						<el-link type="primary" :underline="false" @click="jumpToRegister">注册</el-link>
					</div>
					<div class="logout" v-else>
						<el-link type="primary" :underline="false" @click="logOut">退出</el-link>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		name: "Navbar",
		data() {
			return {};
		},
		methods: {
			handleSelect(key) {
				this.activeIndex = key;
			},
			jumpToLogin() {
				this.$router.push("Login");
			},
			jumpToRegister() {
				this.$router.push("Register");
			},
			logOut() {
				// 清除session
				sessionStorage.clear();
				// 更新vuex里的全局变量
				this.$store.commit("logout");
			},

			handlePersonal() {
				console.log("个人中心");
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
					width: 350px;
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					.avatar {
						font-size: 16px;
						font-weight: 600;
						display: flex;
						align-items: center;
						.username {
							padding: 0 8px;
							cursor: pointer;
							opacity: 0.7;
						}
						.username:hover {
							opacity: 1;
						}
					}
					// .login {
					// }
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
