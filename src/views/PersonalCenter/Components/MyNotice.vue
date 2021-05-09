<template>
  <div class="mynotice-wrapper">
    <div class="empty" v-if="this.myNotice.length === 0">
      <div class="div"><img src="../../../assets/img/nomessage.png" alt="" /></div>
      <span style="color:#a8a8a8">暂无消息</span>
    </div>

    <div class="mynotice" v-for="(item, index) in unread" :key="index">
      <div class="mynotice-box">
        <div class="mynotice-box-title">
          <div class="date">
            订单时间：<span>{{ item.orderTime }}</span>
          </div>
          <div class="oid">
            订单号:<span>{{ item._id._id }}</span>
          </div>
          <div class="unread">
            <el-tag
              type="danger"
              class="unread"
              @click="handleUnread(item._id._id, item.good._id,item.orderId._id)"
              >未发货</el-tag
            >
          </div>
        </div>
        <div class="mynotice-box-content">
          <div class="desc">
            <div class="pic"><img :src="baseUrl + item.good.pic[0]" /></div>
            <div class="text">
              <div class="name">商品名：{{ item.good.name }}</div>
              <div class="price">售价：{{ item.good.price }}</div>
              <div class="count">数量：{{ item.count }}</div>
            </div>
          </div>
          <div class="address">
            <div class="detail">地址：{{ item.address[0].detailAdd }}</div>
            <div class="receiver">收货人：{{ item.address[0].receiver }}</div>
            <div class="phone">电话：{{ item.address[0].phone }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mynotice" v-for="(item, index) in read" :key="'read' + index">
      <div
        class="mynotice-box"
        style="color:#c4c4c4;border: solid 2px #c4c4c4;"
      >
        <div class="mynotice-box-title">
          <div class="date">
            订单时间：<span style="color:#c4c4c4">{{ item.orderTime }}</span>
          </div>
          <div class="oid">
            订单号:<span style="color:#c4c4c4">{{ item._id._id }}</span>
          </div>
          <div class="oid read" style="color:#c4c4c4">
            <el-tag type="info">已发货</el-tag>
          </div>
        </div>
        <div class="mynotice-box-content">
          <div class="desc">
            <div class="pic"><img :src="baseUrl + item.good.pic[0]" /></div>
            <div class="text">
              <div class="name">商品名：{{ item.good.name }}</div>
              <div class="price">售价：{{ item.good.price }}</div>
              <div class="count">数量：{{ item.count }}</div>
            </div>
          </div>
          <div class="address">
            <div class="detail">地址：{{ item.address[0].detailAdd }}</div>
            <div class="receiver">收货人：{{ item.address[0].receiver }}</div>
            <div class="phone">电话：{{ item.address[0].phone }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetMyNotice, ChangeNoticeState } from "@/api/notice";
import { SendGood, AckSendGood } from "@/api/order";
export default {
  data() {
    return {
      myNotice: [],
      read: [],
      unread: [],
      newmyNotice: [],
      baseUrl: "http://localhost:3000/"
    };
  },
  watch: {
    unread() {
      if (this.unread.length == 0) {
        this.$store.commit("hasNewMessage", false);
      }
    }
  },
  methods: {
    async handleUnread(nid, gid,oid) {
      let data = {
        nid: nid,
        state: 1
      };
      await ChangeNoticeState(data);
      await this.sendGood(nid,gid,oid);
      this.read=[];
      this.unread = [];
      await this.getMyNotice();
    },
    async getMyNotice() {
      let data = {
        sellerId: this.$store.state.userID
      };
      const res = await GetMyNotice(data);
      this.myNotice = res.data.data;
      this.myNotice.forEach(v => {
        v.orderTime = this.dayjs(v.orderTime).format("YYYY-MM-DD hh:ss");
        v.state == 0 ? this.unread.push(v) : this.read.push(v);
        return v;
      });
    },
    async sendGood(nid,gid, oid) {
      let data = {
        gid: gid,
        oid: oid
      };
      const res = await SendGood(data);
      if (res.status == 200) {
        this.$message.success(res.data.message);
        const res1 = AckSendGood(oid);
        if (res1.status == 200) {
          this.$message(res.data.message);
        }
      } else {
        this.$message.error("未知错误");
      }
    }
  },
  created: function() {
    this.getMyNotice();
  }
};
</script>

<style lang="scss" scoped>
.mynotice-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .mynotice {
    width: 90%;
    margin: 10px 0;
    .mynotice-box {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border: solid 2px #2a9d8f;
      border-radius: 5px;
      box-shadow: transparent;
      transition: all 0.2s ease;
      &-title {
        display: flex;
        margin: 10px 20px;
        span {
          color: #2a9d8f;
          //  color: #d8d7d7;
          margin-left: 10px;
        }
        .date {
          margin-right: 40px;
        }
      }
      &-content {
        display: flex;
        .desc {
          max-width: 400px;
          display: flex;
          .pic {
            margin: 10px 20px;
            width: 110px;
            height: 110px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            display: flex;
            flex-direction: column;
            text-align: left;
            padding: 10px;
            div {
              margin-top: 10px;
            }
            div:nth-child(1) {
              margin: 0;
            }
          }
        }

        .address {
          display: flex;
          flex-direction: column;
          margin: 10px auto;
          text-align: left;
          .receiver,
          .phone {
            margin-top: 10px;
          }
        }
        .send {
          margin: 10px 30px;
        }
      }
    }
    .mynotice-box:hover {
      box-shadow: 8px 8px 15px #e4e4e4;
    }
    .mynotice-box-read {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      border: solid 1px #d8d7d7;
      color: #d8d7d7;
      border-radius: 5px;
      &-title {
        display: flex;
        margin: 10px 20px;
        span {
          // color: #2a9d8f;
          color: #d8d7d7;
          margin-left: 10px;
        }
        .date {
          margin-right: 40px;
        }
      }
      &-content {
        display: flex;
        .desc {
          max-width: 400px;
          display: flex;
          .pic {
            margin: 10px 20px;
            width: 110px;
            height: 110px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            display: flex;
            flex-direction: column;
            text-align: left;
            padding: 10px;
            div {
              margin-top: 10px;
            }
            div:nth-child(1) {
              margin: 0;
            }
          }
        }

        .address {
          display: flex;
          flex-direction: column;
          margin: 10px auto;
          text-align: left;
          .receiver,
          .phone {
            margin-top: 10px;
          }
        }
        .send {
          margin: 10px 30px;
        }
      }
    }

    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      
    }
  }

  .unread {
    color: #e76f51 !important;
    cursor: pointer;
    margin-left: 31.5%;
  }
  .read {
    cursor: not-allowed;
    margin-left: 31.5%;
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
