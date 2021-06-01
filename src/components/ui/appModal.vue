<template>
    <div>
        <div class="modal-backdrop" @click="$emit('close')"></div>
        <div class="modal">
            <h2 v-if="title">{{title}} </h2>
            <slot></slot>
        </div>
        
    </div>
</template>
 
 <script>
 export default {
     emits : ['close'],
     props : {
         title : {
             type : String
         },
     }
 }
 </script>