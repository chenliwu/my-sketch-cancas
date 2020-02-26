<template>
	<view style="display: flex;flex:1;" class="wrap">

		<view class="handCenter" style="display: flex;flex:1;height: 80vh;width: 100%;">
			<!-- 透明的 canvas-->
			<canvas id="myCanvas" class="myCanvas" disable-scroll="true" data-id="0" @touchstart="penStart" @touchmove="penMove"
			 @touchend="penEnd" canvas-id="myCanvas"></canvas>
		</view>

		<view class="uni-flex uni-row" style="justify-content: center;align-items: center;">

			<view class="uni-flex uni-row color">
				<block v-for="i in colorArr" :key="i.color">
					<view :class="{colorSelection:i.active}">
						<view @click="updateColor(i.color)" :style="{background: i.color}"></view>
					</view>
				</block>
			</view>
			<view class="uni-flex uni-row" style="justify-content: center;">
				<button plain="true" style="margin: 5px;" @click="retDraw" type="default">清除</button>
				<button plain="true" style="margin: 5px;" @click="saveCanvasData" type="primary">确定</button>
			</view>

		</view>

	</view>
</template>

<script>
	import Mycanvas from "../../static/js/handwriting.js";
	export default {
		data() {
			return {
				canvasOperateObject: {},

				close: true,
				open: true,
				colorArr: [
					//画笔颜色
					{
						color: "#ff0000",
						active: false
					},
					{
						color: "#1c9d02",
						active: false
					},
					{
						color: "#000000",
						active: true
					},
					{
						color: "#006ce6",
						active: false
					},
					{
						color: "#efaa03",
						active: false
					}
				],
				thickness: [
					//画笔粗细
					{
						thickness: 10,
						active: false
					},
					{
						thickness: 20,
						active: false
					},
					{
						thickness: 30,
						active: false
					},
					{
						thickness: 40,
						active: false
					},
					{
						thickness: 50,
						active: true
					}
				],



			};
		},
		onReady() {

			// 创建canvas实例
			this.canvasOperateObject = new Mycanvas({
				lineColor: this.lineColor,
				lineSise: this.lineSise,
				canvasName: "myCanvas",
			});
			this.updateThickness(40);
		},

		computed: {
			//颜色
			lineColor: {
				get() {
					let [color] = this.colorArr.filter(i => i.active);
					return color.color;
				}
			},
			//粗细
			lineSise: {
				get() {
					let [thicknes] = this.thickness.filter(i => i.active);
					return thicknes.thickness;
				}
			}
		},
		methods: {
			getWindowWidth() {
				return uni.getSystemInfoSync().width;
			},
			getWindowHeight() {
				return uni.getSystemInfoSync().height;
			},

			//计算宽
			widths(imgWidth) {
				const res = uni.getSystemInfoSync();
				//屏幕宽
				if (res.windowWidth * 0.95 <= imgWidth) {
					return res.windowWidth * 0.95; //rpx
				} else {
					return imgWidth;
				}
			},
			//计算高
			heights(imgHeight, imgWidth) {
				const res = uni.getSystemInfoSync();
				if (res.windowWidth * 0.95 <= imgWidth) {
					let b = (res.windowWidth * 0.95) / imgWidth;
					return b * imgHeight;
				} else {
					return imgHeight;
				}
			},
			// 笔迹粗细滑块
			updateThickness(value) {

				this.canvasOperateObject.selectSlideValue(value);
				this.thickness.map(i => {
					if (i.thickness == value) {
						i.active = true;
					} else {
						i.active = false;
					}
					return i;
				});
			},
			// 选择画笔颜色
			updateColor(color) {

				this.canvasOperateObject.selectColorEvent(color);
				this.colorArr.map(i => {
					if (i.color == color) {
						i.active = true;
					} else {
						i.active = false;
					}
					return i;
				});
			},
			// 清除画布
			retDraw() {

				this.canvasOperateObject.retDraw();
				this.cancasImageBase64 = null;
			},
			// 笔迹开始
			penStart(event) {
				this.canvasOperateObject.penStart(event);
			},
			// 笔迹移动
			penMove(event) {
				this.canvasOperateObject.penMove(event);
			},
			// 笔迹结束
			penEnd(event) {
				this.canvasOperateObject.penEnd(event);
			},
			// 保存涂鸦的图片
			async saveCanvasData() {
				
				if(!this.canvasOperateObject.isHaveDrawData()){
					uni.showModal({
						title: '温馨提示',
						content: '您还未绘画批签！',
						showCancel: false
					});
					return ;
				}
				
				const data = await this.canvasOperateObject.saveCanvas();
				// console.log(data);
				this.base64StringToCancas(data);
				uni.$emit('onSketchCancasComplected', {
					data: data
				});
				uni.navigateBack({
					delta: 1
				});
			},

			imageError: function(error) {
				console.log("imageError", error);
			},

			/**
			 * 将base64字符串显示到canvas组件上
			 * @param {Object} base64String
			 */
			base64StringToCancas: function(base64String) {
				const context = uni.createCanvasContext('showImgCancas');
				// dWidth 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
				// dHeight 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
				let dWidth = 300;
				let dHeight = 300;
				const {
					windowWidth,
					windowHeight
				} = uni.getSystemInfoSync();
				context.drawImage(base64String, 0, 0, dWidth, dHeight);
				context.draw();
			},



		}
	};
</script>

<style lang="scss" scoped>
	.colorSelection {
		background: #ccc;
	}

	.color {
		display: flex;

		.colorSelection {
			background: #ccc;
		}

		>view {
			background: #fff;
			padding: 15rpx 30rpx;

			>view {
				width: 35rpx;
				height: 35rpx;
				border-radius: 50%;
			}
		}
	}

	.wrap {
		width: 100%;
		height: 100%;
		margin: 30upx 0;
		overflow: hidden;
		display: flex;
		align-content: center;
		flex-direction: column;
		justify-content: center;
		font-size: 28upx;

		.marking-tag2 {
			position: fixed;
			right: 0;
			z-index: 10;
			bottom: 280rpx;
			background-color: #fff;
			padding: 5rpx 10rpx;
		}

		.marking-tag3 {
			position: fixed;
			right: 0;
			bottom: 210rpx;
			z-index: 10;

			.Erase {
				display: flex;
				justify-content: space-between;
				background: #fff;

				>view {
					padding: 15rpx 0;
					text-align: center;
					flex-grow: 1;
				}
			}

			.color {
				display: flex;

				.colorSelection {
					background: #ccc;
				}

				>view {
					background: #fff;
					padding: 15rpx 30rpx;

					>view {
						width: 25rpx;
						height: 25rpx;
						border-radius: 50%;
					}
				}
			}

			.thickness {
				display: flex;
				justify-content: space-between;
				background: #fff;
				position: relative;

				>view {
					flex-grow: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 20rpx 0;

					>view {
						width: 40rpx;
						background: #666;
					}
				}

				.marking-tag4 {
					position: absolute;
					background: #fff;
					left: 0;
					padding: 5rpx 15rpx;
					transform: translateX(-100%);
				}
			}
		}

		.wrap-head {
			display: flex;
			padding: 0 5rpx;
			justify-content: center;

			.wrap-head-close {
				background: #8799a3;
			}

			text {
				background-color: #39b54a;
				color: white;
				border-radius: 5upx;
				font-size: 30rpx;
				padding: 10rpx 15rpx;
				margin: 15rpx;
			}
		}

		.myCanvas {
			// background: transparent;
			width: 100%;
			height: 100%;
		}

		.handCenter {
			border: 4upx dashed #e9e9e9;
			flex: 5;
			overflow: hidden;
			background: transparent;
			box-sizing: border-box;
			max-width: 95%;
			margin: 5rpx auto;
			position: relative;
			z-index: 2;
		}

		.wrap-index {
			position: absolute;
			z-index: 10;
			top: 0;
			background-color: transparent;
		}
	}
</style>
