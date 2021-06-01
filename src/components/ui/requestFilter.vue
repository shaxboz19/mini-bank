<template>
    <div class="filter">
        <div class="form-control">
            <input type="text" placeholder="Введите имя" v-model="name">
        </div>
        <div class="form-control">
            <select v-model="status">
                <option disabled selected>Выберите статус</option>
                <option value="active">Активный</option>
                <option value="pending">Выполняется</option>
                <option value="canceled">Отменен</option>
                <option value="canceled">Завершен</option>
            </select>
        </div>
        <button class="danger btn" v-if="name || status" @click="reset">Очистить</button>
        
    </div>
</template>

<script>
import {ref, watch} from 'vue'
export default {
    emits : ['update:modelValue'],
    props: ['modelValue'],

   setup(_, {emit}) {
        const name = ref('');
        const status = ref('');

        watch([name, status], values => {
            emit('update:modelValue', {
                name : values[0],
                status : values[1]
            }) 
        })
        
             return {
            name,
            status,
            reset() {
            name.value = '';
            status.value = null;
            }
             
      }
        }
   }
    
</script>