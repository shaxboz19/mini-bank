<template>
  <div>
    <component :is="nameLay + '-layout'"></component>
  </div>
</template>

<script>
import authLayout from './layout/authLayout'
import mainLayout from './layout/mainLayout'
import {computed} from 'vue'
import {useRoute} from 'vue-router'
export default {
  components : {
    authLayout,
    mainLayout
  },
  setup() {
    const route = useRoute()
    const nameLay = computed( ()=> {
      return route.meta.layout;
    })
    return {
      nameLay
    }
  }

  
}
</script>

