<template>
  <div class="myorder-wrapper">
    <div class="empty" v-if="this.myOrder.length === 0">
      <img src="../../../assets/img/nogood.png" alt="" />
      <span style="color:#a8a8a8">暂无订单</span>
    </div>
    <div class="myorder" v-for="(item, index) in myOrder" :key="index">
      <div class="myorder-box">
        <div class="desc">
          <div class="date">{{ item.orderTime }}</div>
          <div class="oid">订单号:{{ item._id }}</div>
          <div class="see-desc">
            <el-link style="margin-left:410px" @click="toOrderDetail(item._id)"
              >查看详情<i class="el-icon-view el-icon--right"></i>
            </el-link>
          </div>
          <div class="delete-order">
            <el-button
              size="mini"
              icon="el-icon-delete"
              circle
              @click="deleteOrder(item._id)"
              v-if="item.state === 4"
            ></el-button>
          </div>
        </div>
        <div class="content">
          <div class="goods-container">
            <div
              class="goods"
              v-for="(goodItem, index) in item.goods"
              :key="index"
            >
              <div class="pic"><img :src="baseUrl + goodItem.good.pic" /></div>
              <div class="name">{{ goodItem.good.name }}</div>
              <div class="price">￥{{ goodItem.good.price }}</div>
              <div class="count">{{ goodItem.count }}</div>
            </div>
          </div>

          <div class="total-price">
            订单金额<span>￥{{ item.totalPrice }}</span>
          </div>
          <div class="order-status">
            <el-button
              v-if="item.payStatus === 0"
              size="mini"
              type="warning"
              @click="toPay(item._id)"
              >前往支付</el-button
            >
            <el-button
              v-if="item.payStatus === 0"
              size="mini"
              type="danger"
              @click="deleteOrder(item._id)"
              >取消订单</el-button
            >
            <el-button v-else size="mini" type="success">支付完成</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetMyOrder, DeleteOrder } from "@/api/order";
export default {
  data() {
    return {
      myOrder: [],
      newMyCart: [],
      baseUrl: "http://localhost:3000/"
    };
  },
  methods: {
    async getMyOrder() {
      let data = {
        uid: this.$store.state.userID
      };
      const res = await GetMyOrder(data);
      this.myOrder = res.data.data;
      this.myOrder.forEach(v => {
        v.orderTime = this.dayjs(v.orderTime).format("YYYY-MM-DD hh:ss");
        return v;
      });
      this.myOrder.reverse();
    },
    async deleteOrder(oid) {
      let data = {
        oid
      };
      const res = await DeleteOrder(data);
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
        this.getMyOrder();
      } else {
        this.$message({
          type: "warning",
          message: "删除失败"
        });
      }
    },
    toPay(oid) {
      this.$router.push({ name: "ToPay", params: { oid: oid } });
    },
    toOrderDetail(oid) {
      this.$router.push({ name: "OrderDetail", params: { oid: oid } });
    }
  },
  created: function() {
    this.getMyOrder();
  }
};
</script>

<style lang="scss" scoped>
.myorder-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .myorder {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    .myorder-box {
      border: solid 1px #d8d7d7;
      border-radius: 5px;
      margin: 10px 0;

      box-shadow: transparent;
      transition: all 0.2s ease;
      .desc {
        display: flex;
        background-color: #eeeeee;
        align-items: center;
        justify-content: flex-start;
        padding: 5px;
        .date {
          margin-left: 10px;
          font-size: 0.8rem;
          text-align: left;
        }
        .oid {
          font-size: 0.7rem;
          margin-left: 0px;
          margin-left: 20px;
          transform: translateY(-1px);
        }
        .delete-order {
          margin-left: 30px;
          cursor: pointer;
        }
      }
      .content {
        display: flex;
        margin-top: 10px;
        box-sizing: border-box;
        .goods-container {
          display: flex;
          flex-direction: column;
          flex: 4;
          .goods {
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-bottom: #d8d7d7 solid 1px;
            border-right: #d8d7d7 solid 1px;
            padding: 20px;
            .pic {
              img {
                width: 80px;
                height: 80px;
                object-fit: fill;
              }
            }
            .name {
              text-align: left;
              width: 360px;
              margin-left: 20px;
            }
            .price {
            }
            .count {
              margin-left: 40px;
            }
          }
        }
        .total-price {
          flex: 1;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-right: solid 1px #d8d7d7;

          span {
            font-weight: 600;
            color: #2a9d8f;
            margin-top: 20px;
          }
        }
        .order-status {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .myorder-box:hover {
      box-shadow: 8px 8px 15px #e4e4e4;
    }
  }
  .empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
     
  }

  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
}
</style>
