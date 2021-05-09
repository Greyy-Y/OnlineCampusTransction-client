import service from "@/utils/request";

export function Register(data) {
  return service.request({
    method: "post",
    url: "/register",
    data
  });
}
