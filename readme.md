
# 通过代码注释与excel表实现自动埋点的babel插件

## 安装

```javascript
npm i babel-plugin-autoBuriedPoin
```
```javascript
yarn add babel-plugin-autoBuriedPoin
```

### 使用
#### 配置
```javascript
const path = require("path");

module.exports = {
	...
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: [
						"@babel/preset-env"
					],
					plugins: [
						[
							path.resolve(__dirname, "../src/index.js"),
							{
								xlsxPath: path.resolve(__dirname, "../buried.xlsx"),
								func: `
							function(category, action) {
								console.log(category,action);
								window._hmt && window._hmt.push(["_trackEvent", category, action]);
							};
							`,
								script: "https://test.js"
							}
						]
					]
				}
			}
		]
	}
};
```
参数说明

|   参数   |            值            |
| :------: | :----------------------: |
| xlsxPath |     Excel的绝对路径      |
|   func   | 一个字符串形式的匿名函数 |
|  script  |  需要加入的script的src   |



### 如何注释

注释应遵守如下规范

```
// buried-[id]
```

以`buried`开头的注释就可以被此插件捕获到，id与Excel表上id字段对应



#### Excel表

Excel表应遵守如下格式

https://www.yuque.com/docs/share/32498aca-6ff6-48f6-8335-a8eb5913392e?# 《Excel表格式》

| 事件 |    id    |    属性    |                            属性值                            |
| :--: | :------: | :--------: | :----------------------------------------------------------: |
| xxx  | 唯一标识 | 对应的操作 | 这里暂时可放两个参数，参数中前面为#即为变量，若不带#即为字符串 |



### 背景

背景：当我们需要获取用户的访问量，新老用户各多少，等数据时，可以后端做，也可以前端做。前端做的话，需要埋点获取数据，完了还要把数据处理好，做成可视化，费时费力。于是就有“百度统计”这样的统计数据可视化平台。但“百度统计”使用时，需要在项目中引入对应的script文件。
### 功能作用

此插件不用那样，此插件会帮助您自动引入，只需要给plugin配置`script`参数即可。

此插件会将func挂载到`window` 上，随时可以在项目中调用

作用：我们埋点时，一般需要手动操作，当需要埋点的位置很多时，将非常浪费时间。而使用了我们插件后，只需使用注释，加excel表，就可以实现埋点。因为此插件在每次编译时，会自动将`func`与`id`对应的参数结合起来，在项目中对应的位置执行`func`，且传入与注释中id相对应的参数。

