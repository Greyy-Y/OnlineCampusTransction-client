import service from "@/utils/request";

// 获取全部订单
export function NewNotice(data) {
	return service.request({
		method: "post",
		url: "/notice/create",
		data,
	});
}

export function GetMyNotice(data) {
	return service.request({
		method: "post",
		url: "/notice/getMyNotice",
		data,
	});
}
