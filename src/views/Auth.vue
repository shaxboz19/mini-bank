<template>
    <form class="card" @submit.prevent="onSubmit">
        <h1>Вход в систему</h1>

        <div :class="['form-control', {'invalid' : eError }]">
            <label for="email">Введите email</label>
            <input type="email" id="email" @blur="eBlur" v-model="email" >
            <small v-if="eError">{{eError}}</small> 
        </div>
        <div  :class="['form-control', {'invalid' : pError }]">
            <label for="password">Введите пароль</label>
            <input type="password" id="password"  @blur="pBlur" v-model="password" >
            <small v-if="pError">{{pError}}</small> 
        </div>
        <button class="btn" :disabled= 'isSubmitting || isTooManyAttempts' >Войти</button>
        <div v-if="isTooManyAttempts" class="text-danger">Слишком много неудачных попыток</div>
    </form>
</template>

<script>
import {useFormScript} from '../use/form-script'
import {useStore} from 'vuex'
import { useRoute } from 'vue-router';
import {error} from '../utils/error'
export default {
    
    setup() {
        const store = useStore();
        const route = useRoute();

        if(route.query.message) {
            store.dispatch('setupMessage', {
                value : error(route.query.message),
                type : 'warning'
            })
        }

        return {
            ...useFormScript(),
        }
    }
    
}
</script>