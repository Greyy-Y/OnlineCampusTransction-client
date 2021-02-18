<template>
	<div class="info">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: "UserMain",
	};
</script>

<style lang="scss" scoped>
	.info {
		width: 800px;
		background: white;
		height: 600px;
	}
</style>
