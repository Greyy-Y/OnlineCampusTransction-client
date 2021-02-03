import service from "@/utils/request";

// 获取全部商品
export function GetGoods() {
	return service.request({
		method: "get",
		url: "/goods/getGoods",
	});
}
// 获取ID为：gid的商品
export function GetGoodsByID(gid) {
	return service.request({
		method: "post",
		url: "/goods/getGoodsByID",
		data: {
			gid,
		},
	});
}
// *获取推荐商品

export function GetRecommend() {
	return service.request({
		method: "get",
		url: "/recommend/getRecommend",
	});
}
// *获取精选商品

export function GetFeatured() {
	return service.request({
		method: "get",
		url: "/recommend/getFeatured",
	});
}
