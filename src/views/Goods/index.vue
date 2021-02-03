<template>
	<div class="app">
		<Navbar />
		<Menu />
		<div class="goods">
			<ProductCard />
		</div>
		<Footer />
	</div>
</template>

<script>
	import Menu from "@/components/Menu";
	import Navbar from "@/components/Navbar";
	import Footer from "@/components/Footer";
	import ProductCard from "@/components/ProductCard";
	export default {
		name: "Goods",
		components: {
			Navbar,
			Footer,
			Menu,
			ProductCard,
		},
		data() {
			return {};
		},
	};
</script>

<style lang="scss" scoped>
	.app {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.goods {
			display: flex;
		}
	}
</style>
