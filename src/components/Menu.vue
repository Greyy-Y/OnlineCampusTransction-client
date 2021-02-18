<template>
	<div class="container">
		<div class="menu" @mouseleave="removeActiveMenu()">
			<div class="item" v-for="(item, index) in cate" :key="index" @mouseover="addActiveMenu(item)">
				<span>{{ item.name }}</span>
				<i class="iconfont icon-you"></i>
			</div>
		</div>
		<div class="banner">
			<div class="block">
				<el-carousel trigger="click" height="370px">
					<el-carousel-item v-for="(item, index) in banner" :key="index">
						<img :src="item.pic" />
					</el-carousel-item>
				</el-carousel>
			</div>
			<div class="subMenu" v-show="this.in" @mouseover="addActiveSub()" @mouseout="removeActiveSub()">
				<el-divider class="divider">{{ cateName }}</el-divider>
				<div class="subCate-container">
					<div class="subCate" v-for="(item, index) in subCate" :key="index" @click="findByCate(item)">
						<img src="../assets/defalult-avtar.jpg" />
						<a>{{ item.subName }}</a>
					</div>
				</div>
			</div>
			<div class="order-container">
				<div class="order-tag">
					<el-tag
						v-for="(tag, index) in tags"
						:key="index"
						type="success"
						size="mini"
						closable
						@close="handleClose(tag)"
					>
						{{ tag }}
					</el-tag>
				</div>
				<div class="order">
					<div
						class="item"
						v-for="(item, index) in order"
						:key="index"
						:class="isActiveOrder == index ? 'active' : ''"
						@click="handlePick(index)"
					>
						<span>{{ item }} </span>
						<i
							v-if="isActiveOrder == index ? true : false"
							:class="orderStatus ? 'el-icon-top' : 'el-icon-bottom'"
							@click="changeOrderStauts"
						></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetCate } from "@/api/categories";
	export default {
		data() {
			return {
				//鼠标是否在菜单内
				inMenu: false,
				inSubMenu: false,
				// 存放从后台获得的数据
				cateName: "",
				subCate: [],
				cate: [],
				banner: [
					{
						pic: "http://localhost:3000/uploads/workhard.jpg",
					},
					{
						pic: "http://localhost:3000/uploads/green.jpg",
					},
					{
						pic: "http://localhost:3000/uploads/996.jpeg",
					},
				],
				// 搜索标签
				tags: [],
				// 商品排序
				order: ["时间", "价格", "浏览量"],
				isActiveOrder: 0,
				orderStatus: true,
			};
		},
		methods: {
			// 鼠标悬浮在菜单触发 添加事件
			addActiveMenu(item) {
				this.cateName = item.name;
				this.subCate = item.subCate;
				this.inMenu = true;
			},
			addActiveSub() {
				this.inSubMenu = true;
			},
			removeActiveMenu() {
				setTimeout(() => {
					this.inMenu = false;
				}, 10);
			},
			removeActiveSub() {
				this.inSubMenu = false;
			},

			// 获取组件所需数据
			async getCate() {
				const res = await GetCate();

				this.cate = res.data;
			},

			findByCate(item) {
				if (this.tags.includes(item.subName)) {
					return;
				}
				this.tags.push(item.subName);
			},
			// 标签关闭移除该标签
			handleClose(tag) {
				this.tags.splice(this.tags.indexOf(tag), 1);
			},
			// 点击排序
			handlePick(index) {
				this.isActiveOrder = index;
			},
			// 更改排序状态（升序，降序）
			changeOrderStauts() {
				this.orderStatus = !this.orderStatus;
			},
		},
		computed: {
			in() {
				return this.inMenu || this.inSubMenu;
			},
		},
		mounted: function() {
			this.getCate();
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		width: 80vw;
		margin: 30px 0 10px 0;
		.menu {
			min-width: 120px;
			width: 160px;
			height: 440px;
			background: #264653;
			box-shadow: -2px 4px 10px #7a7a7a;
			border-radius: 10px 0 0 10px;
			color: #acacac;
			overflow: scroll;
			.item {
				list-style: none;
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				padding: 14px 0;
				padding-left: 4px;
				cursor: pointer;
				i {
					padding-left: 20px;
					font-size: 8px;
				}
			}
			.item:hover {
				background: rgb(255, 255, 255);
				opacity: 0.5;
			}
		}
		.banner {
			box-shadow: 2px 2px 10px #7a7a7a;
			position: relative;
			width: 1100px;
			display: flex;
			flex-direction: column;
			img {
				width: 1100px;
				height: 370px;
				object-fit: fill;
			}
			.order-container {
				width: 1100px;
				height: 70px;
				display: flex;
				flex-direction: column;
				.order-tag {
					margin: 8px 10px;
					height: 20px;
					display: flex;
					justify-content: flex-start;
					.el-tag {
						margin: 0 10px;
					}
				}
				.order {
					display: flex;
					align-items: center;
					justify-content: center;
					.item {
						margin: 0 20px;
						span {
							cursor: pointer;
						}
						i {
							cursor: pointer;
						}
					}
					.active {
						color: #2a9d8f;
					}
				}
			}
		}
		.subMenu {
			height: 440px;
			width: 600px;
			background: #f1f1f1;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			.el-divider__text {
				font-size: 20px;
			}
			.subCate-container {
				display: flex;
				flex-wrap: wrap;
				.subCate {
					width: 90px;
					height: 90px;
					margin: 8px 8px;
					cursor: pointer;
					a {
						display: block;
					}
					a:hover {
						color: #2a9d8f;
					}
					img {
						width: 60px;
						height: 60px;
					}
				}
			}
		}
	}
</style>
