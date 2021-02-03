<template>
	<div id="app">
		<transition name="v"><router-view /></transition>
	</div>
</template>

<script>
	export default {
		components: {},
	};
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	.v-enter {
		opacity: 0.8;
	}
	.v-enter-active {
		transition: 0.5s;
	}
	.v-enter-to {
		opacity: 1;
	}
	.v-leave {
		opacity: 1;
	}
	.v-leave-to {
		opacity: 0;
	}
	.v-leave-active {
		transition: 0.5s;
	}

	//隐藏滚动条
	::-webkit-scrollbar {
		width: 0 !important;
	}
	::-webkit-scrollbar {
		width: 0 !important;
		height: 0;
	}
</style>
