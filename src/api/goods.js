import service from "@/utils/request";

/**
 *
 * 获取商品
 */

export function GetGoods() {
	return service.request({
		method: "get",
		url: "/goods/getGoods",
	});
}
