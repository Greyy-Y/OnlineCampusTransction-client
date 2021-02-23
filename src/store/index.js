import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 要设置的全局访问的state对象
		userName: sessionStorage.getItem("userName") || "游客",
		userID: sessionStorage.getItem("userID"),
		isLogin: sessionStorage.getItem("isLogin") || false,
		avatar: sessionStorage.getItem("avatar"),
		realName: sessionStorage.getItem("realName"),
		sex: sessionStorage.getItem("sex"),
		myCart: JSON.parse(sessionStorage.getItem("myCart")),
	},
	getters: {
		getUserName(state) {
			return state.userName;
		},
		getAvatar(state) {
			return "http://localhost:3000/" + state.avatar;
		},
	},

	mutations: {
		login(state, payload) {
			let { name, ID, isLogin, avatar, realName, sex } = payload;
			state.userName = name || "默认用户";
			state.userID = ID;
			state.isLogin = isLogin;
			state.avatar = avatar;
			state.realName = realName;
			state.sex = sex;
			sessionStorage.setItem("userName", state.userName);
			sessionStorage.setItem("userID", state.userID);
			sessionStorage.setItem("isLogin", isLogin);
			sessionStorage.setItem("avatar", state.avatar);
			sessionStorage.setItem("realName", state.realName);
			sessionStorage.setItem("sex", state.sex);
		},
		logout(state) {
			(state.userName = "游客"),
				(state.userID = ""),
				(state.isLogin = false),
				(state.avatar = null),
				(state.realName = null);
		},
		update(state, payload) {
			let { nickName, realName, avatar } = payload;
			state.userName = nickName;
			state.avatar = avatar;
			state.realName = realName;
			sessionStorage.setItem("userName", state.userName);
			sessionStorage.setItem("avatar", state.avatar);
			sessionStorage.setItem("realName", state.realName);
		},
		setMyCart(state, payload) {
			let { cart } = payload;
			state.myCart = cart;
			sessionStorage.setItem("myCart", JSON.stringify(state.myCart));
		},
	},
	actions: {},
	modules: {},
});
