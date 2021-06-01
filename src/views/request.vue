<template>
    <div>
        <app-loader v-if="loader"></app-loader>
       <app-page back title="Заявка" v-else-if="data">
           <p>ФИО: {{data.name}} </p>
           <p>Телефон: {{data.phone}} </p>
           <p>Сумма: {{currency(data.cash)}} </p>
           <p>Статус:  <app-status :type="data.status"></app-status> </p>
           <button class="btn danger" @click="remove">Удалить</button>
           <button class="btn " @click="update" v-if="hasChange">Обновить</button>
            <div class="form-control">
            <label for="status">Статус</label>
            <select  v-model="status">
                <option value="active">Активный</option>
                <option value="canceled">Отменен</option>
                <option value="done">Завершен</option>
                <option value="pending">Выполняетя</option>
            </select>
        </div>
       </app-page>
       
       <h3 v-else class="text-white text-center">Заявка с таким ID :{{$route.params.id}}  нет! </h3>
       

        
    </div>
</template>

<script>
import appPage from '../components/ui/appPage'
import appLoader from '../components/ui/appLoader'
import {currency} from '../utils/formatter'
import {useStore} from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import {ref, onMounted, computed} from 'vue'
import AppStatus from '../components/ui/appStatus.vue'
export default {
    setup() {
        const route = useRoute()
        const store = useStore();
        const data = ref({});
        const loader = ref(true);
        const router = useRouter();
        const status = ref('');
        
      const hasChange = computed(()=>{
          return data.value.status !=status.value
      })
         
        

        onMounted(async ()=>{
            loader.value =true;
            data.value = await store.dispatch('request/loadOne', route.params.id)
            console.log(data.value);
            loader.value = false;
            status.value = data.value.status
            
        });
        const remove = async () =>{
          await  store.dispatch('request/remove', route.params.id);
            router.push('/')

        };
        const update = async () =>{
            const request = {...data.value, status : status.value, id: route.params.id}
            await store.dispatch('request/update', request);
            console.log('data', data.value);
            data.value.status = status.value;

        };
        
        return {
            loader,
            data,
           currency,
           remove,
           update,
           status,
           hasChange

        }

        
    },

    components : {
        AppStatus,
        appPage,
        appLoader,
    }
    
}
</script>