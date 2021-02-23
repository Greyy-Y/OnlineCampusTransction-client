import service from "@/utils/request";

//更新用户资料
export function UpdateUserInfo(data) {
	return service.request({
		method: "post",
		url: "/users/update",
		data,
	});
}

//获取用户的发布信息
export function GetPublished(data) {
	return service.request({
		method: "post",
		url: "/users/update",
		data,
	});
}
// 把发布的求购存入user中
export function AddWanted(data) {
	return service.request({
		method: "post",
		url: "/users/addWanted",
		data,
	});
}
// 把发布的商品存入user中
export function AddGood(data) {
	return service.request({
		method: "post",
		url: "/users/addGood",
		data,
	});
}

// 获取我的求购
export function GetMyWanted(data) {
	return service.request({
		method: "post",
		url: "/users/getMyWanted",
		data: {
			uid: data.uid,
		},
	});
}
// 获取我的商品
export function GetMyGoods(data) {
	return service.request({
		method: "post",
		url: "/users/getMyGoods",
		data: {
			uid: data.uid,
		},
	});
}
// 获取我的购物车
export function GetMyCart(data) {
	return service.request({
		method: "post",
		url: "/users/getMyCart",
		data: {
			uid: data.uid,
		},
	});
}
// 加入我的购物车
export function AddToCart(data) {
	return service.request({
		method: "post",
		url: "/users/addToCart",
		data: {
			goodId: data.goodId,
			uid: data.uid,
		},
	});
}
// 从我的购物车中移除
export function RemoveGoodFromCart(data) {
	return service.request({
		method: "post",
		url: "/users/removeGoodFromCart",
		data: {
			goodId: data.goodId,
			uid: data.uid,
		},
	});
}
