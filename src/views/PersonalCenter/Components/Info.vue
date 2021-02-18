<template>
	<div class="info">
		<div class="form">
			<el-form ref="form" :model="form" label-width="80px" size="mini">
				<el-form-item label="头像">
					<el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="form.nickName"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名">
					<el-input v-model="form.realName"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
						<el-radio label="保密"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="个性签名">
					<el-input type="textarea" v-model="form.signature"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">立即创建</el-button>
					<el-button>取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					nickName: "",
					region: "",
					realName: "",
					sex: "",
					signature: "",
					avatar: [],
				},
			};
		},
		methods: {
			onSubmit() {
				console.log("submit!");
			},
		},
	};
</script>

<style lang="scss" scoped>
	.info {
		.form {
			width: 80%;
			display: flex;
			margin: 30px 0 0 30px;
		}
	}
</style>
