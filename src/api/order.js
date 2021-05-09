import service from "@/utils/request";

// 获取全部订单
export function GetOrders() {
  return service.request({
    method: "get",
    url: "/orders/getOrders"
  });
}
// 创建订单
export function CreateOrder(data) {
  return service.request({
    method: "post",
    url: "/orders/create",
    data
  });
}
// 获取我的订单
export function GetMyOrder(data) {
  return service.request({
    method: "post",
    url: "/orders/getMyOrder",
    data: {
      uid: data.uid
    }
  });
}

export function DeleteOrder(data) {
  return service.request({
    method: "post",
    url: "/orders/deleteMyOrder",
    data: {
      oid: data.oid
    }
  });
}

export function GetOrderById(data) {
  return service.request({
    method: "post",
    url: "/orders/getOrderById",
    data: {
      oid: data.oid
    }
  });
}
// 支付订单
export function OrderPayed(data) {
  return service.request({
    method: "post",
    url: "/orders/orderPayed",
    data: {
      oid: data.oid,
      payType: data.payType
    }
  });
}
// 确认收货
export function AckGood(data) {
  return service.request({
    method: "post",
    url: "/orders/editOrder",
    data: {
      id: data.id,
      state: data.state,
      payStatus: 1
    }
  });
}
// 确认发货
export function AckSendGood(data) {
  return service.request({
    method: "post",
    url: "/orders/editOrder",
    data: {
      id: data,
      state: 2,
      payStatus: 1
    }
  });
}

// 发货
export function SendGood(data) {
  return service.request({
    method: "post",
    url: "/orders/sendGood",
    data
  });
}
// // 确认收货
// export function AckSendGood(data) {
// 	return service.request({
// 		method: "post",
// 		url: "/orders/editOrder",
// 		data: {
// 			id: data.id,
// 			state: 2,
// 			payStatus: 1,
// 		},
// 	});
// }
