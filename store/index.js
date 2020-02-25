import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const moduleA = {
	state: {
		count: 3
	},
	mutations: {
		increment(state) {
			console.log("mutations.increment");
			// 变更状态
			state.count++
		}
	},
	/**
	 * 分发 Action
	 * Action 通过 store.dispatch 方法触发：
	 */
	actions: {
		increment(context) {
			console.log("actions.increment");
			context.commit('increment')
		}
	},
	getters: {
		getCount:function(state){
			return state.count;
		}
	}
}

const moduleB = {
	state: {
		count: 5
	},
	mutations: {
		increment(state) {
			// 变更状态
			state.count++
		}
	},
	actions: {

	}
}

const store = new Vuex.Store({
	modules: {
		a: moduleA,
		b: moduleB
	}
})

export default store;
