<template>
	<div class="home">
		<Navbar />
		<Main />
		<Footer />
		<!-- <Menu /> -->
	</div>
</template>

<script>
	// @ is an alias to /src
	import Navbar from "@/components/Navbar";
	import Main from "@/components/Main";
	import Footer from "@/components/Footer";
	// import Menu from "@/components/menuContent";
	export default {
		name: "Index",
		components: {
			Navbar,
			Main,
			Footer,
			// Menu,
		},
	};
</script>
<style lang="scss" scoped></style>
