<template>
	<div class="mycart-wrapper">
		<div class="" v-if="!this.$store.state.myCart.length">您的购物车空空如也</div>
		<div class="" v-else>
			<div class="mycart-box">
				<el-table
					ref="multipleTable"
					:data="newMyCart"
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="handleSelectionChange"
					@select="handleSelect"
				>
					<el-table-column type="selection" width="50"> </el-table-column>
					<el-table-column label="商品信息" width="330" show-overflow-tooltip>
						<template slot-scope="scope">
							<div class="good-info">
								<img :src="scope.row.good.pic" /><span>{{ scope.row.good.name }}</span>
							</div></template
						>
					</el-table-column>
					<el-table-column label="单价/￥" width="80"
						><template slot-scope="scope">{{ scope.row.good.price }}</template>
					</el-table-column>
					<el-table-column label="数量" width="160">
						<template slot-scope="scope">
							<el-input-number
								v-model="scope.row.count"
								@change="handleChange"
								:min="1"
								:max="scope.row.good.count"
								label="数量"
								size="mini"
								:disabled="scope.row.disableNumberCount"
							></el-input-number
						></template>
					</el-table-column>
					<el-table-column label="小计/￥" show-overflow-tooltip width="80"
						><template slot-scope="scope">{{ scope.row.count * scope.row.good.price }}</template>
					</el-table-column>
					<el-table-column label="操作" overflow>
						<template slot-scope="scope"
							><el-button
								size="mini"
								icon="el-icon-delete"
								circle
								@click="handleRemoveGoodFromCart(scope.row.good._id)"
							></el-button
						></template>
					</el-table-column>
				</el-table>
			</div>
			<div class="mycart-bottom">
				<div class="clear">
					<span>删除选中商品</span>
					<span>清空购物车</span>
				</div>
				<div class="total">
					<span>共计{{ this.selectCount }}件商品</span>
					<span>已选择种{{ this.multipleSelection.length }}商品</span>
					<span>总计{{ this.total }}元</span>
				</div>
				<div class="settle">
					<el-button type="primary">现在结算</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetMyCart, RemoveGoodFromCart } from "@/api/user";
	export default {
		data() {
			return {
				myCart: [],
				newMyCart: [],
				//选中的商品
				multipleSelection: [],
				selectCount: "",
				total: "",
			};
		},

		methods: {
			// 选择事件
			handleSelect(row) {
				// 修改计数器状态
				console.log(row);
				// if (row.length === 0) {
				// }
				// row.map((v) => (v.disableNumberCount = !v.disableNumberCount));
			},
			async getMyCart() {
				let data = {
					uid: this.$store.state.userID,
				};
				const res = await GetMyCart(data);
				this.myCart = res.data.data[0].cart;
				this.myCart.map((v) => {
					v.good.pic = `http://localhost:3000/${v.good.pic}`;
					v.disableNumberCount = false;
				});
			},
			async handleRemoveGoodFromCart(gid) {
				let data = {
					uid: this.$store.state.userID,
					goodId: gid,
				};
				const res = await RemoveGoodFromCart(data);
				if (res.status === 200) {
					this.$message({
						type: "success",
						message: "成功删除该商品！",
					});
				}
				this.getMyCart();
			},
			// 表格
			toggleSelection(rows) {
				if (rows) {
					rows.forEach((row) => {
						this.$refs.multipleTable.toggleRowSelection(row);
						console.log(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			toggleRowSelection(row, selected) {
				console.log(row, selected);
			},
			// 计数器
			handleChange(value) {
				console.log(value);
			},
		},

		mounted: function() {
			this.getMyCart();
		},
		watch: {
			myCart(newData) {
				this.newMyCart = newData;
			},
			multipleSelection(newData) {
				this.selectCount = 0;
				this.total = 0;
				for (let index = 0; index < newData.length; index++) {
					const element = newData[index];
					this.selectCount += element.count;
					this.total += element.count * element.good.price;
				}
			},
			deep: true,
		},
	};
</script>

<style lang="scss" scoped>
	.mycart-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.mycart-box {
			width: 96%;
			margin: 20px 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.cell {
				display: flex;
				img {
					width: 100px;
					height: 100px;
					object-fit: contain;
					display: block;
				}
				span {
					font-weight: 600;
					display: block;
					margin-left: 20px;
				}
				.good-info {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}
		}
	}
</style>
