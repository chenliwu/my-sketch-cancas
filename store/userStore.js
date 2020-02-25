
const userStore = {
	//namespaced: true,
	state:{
		hasLogin:false,
		accessToken:null,
		user:{
			username:null,
			loginName:null,
			password:null,
		},
	},
	
	getters:{
		// getter方法接收参数
		hasLogin:(state)=>(params)=> {
			console.log('userStore.getters.hasLogin');
			console.log('userStore.getters.hasLogin.params:',params);
			return state.hasLogin;
		}
	},
	
	mutations:{
	
		login(state,provider){
			console.log('userStore.login,state:',state);
			console.log('userStore.login,provider:',provider);
			state.hasLogin = true;
			state.accessToken = "accessToken";
			state.user = {
				username:'chenlw',
				loginName:'chenlw',
				password:'password',
			};
		},
		logout(state,provider){
			state.hasLogin = false;
			state.accessToken = null;
			state.user = {};
		}
	},
	actions:{
		
	}
	
	
};

export default userStore;