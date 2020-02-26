<template>
	<view>
		<button @click="toSketchCancasPage()" type="primary">进入手写审批页面</button>
		<view class="handCenter" style="display: flex;flex:1;width: 100%;height: 200px;">
			<canvas id="showImgCancas" style="width: 100vh;height: 100vh;" disable-scroll="true" canvas-id="showImgCancas"></canvas>
		</view>

		<block v-if="drawCommentImagePath != null">
			<image id="showImgElement" style="border: 1px solid #2C405A;background:#BBBBBB;" crossOrigin="*" src="drawCommentImagePath"></image>
		</block>



		<block v-if="drawCommentImagePath != null">
			<view class="uni-common-mt" style="background:transparent; padding:20rpx;">
				<rich-text :nodes="drawCommentNodeHtml"></rich-text>
			</view>
		</block>

	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../static/js/image-tools.js'


	export default {
		data() {
			return {
				drawComment: null,
				drawCommentImagePath: null,
				cancasElementHeight: 200,

				drawCommentNodeHtml: null,
			}
		},
		onReady() {
			this.addSketchCancasListener();
		},
		onUnload() {
			uni.$off();
		},
		onShow() {
			console.log("onShow");
			if (this.drawComment) {
				// this.base64StringToCancas(this.drawComment);
				// const showImgElement = document.getElementById("showImgElement");
				// if (showImgElement && (showImgElement.complete || showImgElement.complete === undefined)) {
				// 	showImgElement.crossOrigin = "Anonymous";
				// 	showImgElement.src = this.drawComment;
				// }

				let html =`<div style="text-align:center;"><img width='200' height='200' src="${this.drawComment}"/></div>`;
				this.drawCommentNodeHtml = html;


			}
			if (this.drawCommentImagePath) {
				// let html = `<div style="text-align:center;">测试<img width='200' height='200' src="${this.drawCommentImagePath}"/></div>`;
				// this.drawCommentNodeHtml = html;
			}

		},
		methods: {

			addSketchCancasListener: function() {
				const that = this;
				// 在uni.$on监听事件当中，无法更新页面组件。需要在onShow()方法中更新页面组件
				uni.$on('onSketchCancasComplected', function(data) {
					// console.log('监听到事件来自 onSketchCancasComplected ，携带参数 msg 为：' + data.data);
					that.drawComment = data.data;

					base64ToPath(data.data)
						.then(path => {
							console.log(path);
							that.drawCommentImagePath = path;
						})
						.catch(error => {
							console.error(error);
						})
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
				console.log("base64String", base64String);
				if (base64String) {
					const context = uni.createCanvasContext('showImgCancas');
					// dWidth 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放
					// dHeight 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放
					let dWidth = 300;
					let dHeight = 300;
					const {
						windowWidth,
						windowHeight
					} = uni.getSystemInfoSync();
					dWidth = windowWidth - 50;
					dHeight = this.cancasElementHeight;
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
