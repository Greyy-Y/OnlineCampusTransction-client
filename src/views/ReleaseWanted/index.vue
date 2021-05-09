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
            发布求购
          </div>
          <el-form-item label="标题" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="很重要，让您的需求一目了然"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input
              v-model="ruleForm.desc"
              placeholder="让别人更清楚的了解您的需求"
              :rows="2"
              type="textarea"
            ></el-input>
          </el-form-item>
          <el-form-item label="预算" prop="budget">
            <el-input
              v-model="ruleForm.budget"
              placeholder="能接受的价格"
            ></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="contact">
            <el-input
              v-model="ruleForm.contact"
              placeholder="联系方式（微信，QQ，手机）"
            ></el-input>
          </el-form-item>
          <el-form-item style="display:flex">
            <div>（可选）请选择 1 张图片上传，推荐750*750px</div>
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
import { ReleaseWanteds } from "@/api/wanteds";
import { AddWanted } from "@/api/user";
import Navbar from "@/components/Navbar";
import Footer from "../../components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      ruleForm: {
        name: "",
        desc: "",
        contact: "",
        budget: "",
        pic: []
      },
      rules: {
        name: [
          { required: true, message: "请输入求购商品名称", trigger: "blur" }
        ],
        desc: [{ message: "请输入具体描述", trigger: "blur" }],
        budget: [{ message: "请输入大概预算", trigger: "blur" }],
        contact: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ]
      },
      validate: false,
      //cate
      options: [],
      props: { expandTrigger: "hover" },
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
          budget: this.ruleForm.budget,
          contact: this.ruleForm.contact,
          pic: this.ruleForm.pic[0],
          uid: this.$store.state.userID
        };
        const res = await ReleaseWanteds(data);
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "发布成功！"
          });
          this.$router.push("Wanteds");
          let resdata = {
            uid: this.$store.state.userID,
            wantedId: res.data.wanteds._id
          };
          AddWanted(resdata).then(res => {});
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
    }
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
      .btn {
        margin-top: 40px;
      }
    }
  }
}
</style>
