import service from "@/utils/request";

export function Login(data) {
  return service.request({
    method: "post",
    url: "/login",
    data
  });
}
