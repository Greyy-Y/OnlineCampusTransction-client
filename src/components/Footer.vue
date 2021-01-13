<template>
	<footer>
		<div class="footer-left">
			About
		</div>
		<div class="footer-right">
			<span>
				created by
			</span>
			<a href="https://github.com/Greyy-Y" title="Greyy-Y">
				<el-avatar size="small" src="https://web-music.oss-cn-shenzhen.aliyuncs.com/avatar/grey.jpg"></el-avatar>
			</a>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
	footer {
		width: 100vw;
		height: 60px;
		background: #101010;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
	}
	.footer-right {
		padding: 0 50px 0 0;
		color: white;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		span {
			margin: 0 8px;
		}
	}
	.footer-left {
		padding: 0 50px;
	}
</style>
