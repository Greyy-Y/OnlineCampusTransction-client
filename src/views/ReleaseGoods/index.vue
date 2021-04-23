<template>
  <div class="release">
    <Navbar />
    <div class="form-wrapper">
      <div class="form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          label-width="60px"
        >
          <div class="title">
            发布商品
          </div>
          <el-form-item label="名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="必要，商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="desc">
            <el-input
              v-model="ruleForm.desc"
              placeholder="详细的介绍会吸引更多买家哦"
              :rows="2"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="标价" prop="price">
            <el-input
              v-model="ruleForm.price"
              placeholder="想卖的价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="原价" prop="originPrice">
            <el-input
              v-model="ruleForm.originPrice"
              placeholder="商品原价，如果忘记可填大概价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="成色" prop="new">
            <el-input
              v-model.number="ruleForm.new"
              placeholder="数字，商品新旧程度（如 8 表示8成新）"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="category" class="cate">
            <!-- options 获取后端目录数据 -->
            <div>
              <el-cascader
                v-model="ruleForm.category"
                :options="options"
                style="margin-left: -60px"
                :props="props"
              ></el-cascader>
            </div>
          </el-form-item>
          <el-form-item label="数量" prop="count">
            <el-input
              v-model.number="ruleForm.count"
              placeholder="商品数量"
            ></el-input>
          </el-form-item>
          <el-form-item style="display:flex">
            <div>请选择 1 张图片上传，推荐750*750px，小于2M</div>
          </el-form-item>
          <el-form-item
            style="display:flex"
            v-model="ruleForm.pic"
            prop="pic"
            label="图片"
          >
            <el-upload
              :action="uploadURL"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :limit="limit"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>

          <el-form-item style="margin-left:-60px" class="btn">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { GetCate } from "@/api/categories";
import { ReleaseGoods } from "@/api/goods";
import { AddGood } from "@/api/user";
import Navbar from "@/components/Navbar";
import Footer from "../../components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },

  data() {
    let validatePrice = (rule, value, callback) => {
      //包含小数的数字
      let reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
      if (value === "") {
        callback(new Error("请输入价格"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入大于0的数字"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        desc: "",
        new: "",
        price: "",
        originPrice: "",
        //传objid
        category: "",
        count: "",
        pic: []
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        desc: [{ message: "请输入商品描述", trigger: "blur" }],
        price: [{ required: true, validator: validatePrice, trigger: "blur" }],
        originPrice: [{ validator: validatePrice, trigger: "blur" }],
        new: [
          { required: true, message: "请输入商品成色", trigger: "blur" },
          { type: "number", message: "新旧程度应为1-10之间", min: 1, max: 10 }
        ],
        count: [
          {
            type: "number",
            required: true,
            message: "请输入商品数量（至少为1）",
            trigger: "blur"
          }
        ],
        category: [
          { required: true, message: "请选择商品类别", trigger: "blur" }
        ],
        pic: [{ required: true, message: "请上传1张图片" }]
      },
      validate: false,
      //cate
      options: [],
      props: {
        expandTrigger: "hover"
      },
      //uoload
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      uploadURL: "http://localhost:3000/upload",
      limit: 1
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.validate = true;
        } else {
          this.$message({
            type: "warning",
            message: "请检查表格有无错漏！"
          });
          return false;
        }
      });
      if (this.validate) {
        let data = {
          name: this.ruleForm.name,
          desc: this.ruleForm.desc,
          new: this.ruleForm.new,
          category: this.ruleForm.category[1],
          count: this.ruleForm.count,
          price: this.ruleForm.price,
          originPrice: this.ruleForm.originPrice,
          pic: this.ruleForm.pic[0],
          uid: this.$store.state.userID
        };
        const res = await ReleaseGoods(data);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "发布成功！"
          });
          this.$router.push("/myGoods");
          let resdata = {
            uid: this.$store.state.userID,
            goodId: res.data.goods._id
          };
          AddGood(resdata).then(res => {
            console.log(res);
          });
        } else {
          this.$message({
            type: "warning",
            message: "发布失败！"
          });
        }
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //upload
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleSuccess(file) {
      console.log(file);
      this.ruleForm.pic.push(file.imgsPath[0].url);
    },
    async getCate() {
      const res = await GetCate();
      this.options = res.data.map(item => {
        item.subCate = item.subCate.map(o => {
          return { value: o._id, label: o.subName };
        });
        return { value: item.name, label: item.name, children: item.subCate };
      });
    }
  },
  mounted: function() {
    this.getCate();
  }
};
</script>
<style lang="scss" scoped>
.release {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .form-wrapper {
    width: 100%;
    background: #f7f7f7;
    display: flex;
    justify-content: center;
    align-items: center;
    .demo-ruleForm {
      margin: 30px;
      width: 650px;
      background: white;
      padding: 10px 80px;
      border-radius: 20px;
      .title {
        padding: 10px;
        font-size: 1.4rem;
        font-weight: 600;
      }
      .cate {
        display: flex;
        .el-form-item__content {
          margin: 0 !important;
        }
      }
      .btn {
        margin-top: 40px;
      }
    }
  }
}
</style>
