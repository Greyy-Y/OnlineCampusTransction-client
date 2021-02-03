<template>
	<div class="home">
		<Navbar />
		<IndexMain class="banner" />
		<Footer />
		<!-- <Menu /> -->
	</div>
</template>

<script>
	// @ is an alias to /src

	import IndexMain from "@/components/IndexMain";
	import Navbar from "@/components/Navbar";
	import Footer from "@/components/Footer";
	// import Menu from "@/components/menuContent";

	export default {
		name: "Index",
		components: {
			IndexMain,
			Navbar,
			Footer,
			// Menu,
		},
		data() {
			return {};
		},
	};
</script>
<style lang="scss" scoped>
	.home {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
	}
</style>
