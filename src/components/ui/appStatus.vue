<template>
    <span :class="['badge', className ]">{{text}} </span>
</template>

<script>
import {ref, watch} from 'vue'
export default {
    props : {
        type : {
            type: String,
            required : true,
            validator( value ) {
              return ['active', 'done', 'pending', 'canceled'].includes(value);  
            }
        }
    },
    setup(props) {
        
    const classMap = {
        active : 'primary',
        done :  'primary',
        pending : 'warning',
        canceled : 'danger'
    };
    const textMap = {
        active : 'Активный',
        done : 'Завершен',
        pending : 'Выполняется',
        canceled : 'Отменен'
    };

   
    const className = ref(classMap[props.type]);
    const text = ref(textMap[props.type]);
     watch(props, val =>{
        className.value = classMap[val.type];
        text.value = textMap[val.type];
    })

    return {
        className,
        text
    }
    },
    
}
</script>