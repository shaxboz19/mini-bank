<template>
    <div class="container">
        <app-message></app-message>
        <router-view ></router-view>
    </div>
</template>

<script>
import appMessage from '../components/ui/appMessage'
export default {
    components : {
        appMessage
    }
    
}
</script>
