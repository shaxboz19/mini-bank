<template>
    <div class="sidebar" v-if="isOpen">
        <span class="sidebar-close" @click="close">&times;</span>
        <p class="sidebar-content">Добро пожаловать в систему по учету заявок в нашем банке. Здесь вы найдете исчерпывающую информацию про систему заявки</p>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex'
export default {
    setup() {
         const store = useStore();
        const isOpen = computed(()=>{
            return store.state.isOpenSidebar
        })

         return {
             close : ()=> store.commit('closeSidebar'),
             isOpen

         }
    }
    
}
</script>