<template>
	<div id="nav-container">
		<div class="nav">
			<h4>个人中心</h4>
			<el-menu :router="true" class="el-menu-vertical-demo" active-text-color="#2a9d8f" :default-active="$route.path">
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
					<span slot="title">我的求购</span> </el-menu-item
				><el-menu-item index="/myOrder">
					<i class="iconfont icon-dingdan23"></i>
					<span slot="title">我的订单</span>
				</el-menu-item>
				<el-menu-item index="/myNotice">
					<i class="iconfont icon-xiaoxi"></i>
					<span slot="title">我的消息</span>
				</el-menu-item>
				<el-menu-item index="/myCart">
					<i class="iconfont icon-gouwuche1" id="gouwuche"></i>
					<span slot="title" id="gouwuchetext">我的购物车</span>
				</el-menu-item>
			</el-menu>
		</div>
	</div>
</template>

<script>
	export default {
		name: "UserNav",
		data(){
			return {
				menuIndex:0,
			}
		},
		methods: {
			// getMenuIndex(){
			// 	this.menuIndex = this.$route.params.menuIndex;
			// 	console.log(this.menuIndex)
			// }
		},
		// created(){
		// 	this.getMenuIndex();
		// }
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
				font-size: 1.25rem;
				margin-right: 10px;
			}
			#gouwuche {
				margin-left: -2px;
			}
			#gouwuchetext {
				margin-left: -1px;
			}
		}
	}
</style>
