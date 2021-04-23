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
// 删除发布的商品
export function DeleteReleaseGood(data) {
	return service.request({
		method: "post",
		url: "/users/deleteReleaseGood",
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
// 删除我的求购
export function DeleteWanted(data) {
	return service.request({
		method: "post",
		url: "/users/deleteWanted",
		data,
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
// 获取我发布的商品中的特定商品
export function GetMyGoodById(data) {
	return service.request({
		method: "post",
		url: "/users/getMyGoodById",
		data: {
			uid: data.uid,
			goodId: data.gid,
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
export function RemoveGoodsFromCart(data) {
	return service.request({
		method: "post",
		url: "/users/removeGoodsFromCart",
		data: {
			goodId: data.goodId,
			uid: data.uid,
		},
	});	
}
// 修改我的购物车
export function UpdateMyCart(data) {
	return service.request({
		method: "post",
		url: "/users/updateMyCart",
		data: {
			goodId: data.goodId,
			uid: data.uid,
			count: data.count,
		},
	});
}
// 清空我的购物车
export function EmptyMyCart(data) {
	return service.request({
		method: "post",
		url: "/users/emptyMyCart",
		data: {
			uid: data.uid,
		},
	});
}
// 新增收货地址
export function AddAddress(data) {
	return service.request({
		method: "post",
		url: "/users/addAddress",
		data: {
			uid: data.uid,
			receiver: data.receiver,
			phone: data.phone,
			detailAdd: data.detailAdd,
		},
	});
}
// 获取我的收货地址
export function GetAddress(data) {
	return service.request({
		method: "post",
		url: "/users/getAddress",
		data: {
			uid: data.uid,
		},
	});
}
// 删除我的收货地址
export function DeleteAddress(data) {
	return service.request({
		method: "post",
		url: "/users/deleteAddress",
		data: {
			uid: data.uid,
			addrId: data.addrId,
		},
	});
}
//修改我的地址
export function UpdateAddress(data) {
	return service.request({
		method: "post",
		url: "/users/updateAddress",
		data: {
			uid: data.uid,
			addrId: data.addrId,
			receiver: data.receiver,
			phone: data.phone,
			detailAdd: data.detailAdd,
		},
	});
}
