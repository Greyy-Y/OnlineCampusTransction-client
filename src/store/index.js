import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 要设置的全局访问的state对象
		userName: sessionStorage.getItem("userName") || "游客",
		userID: sessionStorage.getItem("userID"),
		isLogin: sessionStorage.getItem("isLogin") || false,
	},
	getters: {
		getUserName(state) {
			return state.userName;
		},
	},

	mutations: {
		login(state, payload) {
			let { name, ID, isLogin } = payload;
			state.userName = name || "默认用户";
			state.userID = ID;
			state.isLogin = isLogin;
			sessionStorage.setItem("userName", state.userName);
			sessionStorage.setItem("userID", state.userID);
			sessionStorage.setItem("isLogin", isLogin);
		},
		logout(state) {
			(state.userName = "游客"), (state.userID = ""), (state.isLogin = false);
		},
	},
	actions: {},
	modules: {},
});
