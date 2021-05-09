import service from "@/utils/request";
//获取全部求购信息
export function GetWanteds() {
  return service.request({
    method: "get",
    url: "/wanteds/getWanteds"
  });
}
// 发布求购信息
export function ReleaseWanteds(data) {
  return service.request({
    method: "post",
    url: "/wanteds/add",
    data
  });
}
