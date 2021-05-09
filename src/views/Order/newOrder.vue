<template>
  <div class="new-order-wrapper">
    <Navbar />
    <div class="new-order">
      <div class="new-order-container">
        <div class="reciver-box">
          <div class="reciver-box-title">
            收货地址
          </div>
          <div class="address-box-wrapper">
            <div
              class="address-box"
              v-for="(item, index) in address"
              :key="index"
              :class="isActive == index ? 'address-box-active' : 'address-box'"
              @click="handlePickAddr(index, item)"
            >
              <div class="content">
                <span>收货人: &nbsp;&nbsp;{{ item.receiver }}</span>
                <span>收货地址:&nbsp;{{ item.detailAdd }}</span>
                <span>手机号码:&nbsp;{{ item.phone }}</span>
              </div>
              <div class="operate">
                <el-button
                  icon="el-icon-edit"
                  circle
                  size="mini"
                  @click="editAdd(index)"
                ></el-button>
                <el-button
                  icon="el-icon-delete"
                  circle
                  size="mini"
                  @click="deleteAdd(item._id)"
                ></el-button>
              </div>
            </div>

            <div class="address-box" id="new" @click="dialogFormVisible = true">
              <i class="iconfont icon-xinzeng"></i>
              <span>新增地址</span>
            </div>
          </div>
          <!-- 修改地址 -->
          <el-dialog
            title="收货地址"
            :visible.sync="editAddressFormVisible"
            width="500px"
            :destroy-on-close="destroyOnClose"
          >
            <el-form>
              <el-form-item label="收货人" :label-width="formLabelWidth">
                <el-input
                  v-model="editAddress.receiver"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="收货地址" :label-width="formLabelWidth">
                <el-input
                  v-model="editAddress.detailAdd"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input
                  v-model="editAddress.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dropEdit">取 消</el-button>
              <el-button type="primary" @click="subEditAdd">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 新增地址 -->
          <el-dialog
            title="收货地址"
            :visible.sync="dialogFormVisible"
            width="500px"
          >
            <el-form :model="newAddr">
              <el-form-item label="收货人" :label-width="formLabelWidth">
                <el-input
                  v-model="newAddr.receiver"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="收货地址" :label-width="formLabelWidth">
                <el-input
                  v-model="newAddr.detailAdd"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input v-model="newAddr.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitNewAdd">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="order-list">
          <div class="goods">
            <el-table :data="order" style="width: 100%">
              <el-table-column
                label="商品信息"
                width="520"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="good-info">
                    <img :src="baseUrl + scope.row.good.pic[0]" /><span>{{
                      scope.row.good.name
                    }}</span>
                  </div></template
                >
              </el-table-column>
              <el-table-column label="单价/￥" width="160" align="center"
                ><template slot-scope="scope">{{
                  scope.row.good.price
                }}</template>
              </el-table-column>
              <el-table-column label="数量" width="160" align="center">
                <template slot-scope="scope"> {{ scope.row.count }} </template>
              </el-table-column>
              <el-table-column
                label="小计/￥"
                show-overflow-tooltip
                width="160"
                align="center"
                ><template slot-scope="scope">{{
                  scope.row.count * scope.row.good.price
                }}</template>
              </el-table-column>
            </el-table>
            <div class="order-bottom">
              <div class="price">
                应付金额: <span>￥{{ this.totalPrice }}</span>
              </div>
              <el-button type="primary" @click="createOrder"
                >提交订单</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import {
  GetAddress,
  AddAddress,
  DeleteAddress,
  UpdateAddress
} from "@/api/user";
import { CreateOrder } from "@/api/order";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
export default {
  components: {
    Footer,
    Navbar
  },
  data() {
    return {
      order: [],
      baseUrl: "http://localhost:3000/",
      address: [],
      dialogFormVisible: false,
      formLabelWidth: "80px",
      newAddr: {
        receiver: "",
        detailAdd: "",
        phone: ""
      },
      editAddressFormVisible: false,
      editAddress: {
        receiver: "",
        detailAdd: "",
        phone: ""
      },
      destroyOnClose: true,
      confirmAddress: {},
      active: false,
      //选中地址的地址
      isActive: 0
    };
  },
  methods: {
    // 从路由获取订单信息
    getOrder() {
      this.order = this.$route.params.order;
      // console.log(this.order);
    },
    //获取用户地址
    async getAddress() {
      let data = {
        uid: this.$store.state.userID
      };
      const res = await GetAddress(data);
      this.address = res.data.data[0].address;
      this.confirmAddress = this.address[0];
    },
    //提交新增地址
    submitNewAdd() {
      this.dialogFormVisible = false;
      // console.log("submitNewAdd");
      this.newAdd();
    },
    // 新增地址
    async newAdd() {
      // console.log("newAdd");
      console.log(this.newAddr);
      let data = this.newAddr;
      data.uid = this.$store.state.userID;
      const res = await AddAddress(data);
      console.log(res);
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "添加成功！"
        });
        this.getAddress();
      } else {
        this.$message({
          type: "warning",
          message: "添加失败！"
        });
      }
    },
    //删除地址
    async deleteAdd(addrId) {
      let data = {
        uid: this.$store.state.userID,
        addrId: addrId
      };
      const res = await DeleteAddress(data);
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "删除成功！"
        });
        this.getAddress();
      } else {
        this.$message({
          type: "warning",
          message: "删除失败"
        });
      }
    },
    // 深拷贝
    deepClone(obj) {
      let objClone = Array.isArray(obj) ? [] : {};
      if (obj && typeof obj === "object") {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            //判断ojb子元素是否为对象，如果是，递归复制
            if (obj[key] && typeof obj[key] === "object") {
              objClone[key] = this.deepClone(obj[key]);
            } else {
              //如果不是，简单复制
              objClone[key] = obj[key];
            }
          }
        }
      }
      return objClone;
    },
    // 修改地址
    editAdd(index) {
      this.editAddress = this.deepClone(this.address[index]);
      this.editAddressFormVisible = true;
    },
    // 取消修改
    dropEdit() {
      this.editAddress = {};
      console.log(this.address);
      this.editAddressFormVisible = false;
    },
    //提交修改
    async subEditAdd() {
      this.editAddressFormVisible = false;
      let data = {
        uid: this.$store.state.userID,
        addrId: this.editAddress._id,
        receiver: this.editAddress.receiver,
        phone: this.editAddress.phone,
        detailAdd: this.editAddress.detailAdd
      };
      const res = await UpdateAddress(data);
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "修改成功！"
        });
        this.getAddress();
      } else {
        this.$message({
          type: "warning",
          message: "修改失败！"
        });
      }
      this.getAddress();
    },
    // 点击选择地址
    handlePickAddr(index, address) {
      this.confirmAddress = address;
      this.isActive = index;
    },
    // 生成订单
    async createOrder() {
      let data = {
        address: this.confirmAddress,
        uid: this.$store.state.userID,
        totalPrice: this.totalPrice,
        goods: this.order
      };
      if (data.address === null || data.address === undefined) {
        this.$message.error({
          message: "地址不能为空！"
        });
        return;
      }
      const res = await CreateOrder(data);
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: "添加成功！"
        });
        this.$router.push({
          name: "ToPay",
          params: { oid: res.data.order._id }
        });
        this.getAddress();
      } else {
        this.$message({
          type: "warning",
          message: "提交失败！"
        });
        return;
      }
    }
  },
  computed: {
    totalPrice() {
      return this.order.reduce((total, cur) => {
        return total + cur.count * cur.good.price;
      }, 0);
    }
  },
  mounted: function() {
    this.getOrder();
    this.getAddress();
  }
};
</script>

<style lang="scss" scoped>
.new-order-wrapper {
  width: 100%;
}
.new-order {
  background: #f7f7f7;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 700px;
  .new-order-container {
    width: 80%;
    margin: 20px;
  }
  .reciver-box {
    margin: 20px 0;
    padding: 20px 0;
    border-radius: 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    .reciver-box-title {
      width: 95%;
      display: flex;
      justify-content: flex-start;
      margin: 10px 20px;
      flex-direction: row;
    }
    .address-box-wrapper {
      display: flex;
      width: 100%;
      margin-left: 30px;
      .address-box {
        cursor: pointer;
        max-width: 200px;
        margin: 10px 10px;
        padding: 20px;
        border: 1px #dbdbdb solid;
        border-radius: 10px;
        text-align: left;
        background: #2646533a;
        .operate {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
        }
        .content {
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          color: #3f3f3f;
          font-size: 0.8rem;
          span {
            margin: 5px 0;
          }
        }
      }
      .address-box-active {
        position: relative;
        cursor: pointer;
        max-width: 200px;
        margin: 10px 10px;
        padding: 20px;
        border: 1px #2a9d8f solid;
        border-radius: 10px;
        text-align: left;
        background: #2a9d9018;
        .operate {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
        }
        .content {
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          color: #3f3f3f;
          font-size: 0.8rem;
          span {
            margin: 5px 0;
          }
        }
      }
      .address-box-active::after {
        content: "√";
        color: #2a9d8f;
        font-weight: 600;
        position: absolute;
        right: 10%;
        top: 10%;
      }
      #new {
        background: #2646533a;
        width: 200px;
        height: 139.2px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
  .order-list {
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-top: 5%;
    .goods {
      margin: 10px;
      .good-info {
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-right: 10px;
        }
      }
    }
    .order-bottom {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 10px;
      .price {
        span {
          font-weight: 600;
          color: #2a9d8f;
          font-size: 1.2rem;
        }
        margin-right: 20px;
      }
    }
  }
}
</style>
