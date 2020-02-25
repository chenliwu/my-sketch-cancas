
const todoApproveStore = {
	state:{
		approveItem:{
			name:'todoApproveStore的approveItem'
		},
		approveIsFinished:false,
	},
	getters:{
		getApprotem:function(state,params){
			console.log('todoApproveStore.getApprotem.params:',params);
			return state.approveItem;
		},
		hasLogin(state){
			console.log('todoApproveStore.userStore.getters.hasLogin');
			return state.hasLogin;
		}
	},
	mutations:{
		
	},
	actions:{
		
	}
}

export default todoApproveStore;