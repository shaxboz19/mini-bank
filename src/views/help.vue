<template>
  <div>
    <app-page back title="Помощь">
       <question-item 
    v-for="(item, index) in question" :key="index"
    :question = 'item'
    ></question-item>
   
    </app-page>
    
  </div>
</template>

<script>
import appPage from '../components/ui/appPage'
import questionItem from '../components/question/questionItem'
export default {
  components : {
    appPage,
    questionItem
  },
  setup() {
    const question = [
      {title : 'Что есть в данной системе?', body : 'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял'},
      {title : 'Как тут работает авторизация?', body : 'Все реализовано через Firebase'}
    ];

    return {
      question
    }
  }
}
</script>