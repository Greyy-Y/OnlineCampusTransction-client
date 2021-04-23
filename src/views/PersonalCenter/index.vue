<template>
	<div id="personal-center-wrapper">
		<Navbar />
		<div class="personal-center-container">
			<div class="personal-center">
				<UserNav />
				<UserMain />
			</div>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Footer from "@/components/Footer";
	import Navbar from "@/components/Navbar";
	import UserMain from "./Components/Main";
	import UserNav from "./Components/Nav";
	export default {
		components: {
			UserMain,
			UserNav,
			Footer,
			Navbar,
		},
	};
</script>

<style lang="scss" scoped>
	#personal-center-wrapper {
		width: 100%;
		.personal-center-container {
			background: #f7f7f7;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.personal-center {
			width: 1200px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 20px 0;
		}
	}
</style>
