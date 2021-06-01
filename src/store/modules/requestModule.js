import axios from '../../axios/request'
import store from '../index'

export default {
    namespaced : true,
    state() {
        return {
            request : [],
        }
    },
    mutations : {
        setRequest(state, request) {
            state.request = request;
        },
        addRequest(state, request) {
            state.request.push(request);
        },
    },
    actions : {
       async create({dispatch, commit}, payload) {
        try {
            const token = store.getters['auth/token'];
           const {data} = await axios.post(`/request.json?auth=${token}`, payload);
           commit('addRequest', {...payload, id : data.name})
           dispatch('setupMessage', {
               value : 'Заявка успешно создана!',
               type: 'primary',
           }, {root: true})
        }catch(e) {
            dispatch('setupMessage', {
                value : e.message,
                type: 'danger'
            }, {root : true} )

        }

        },
        async load({commit, dispatch}) {
            try {
                console.log('Работает');
                const token = store.getters['auth/token'];
               const {data} = await axios.get(`/request.json?auth=${token}`);
               console.log(Object.keys(data).map(id=> ({...data[id], id})));
               commit('setRequest', Object.keys(data).map(id=> ({...data[id], id})))
            }catch(e) {
                dispatch('setupMessage', {
                    value : e.message,
                    type: 'danger'
                }, {root : true} )
    
            }
    
        },
        async loadOne({dispatch}, id) {
            try {
                const token = store.getters['auth/token'];
               const {data} = await axios.get(`/request/${id}.json?auth=${token}`);
                return data
                }catch(e) {
                dispatch('setupMessage', {
                    value : e.message,
                    type: 'danger'
                }, {root : true} )
    
            }
    
        },
        async remove({dispatch}, id) {
            try {
                const token = store.getters['auth/token'];
                await axios.delete(`/request/${id}.json?auth=${token}`);
                
                dispatch('setupMessage', {
                    value : 'Заявка успешно удалена',
                    type : 'primary'
                }, {root:true})
                }catch(e) {
                dispatch('setupMessage', {
                    value : e.message,
                    type: 'danger'
                }, {root : true} )
    
            }
    
        },
        async update({dispatch}, data) {
            try {
                console.log('Дата' , data);
                const token = store.getters['auth/token'];
                await axios.put(`/request/${data.id}.json?auth=${token}`, data);
               dispatch('setupMessage', {
                   value: 'Заявка успешно обновлена',
                   type : 'primary'
               }, {root : true})
                }catch(e) {
                dispatch('setupMessage', {
                    value : e.message,
                    type: 'danger'
                }, {root : true} )
    
            }
    
        }
    },
    getters : {
        request(state) {
            return state.request
        }
    }
}