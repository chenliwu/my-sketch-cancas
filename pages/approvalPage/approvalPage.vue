<template>
	<view>
		<button @click="toSketchCancasPage()" type="primary">进入手写审批页面</button>
		<button @click="cleanDrawComment()" type="primary">清除审批数据</button>
		
		<block v-if="drawCommentNodeHtml != null">
			<view class="uni-common-mt" style="background:transparent; padding:20rpx;">
				<rich-text style="width: 100px;height: 100px;background-color: #0A98D5;" :nodes="drawCommentNodeHtml"></rich-text>
			</view>
		</block>

	</view>
</template>

<script>

	export default {
		data() {
			return {
				drawComment: null,
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
				let html =`<div style="text-align:center;"><img style="width:100%;" height='200' src="${this.drawComment}"/></div>`;
				this.drawCommentNodeHtml = html;
			}
			
		},
		methods: {

			addSketchCancasListener: function() {
				const that = this;
				// 在uni.$on监听事件当中，无法更新页面组件。需要在onShow()方法中更新页面组件
				uni.$on('onSketchCancasComplected', function(data) {
					console.log('监听到事件来自 onSketchCancasComplected ，携带参数 msg 为：' + data.data);
					that.drawComment = data.data;
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
			
			cleanDrawComment:function(){
				this.drawCommentNodeHtml = null;
			}


			
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
