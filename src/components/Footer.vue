<template>
	<footer>
		<div class="footer-about">
			<h3>关于</h3>
			<div class="footer-about-content">
				<span>来自灰柴嘻嘻</span
				><a href="https://github.com/Greyy-Y" title="Greyy-Y">
					<el-avatar size="small" src="https://web-music.oss-cn-shenzhen.aliyuncs.com/avatar/grey.jpg"></el-avatar>
				</a>
			</div>
		</div>
		<div class="footer-rights">
			<h3>版权声明</h3>
			<div class="footer-rights-content">
				Copy Right @All rights reserved
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
	footer {
		margin: 5px 0;
		width: 100vw;
		height: 120px;
		background: black;
		display: flex;
		justify-content: space-around;
		color: #9b9dad;
	}
	.footer-about {
		.footer-about-content {
			font-size: 12px;
			display: flex;
			align-items: center;
			justify-items: center;
		}
		a {
			transform: translateY(5px);
			padding-left: 5px;
		}
	}
	.footer-rights {
		.footer-rights-content {
			padding: 5px 0;
			font-size: 12px;
			width: 300px;
		}
	}
</style>
