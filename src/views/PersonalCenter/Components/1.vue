<div class="mycart-wrapper">
		<div class="mycart-box">
			<el-table
				ref="multipleTable"
				:data="newMyCart"
				tooltip-effect="dark"
				style="width: 100%"
				@selection-change="handleSelectionChange"
				@select="handleSelect"
			>
				<el-table-column type="selection" width="50"> </el-table-column>
				<el-table-column label="商品信息" width="330" show-overflow-tooltip>
					<template slot-scope="scope">
						<div class="good-info">
							<img :src="scope.row.good.pic" /><span>{{ scope.row.good.name }}</span>
						</div></template
					>
				</el-table-column>
				<el-table-column label="单价/￥" width="80"
					><template slot-scope="scope">{{ scope.row.good.price }}</template>
				</el-table-column>
				<el-table-column label="数量" width="160">
					<template slot-scope="scope">
						<el-input-number
							v-model="scope.row.count"
							@change="handleChange"
							:min="1"
							:max="scope.row.good.count"
							label="数量"
							size="mini"
							:disabled="scope.row.disableNumberCount ? true : false"
						></el-input-number
					></template>
				</el-table-column>
				<el-table-column label="小计/￥" show-overflow-tooltip width="80"
					><template slot-scope="scope">{{ scope.row.count * scope.row.good.price }}</template>
				</el-table-column>
				<el-table-column label="操作" overflow>
					<template slot-scope="scope"
						><el-button
							size="mini"
							icon="el-icon-delete"
							circle
							@click="handleRemoveGoodFromCart(scope.row.good._id)"
						></el-button
					></template>
				</el-table-column>
			</el-table>
		</div>
		<div class="mycart-bottom">
			<div class="clear">
				<span>删除选中商品</span>
				<span>清空购物车</span>
			</div>
			<div class="total">
				<span>共计{{ this.selectCount }}件商品</span>
				<span>已选择种{{ this.multipleSelection.length }}商品</span>
			</div>
		</div>
	</div>