import axios from 'axios'
import {error} from '../../utils/error'
export default {
    namespaced : true,
    state() {
        return{
            token : localStorage.getItem('token'),
        }
    },
    
    mutations : {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token)
        },
        logOut(state) {
            state.token = null
            localStorage.removeItem('token')
        },
    },

    actions : {
       async  login({commit, dispatch}, payload) {  
        //   commit('setToken', 'Test token')
        try {
            
            const url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
            const {data} = await axios.post(url, {...payload, returnSecureToken:true})
            console.log('data', data);
            commit('setToken', data.idToken );
            dispatch('setupMessage', null, {root : true}) 

        } catch(e) {
            dispatch('setupMessage', {
                value : error(e.response.data.error.message),
                type : 'danger'
            }, {root : true}) 
           throw new Error();
        }         
      },
    },
    getters : {
        token(state) {
            return state.token;
        },
        isAuthenticated(state) {
           return !!state.token;
        },
    }
}