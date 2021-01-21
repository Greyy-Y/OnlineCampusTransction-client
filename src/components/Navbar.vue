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
							<span class="el-dropdown-link" style="font-size:16px">
								发布<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>发布</el-dropdown-item>
								<el-dropdown-item>求购</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<div class="avatar">
						<el-avatar icon="el-icon-user-solid"></el-avatar>
						<span class="username">{{ username }}</span>
					</div>
					<div class="login">
						<el-link type="primary" :underline="false" @click="jumpToLogin">登录</el-link> |
						<el-link type="primary" :underline="false">注册</el-link>
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
			return {
				username: "supercxx",
			};
		},
		methods: {
			handleSelect(key) {
				this.activeIndex = key;
			},
			jumpToLogin() {
				this.$router.push("Login");
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
		font-weight: 500;
		font-size: 16px;
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
					font-size: 18px;
				}
			}
			.nav-sub-wrapper {
				flex: 2;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.nav-sub {
					width: 300px;
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					font-size: 14px;
					.avatar {
						font-size: 14px;
						display: flex;
						align-items: center;
						.username {
							padding: 0 8px;
						}
					}
					// .login {
					// }
				}
			}
		}
	}
</style>
