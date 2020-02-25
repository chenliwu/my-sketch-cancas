<template>
	<view>
		<button @click="toSketchCancasPage()" type="primary">进入手写审批页面</button>
		<view class="handCenter" style="display: flex;flex:1;width: 100%;">
			<canvas id="showImgCancas" style="width: 100vh;height: 100vh;" disable-scroll="true" canvas-id="showImgCancas"></canvas>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drawComment:null,
			}
		},
		onReady() {
			this.addSketchCancasListener();
		},
		onUnload(){
			uni.$off();	
		},
		onShow() {
			console.log("onShow");
			if(this.drawComment){
				this.base64StringToCancas(this.drawComment);
			}
		},
		methods: {

			addSketchCancasListener: function() {
				const that = this;
				// 在uni.$on监听事件当中，无法更新页面组件。需要在onShow()方法中更新页面组件
				uni.$on('onSketchCancasComplected', function(data) {
					// console.log('监听到事件来自 onSketchCancasComplected ，携带参数 msg 为：' + data.data);
					that.drawComment = data.data;
					// that.base64StringToCancas(data.data);
				})
			},

			toSketchCancasPage: function() {
				uni.navigateTo({
					url: '../sketchCancasPage/sketchCancasPage',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			

			/**
			 * 将base64字符串显示到canvas组件上
			 * @param {Object} base64String
			 */
			base64StringToCancas: function(base64String) {
				console.log("base64String",base64String);
				if(base64String){
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
				}
			},
		}
	}
</script>

<style>
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
</style>
