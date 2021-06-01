import { createStore, createLogger } from 'vuex'
import store from './modules/authModule'
import request from './modules/requestModule'

const plugins = [];

if(process.env.NODE_ENV==='development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state() {
    return {
      message : null,

      isOpenSidebar : false,
    }
  },
  mutations: {
    setMessage(state, text) {
      state.message = text;
    },
    clearMessage(state) {
      state.message = null;
    },
    openSidebar (state) {
      console.log('Вызван');
      state.isOpenSidebar = true;
    },
    closeSidebar (state) {
      state.isOpenSidebar = false;
    }
  },
  actions: {
    setupMessage({commit}, message) {
      
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      }, 2000);  
    }
  },
  modules: {
   auth: store,
   request
  }
})
