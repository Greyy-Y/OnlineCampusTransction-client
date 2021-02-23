<template>
	<div class="info">
		<div class="form">
			<el-form ref="form" :model="form" label-width="80px" size="mini" :disabled="disable">
				<el-form-item label="头像">
					<div class="avatar">
						<div class="a">
							<el-avatar :src="imgDataUrl || this.$store.getters.getAvatar" style="margin-left:-30px"></el-avatar>
						</div>

						<el-button @click="toggleShow" class="btn" size="mini">设置头像</el-button>
						<my-upload
							field="img"
							@crop-success="cropSuccess"
							@crop-upload-success="cropUploadSuccess"
							@crop-upload-fail="cropUploadFail"
							v-model="show"
							:width="300"
							:height="300"
							url="http://localhost:3000/upload"
							img-format="png"
						></my-upload>
					</div>
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="form.nickName" :placeholder="this.$store.state.userName"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名">
					<el-input
						v-model="form.realName"
						:placeholder="[this.$store.state.realName ? this.$store.state.realName : '请输入真实姓名']"
					></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
						<el-radio label="未知"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="个性签名">
					<el-input type="textarea" v-model="form.signature"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="button">
			<el-button type="warning" @click="able" size="mini">修改</el-button>
			<el-button type="primary" @click="onSubmit" size="mini">保存</el-button>
		</div>
	</div>
</template>

<script>
	import { UpdateUserInfo } from "@/api/user";
	import myUpload from "vue-image-crop-upload";
	export default {
		components: {
			"my-upload": myUpload,
		},
		data() {
			return {
				form: {
					nickName: this.$store.state.userName,
					realName: this.$store.state.realName,
					sex: this.$store.state.sex,
					signature: "",
					avatar: this.$store.state.avatar,
				},
				show: false,
				size: "large",
				imgDataUrl: "",
				disable: true,
			};
		},
		methods: {
			async onSubmit() {
				let data = {
					nickName: this.form.nickName,
					realName: this.form.realName,
					sex: this.form.sex,
					signature: this.form.signature,
					avatar: this.form.avatar,
					uid: this.$store.state.userID,
				};
				const res = await UpdateUserInfo(data);
				console.log(res);
				// 更新vuex里的全局变量
				if (res.status === 200) {
					this.$store.commit("update", {
						nickName: this.form.nickName,
						realName: this.form.realName,
						avatar: this.form.avatar,
					});
					this.$message({
						type: "success",
						message: "修改成功!",
					});
					this.able();
					// this.$router.push("/userInfo");
				} else {
					this.$message({
						type: "warning",
						message: "未知错误!",
					});
				}
			},
			able() {
				this.disable = !this.disable;
			},
			toggleShow() {
				this.show = !this.show;
			},
			cropSuccess(imgDataUrl, field) {
				console.log("-------- crop success --------");
				this.imgDataUrl = imgDataUrl;
			},
			cropUploadSuccess(jsonData, field) {
				console.log("-------- upload success --------");
				console.log(jsonData);
				this.form.avatar = jsonData.imgsPath[0].url;
				console.log(this.form.avatar);
			},
			cropUploadFail(status, field) {
				console.log("-------- upload fail --------");
				console.log(status);
				console.log("field: " + field);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.info {
		display: flex;
		flex-direction: column;
		.form {
			width: 80%;
			display: flex;
			height: 100%;
			margin: 30px 0 0 30px;
			.avatar {
				display: flex;
				justify-content: center;
				align-items: center;
				.el-avatar {
					width: 50px;
					height: 50px;
				}
				.btn {
					margin-left: 20px;
					padding: 5px;
				}
			}
		}
		.button {
			width: 200px;
			margin-left: 72px;
		}
	}
</style>
