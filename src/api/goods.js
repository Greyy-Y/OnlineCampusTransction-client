import service from "@/utils/request";

// 获取全部商品
export function GetGoods() {
  return service.request({
    method: "get",
    url: "/goods/getGoods"
  });
}
// 获取ID为：gid的商品
export function GetGoodsByID(gid) {
  return service.request({
    method: "post",
    url: "/goods/getGoodsByID",
    data: {
      gid
    }
  });
}
// 点击商品详情浏览量加1
export function AddViewed(gid) {
  return service.request({
    method: "post",
    url: "/goods/addViewed",
    data: {
      gid
    }
  });
}
// 获取商品评论
export function GetGoodComment(gid) {
  return service.request({
    method: "post",
    url: "/goods/getComment",
    data: {
      gid
    }
  });
}
// 提交商品评论
export function SubmitComment(data) {
  return service.request({
    method: "post",
    url: "/goods/comment",
    data: {
      gid: data.gid,
      uid: data.uid,
      content: data.content,
      rate: data.rate
    }
  });
}
// 发布商品
export function ReleaseGoods(data) {
  return service.request({
    method: "post",
    url: "/goods/add",
    data
  });
}
//修改我发布的商品
export function EditMyGood(data) {
  return service.request({
    method: "post",
    url: "/goods/editMyGood",
    data
  });
}

// *获取推荐商品
export function GetRecommend() {
  return service.request({
    method: "get",
    url: "/recommend/getRecommend"
  });
}
// *获取精选商品

export function GetFeatured() {
  return service.request({
    method: "get",
    url: "/recommend/getFeatured"
  });
}

// 获取特定目录商品列表
export function FindByCate(data) {
  return service.request({
    method: "post",
    url: "/goods/findByCate",
    data: {
      cateID: data.cateID
    }
  });
}
//模糊搜索商品
export function GetGoodsByName(value) {
  return service.request({
    method: "post",
    url: "/goods/getGoodsByName",
    data: {
      value: value
    }
  });
}

//减少库存
export function DecCount(data) {
  return service.request({
    method: "post",
    url: "/goods/decCount",
    data
  });
}
