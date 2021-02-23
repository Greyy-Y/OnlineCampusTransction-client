<template>
	<div class="info1">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: "UserMain",
	};
</script>

<style lang="scss" scoped>
	.info1 {
		width: 850px;
		background: white;
		height: 700px;
		overflow: scroll;
	}
</style>
