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
		path: "/tobuy",
		name: "ToBuy",
		component: () => import("../views/ToBuy/index.vue"),
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
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
