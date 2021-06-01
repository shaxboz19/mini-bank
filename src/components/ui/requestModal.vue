<template>
    <form @submit.prevent="onCreate">
        <div class="form-control " :class="{'invalid' : nMessage}">
            <label for="name">ФИО</label>
            <input type="text" v-model="name" id="name">
            <small v-if="nMessage">{{nMessage}} </small>
             </div>
            <div class="form-control" :class="{'invalid' : pMessage}">
            <label for="phone">Телефон</label>
            <input type="tel" v-model="phone" id="phone">
            <small v-if="pMessage">{{pMessage}} </small>
            </div>
           
            <div class="form-control" :class="{'invalid' : cMessage}">
            <label for="cash">Сумма</label>
            <input type="number" v-model="cash" id="cash">
            <small v-if="cMessage">{{cMessage}} </small>
        </div>
            <div class="form-control">
            <label for="status">Статус</label>
            <select  v-model="status">
                <option value="active">Активный</option>
                <option value="canceled">Отменен</option>
                <option value="done">Завершен</option>
                <option value="pending">Выполняетя</option>
            </select>
        </div>
        <button class="btn primary" :disabled = 'isSubmitting'>Создать</button>
    </form>
</template>

<script>
import {useModalScript} from '../../use/modal-script'
import {useStore} from 'vuex'
export default {
    
    emit : ['created'],
    setup(_, {emit}) {
        const store = useStore();
        const submit = async values => {
            await store.dispatch('request/create', values)
            return emit('created')
        }

        
        return {
            ...useModalScript(submit)
        }
    }
    
}
</script>