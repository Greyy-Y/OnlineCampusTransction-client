<template>
	<div id="nav-container">
		<div class="nav">
			<h4>个人中心</h4>
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
					<span slot="title">我的发布</span>
				</el-menu-item>
				<el-menu-item index="/myWanteds">
					<i class="iconfont icon-fabuqiugou"></i>
					<span slot="title">我的求购</span>
				</el-menu-item>
				<el-menu-item index="/myCart">
					<i class="iconfont icon-gouwuche1" id="gouwuche"></i>
					<span slot="title">我的购物车</span>
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
		width: 180px;
		height: 700px;
		background: white;
		border-right: solid rgb(207, 207, 207) 1px;
		.nav {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			h4 {
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
			#gouwuche {
				margin: 0 8px 0 -1px;
			}
		}
	}
</style>
