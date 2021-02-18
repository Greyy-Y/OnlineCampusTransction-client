<template>
	<form class="search-container" action="#">
		<input id="search-box" type="text" class="search-box" name="q" />
		<label for="search-box"><span class="iconfont icon-search"></span></label>
		<input type="submit" id="search-submit" />
	</form>
</template>

<script>
	export default {
		name: "searchBar",
		data() {
			return {
				open: false,
			};
		},
		methods: {
			handleClick() {
				this.open = true;
			},
		},
	};
</script>

<style lang="scss" scoped>
	$tl: 0.6s; // transition length

	.search-box {
		transition: width $tl, border-radius $tl, background $tl, box-shadow $tl;
		width: 40px;
		height: 40px;
		border-radius: 20px;
		border: none;
		cursor: pointer;
		background: rgb(235, 235, 235);
		& + label .search-icon {
			color: black;
		}
		&:hover {
			color: white;
			background: rgb(200, 200, 200);
			box-shadow: 0 0 0 2px rgb(61, 71, 82);
			& + label .search-icon {
				color: white;
			}
		}
		&:focus {
			transition: width $tl cubic-bezier(0, 1.22, 0.66, 1.39), border-radius $tl, background $tl;
			border: none;
			outline: none;
			box-shadow: none;
			padding-left: 15px;
			cursor: text;
			width: 300px;
			border-radius: auto;
			background: rgb(235, 235, 235);
			color: black;
			& + label .search-icon {
				color: black;
			}
		}
		&:not(:focus) {
			text-indent: -5000px;
		} // for more-graceful falling back (:not browsers likely support indent)
	}

	#search-submit {
		position: relative;
		left: -5000px;
	}

	.iconfont {
		position: relative;
		left: -32px;
		top: 2px;
		color: #264653;
		cursor: pointer;
		font-size: 1.2rem;
	}
</style>
