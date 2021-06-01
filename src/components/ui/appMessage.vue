<template>
    <div v-if="message" :class="['alert', message.type ]" >
        <h2 class="alert-title">{{title}}</h2>
        <p>{{message.value}}</p>
        <span class="alert-close" @click="close">&times;</span>
    </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
export default {
    setup() {
        const store = useStore();
        const message = computed(() => {
           return store.state.message
        });
        const TITLE_MAP = {
            danger : 'Ошибка!',
            primary : 'Успешно!',
            warning : 'Внимание!'
        }
        const title = computed(() =>{
            return  message.value ? TITLE_MAP[message.value.type] : null
        })
     return {
         message,
         title,
         close : () => store.commit('clearMessage')
     }   
    }   
}
</script>