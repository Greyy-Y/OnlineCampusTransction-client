<template>
	<div class="mycart-wrapper">
		<div class="empty" v-if="!this.$store.getters.getCartLen">
			<img src="../../../assets/img/nogood.png" alt="" />
			<span>购物车空空如也~</span> <el-button @click="toGoods">现在选购</el-button>
		</div>
		<div class="cart" v-else>
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
					<el-table-column label="商品信息" width="480" show-overflow-tooltip>
						<template slot-scope="scope">
							<div class="good-info">
								<img :src="baseUrl + scope.row.good.pic" /><span>{{ scope.row.good.name }}</span>
							</div></template
						>
					</el-table-column>
					<el-table-column label="单价/￥" width="80" align="center"
						><template slot-scope="scope">{{ scope.row.good.price }}</template>
					</el-table-column>
					<el-table-column label="数量" width="160" align="center">
						<template slot-scope="scope">
							<el-input-number
								v-model="scope.row.count"
								@change="handleChange(scope.row)"
								:min="1"
								:max="scope.row.good.count"
								label="数量"
								size="mini"
								:disabled="scope.row.disableNumberCount"
							></el-input-number
						></template>
					</el-table-column>
					<el-table-column label="小计/￥" show-overflow-tooltip width="100" align="center"
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
					<span @click="emptyCart">清空购物车</span>
				</div>
				<div class="total">
					<div class="slected">
						已选择<span>{{ this.multipleSelection.length }}</span> 种商品
					</div>
					<div class="total-count">
						共计<span>{{ this.selectCount }}</span
						>件商品
					</div>
					<div class="total-price">
						总计：<span>{{ this.total }}￥</span>
					</div>
				</div>
				<div class="settle">
					<el-button type="primary" @click="handleSubmitOrder">结算</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetMyCart, RemoveGoodFromCart, RemoveGoodsFromCart, UpdateMyCart, EmptyMyCart } from "@/api/user";
	export default {
		data() {
			return {
				myCart: [],
				newMyCart: [],
				baseUrl: "http://localhost:3000/",
				selectCount: "",
				total: "",
				//选中的商品
				multipleSelection: [],
			};
		},
		methods: {
			// 选择事件---禁用计数器
			handleSelect(selection, row) {
				row.disableNumberCount = !row.disableNumberCount;
			},
			async getMyCart() {
				let data = {
					uid: this.$store.state.userID,
				};
				const res = await GetMyCart(data);
				this.myCart = res.data.data[0].cart;
				this.myCart.map((v) => {
					v.disableNumberCount = false;
				});
			},
			// 清空购物车
			emptyCart() {
				this.$confirm("确认清空购物车?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				})
					.then(() => {
						EmptyMyCart({ uid: this.$store.state.userID });
						this.myCart = [];
						this.$store.commit("emptyMyCart");
						this.$message({
							type: "success",
							message: "删除成功!",
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除",
						});
					});
			},
			// 删除选中商品;
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
				// 更新vuex购物车
				this.getMyCart().then(() => {
					this.$store.commit("setMyCart", { cart: this.myCart });
				});
				//
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
			// 处理计数器变化
			async handleChange(row) {
				console.log(row);
				let data = {
					goodId: row.good._id,
					uid: this.$store.state.userID,
					count: row.count,
				};
				// 更新购物车
				await UpdateMyCart(data);
				this.getMyCart().then(() => {
					this.$store.commit("setMyCart", { cart: this.myCart });
				});
			},
			async handleSubmitOrder() {
				if (this.multipleSelection.length == 0) {
					this.$message({
						type: "warning",
						message: "请选择商品！",
					});
					return;
				}
				// 从购物车中移除选择的商品
				console.log(this.multipleSelection);
				let toDeleteOid = this.multipleSelection.map((v) => {
					return v.good._id;
				});
				let data = {
					uid: this.$store.state.userID,
					goodId: toDeleteOid,
				};
				await RemoveGoodFromCart(data);
				// 更新vuex购物车
				this.getMyCart().then(() => {
					this.$store.commit("setMyCart", { cart: this.myCart });
				});
				// 跳转到订单页面;
				this.$router.push({ name: "CreateOrder", params: { order: this.multipleSelection } });
			},
			toGoods() {
				this.$router.push("/goods");
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
			/*
				可以使用深度监听监听对象内值的变化
				处理函数改为，handler，同时开启deep 属性
				multipleSelection: {
					handler: function(newData, oldData) {
						console.log(newData);
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
				 */
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
		.mycart-bottom {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			.clear {
				font-size: 0.6rem;
				color: #93999f;
				span {
					margin: 0 10px;
					cursor: pointer;
				}
			}
			.total {
				display: flex;
				margin-left: 100px;
				align-items: center;
				justify-content: space-evenly;
				color: #93999f;
				.slected {
					margin: 0 10px;
					padding: 0 10px;
					border-right: #93999f 1px solid;
				}
				.total-count {
					margin: 0 10px;
					padding: 0 10px;
					border-right: #93999f 1px solid;
				}
				.total-price {
					margin: 0 10px;
				}
				span {
					margin: 0 5px;
					color: #2a9d8f;
					font-weight: 600;
				}
			}
			.settle {
				margin-left: 100px;
			}
		}
		.empty {
			margin: 20px 0;
			display: flex;
			flex-direction: column;
			span {
				margin: 10px 0;
				color: #93999f;
			}
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
