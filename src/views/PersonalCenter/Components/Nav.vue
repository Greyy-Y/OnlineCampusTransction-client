<template>
	<div id="nav-container">
		<div class="nav">
			<h5>个人中心</h5>
			<el-menu
				default-active="/userInfo"
				:router="true"
				class="el-menu-vertical-demo"
				@open="handleOpen"
				@close="handleClose"
				active-text-color="#2a9d8f"
			>
				<el-menu-item index="/userInfo">
					<i class="iconfont icon-wodeziliao"></i>
					<span slot="title">我的资料</span>
				</el-menu-item>
				<el-menu-item index="/myGoods">
					<i class="iconfont icon-shangpin"></i>
					<span slot="title">我的商品</span>
				</el-menu-item>
				<el-menu-item index="/myWanteds">
					<i class="iconfont icon-fabuqiugou"></i>
					<span slot="title">我的求购</span>
				</el-menu-item>
			</el-menu>
		</div>
	</div>
</template>

<script>
	export default {
		name: "UserNav",
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
		},
	};
</script>
<style lang="scss" scoped>
	#nav-container {
		width: 200px;
		height: 600px;
		background: white;
		border-right: solid rgb(207, 207, 207) 1px;
		.nav {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			h5 {
				text-align: left;
				margin-left: 26px;
			}
			.el-menu-item {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
			i {
				font-size: 1.2rem;
				margin-right: 10px;
			}
		}
	}
</style>
