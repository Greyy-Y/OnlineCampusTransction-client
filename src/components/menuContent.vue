<template>
	<div class="menu-content">
		<!-- <div class="item" v-for="item in menu" :key="item.index">
			<span>{{ item.name }}</span>
		</div> -->
		<div class="item1">
			<span>数码产品1</span>
		</div>

		<div class="item1">
			<span>数码产品2</span>
		</div>
		<div class="item1">
			<span>数码产品3</span>
		</div>
		<div class="item1">
			<span>数码产品4</span>
		</div>
		<div class="item1">
			<span>数码产品5</span>
		</div>
		<div class="item1">
			<span>数码产品6</span>
		</div>
		<div class="item1">
			<span>数码产品7</span>
		</div>
		<div class="item1">
			<span>数码产品8</span>
		</div>
		<div class="item1">
			<span>数码产品9</span>
		</div>
		<div class="item1">
			<span>数码产品10</span>
		</div>
		<div class="item1">
			<span>数码产品11</span>
		</div>
		<div class="item1">
			<span>数码产品12</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "MenuContent",
		data() {
			return {
				menu: [
					{
						name: "数码产品",
						include: ["手机", "平板", "笔记本", "耳机", "手表手环", "路由器", "单反摄像机"],
					},
					{
						name: "书籍教材",
						include: ["教科书", "文学", "小说", "动漫"],
					},
					{
						name: "数码产品",
						include: ["手机", "平板", "笔记本", "耳机", "手表手环", "路由器", "单反摄像机"],
					},
					{
						name: "数码产品",
						include: ["手机", "平板", "笔记本", "耳机", "手表手环", "路由器", "单反摄像机"],
					},
					{
						name: "数码产品",
						include: ["手机", "平板", "笔记本", "耳机", "手表手环", "路由器", "单反摄像机"],
					},
					{
						name: "数码产品",
						include: ["手机", "平板", "笔记本", "耳机", "手表手环", "路由器", "单反摄像机"],
					},
					{
						name: "数码产品",
						include: ["手机", "平板", "笔记本", "耳机", "手表手环", "路由器", "单反摄像机"],
					},
					{
						name: "数码产品",
						include: ["手机", "平板", "笔记本", "耳机", "手表手环", "路由器", "单反摄像机"],
					},
					{
						name: "数码产品",
						include: ["手机", "平板", "笔记本", "耳机", "手表手环", "路由器", "单反摄像机"],
					},
					{
						name: "数码产品",
						include: ["手机", "平板", "笔记本", "耳机", "手表手环", "路由器", "单反摄像机"],
					},
				],
			};
		},
	};
</script>

<style scoped lang="scss">
	.menu-content {
		width: 180px;
		height: 440px;
		color: whitesmoke;
		background-color: #264653;
		overflow: hidden;
		display: flex;
		flex-direction: column-reverse;
		.item1 {
			height: 50px;
			margin: 10px;
		}
	}
</style>
