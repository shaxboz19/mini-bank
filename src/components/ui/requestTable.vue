<template>
    <div>
        <h4 v-if="request.length == 0">Заявок пока нет!</h4>

        <table  class="table" v-else>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Сумма</th>
                    <th>Статус</th>
                    <th>Действие</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(r, idx) of request" :key="r.id">
                    <td>{{idx+1}}</td>
                    <td>{{r.name  }}</td>
                    <td>{{r.phone }}</td>
                    <td>{{ currency(r.cash) }}</td>
                    <td> <app-status :type= 'r.status'></app-status> </td>
                    <td>
                    <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: r.id}}">
                    <button class="btn primary" @click="navigate">Открыть</button>
                    </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {currency} from '../../utils/formatter'
import appStatus from './appStatus.vue'
export default {
  components: { appStatus },
    props: ['request'],
    setup() {
        
        return {
            currency
        }
    },
    component : {
        appStatus
    }
}
</script>