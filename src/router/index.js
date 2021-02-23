import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";

Vue.use(VueRouter);

const routes = [
	/**
	 * 首页
	 */
	{
		path: "/",
		redirect: "Index",
	},
	{
		path: "/index",
		name: "Index",
		component: Index,
	},
	//二手
	{
		path: "/goods",
		name: "Goods",
		component: () => import("../views/Goods/index.vue"),
	},
	//商品详情
	{
		path: "/goods_detail/:gid",
		name: "Goods_detail",
		component: () => import("../views/Goods/goods_detail.vue"),
	},
	//求购
	{
		path: "/wanteds",
		name: "Wanteds",
		component: () => import("../views/Wanteds/index.vue"),
	},
	//登录
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login/index.vue"),
	},
	//注册
	{
		path: "/register",
		name: "Register",
		component: () => import("../views/Register/index.vue"),
	},
	//发布商品
	{
		path: "/releaseGoods",
		name: "ReleaseGoods",
		component: () => import("../views/ReleaseGoods/index.vue"),
	},
	//发布求购
	{
		path: "/releaseWanted",
		name: "ReleaseWanted",
		component: () => import("../views/ReleaseWanted/index.vue"),
	},
	//个人中心
	{
		path: "/personalCenter",
		name: "PersonalCenter",
		component: () => import("../views/PersonalCenter/index.vue"),
		children: [
			{
				path: "/userInfo",
				name: "UserInfo",
				component: () => import("../views/PersonalCenter/Components/Info.vue"),
			},
			{
				path: "/myGoods",
				name: "MyGoods",
				component: () => import("../views/PersonalCenter/Components/MyGoods.vue"),
			},
			{
				path: "/myWanteds",
				name: "MyWanteds",
				component: () => import("../views/PersonalCenter/Components/MyWanteds.vue"),
			},
			{
				path: "/myCart",
				name: "MyCart",
				component: () => import("../views/PersonalCenter/Components/MyCart.vue"),
			},
		],
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
