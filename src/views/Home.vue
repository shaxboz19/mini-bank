<template>
  <div >
    <app-loader v-if="loader"></app-loader>
    <app-page title="Список заявок" v-else>
      <request-filter v-model="filter"></request-filter>
      
      <template #header>
        <button class="btn primary" @click="modal = true">Создать </button>
      </template>
      <request-table :request='request'></request-table>
    </app-page>
    
    <teleport to='body'> 
      <app-modal v-if="modal" title="Создать заявку" @close = 'modal = false'>
        <request-modal @created = 'modal= false'></request-modal>
      </app-modal> 
       </teleport>
  </div>
</template>

<script>
import AppPage from '../components/ui/appPage.vue'
import { useStore } from "vuex";
import requestTable from '../components/ui/requestTable'
import requestModal from '../components/ui/requestModal'
import appModal from '../components/ui/appModal'
import {ref, computed, onMounted, watch} from 'vue'
import RequestModal from '../components/ui/requestModal.vue'
import requestFilter from '../components/ui/requestFilter'
import appLoader from '../components/ui/appLoader'
export default {
  setup() {
    const store = useStore();
    const modal = ref(false);
    const loader = ref(false);
    const filter = ref({});

    const request = computed(() => store.getters['request/request']
    .filter(request =>{
      if(filter.value.name) {
        return request.name.includes(filter.value.name);
      }
      return request
    })
    .filter(request =>{
      if(filter.value.status) {
        return request.status == filter.value.status 
      }
      return request
    })
    );

    watch(filter, val =>{
      console.log(val);
    })
    onMounted(async ()=>{
      loader.value= true;
     await store.dispatch('request/load');
      loader.value = false;
      })
    return {
      filter,
      modal,
      requestModal,
      request,
      loader,
      
    }
  },
  components : {
    AppPage,
    requestTable,
    appModal,
    RequestModal,
    appLoader,
    requestFilter
  }
}
</script>
