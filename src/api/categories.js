import service from "@/utils/request";

export function GetCate() {
	return service.request({
		method: "get",
		url: "/categories/",
	});
}
