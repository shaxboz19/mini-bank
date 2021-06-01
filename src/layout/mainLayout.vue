<template>
    <div class="container with-nav">
    <the-navbar></the-navbar>
    <the-sidebar></the-sidebar>
     <app-message></app-message>
     <router-view></router-view>
    
    </div>
</template>

<script>
import theNavbar from '../components/theNavbar'
import AppMessage from '../components/ui/appMessage.vue'
import theSidebar from '../components/ui/theSidebar'

export default {
    components : {
        theNavbar,
        AppMessage,
        theSidebar,

        
    }
    
}
</script>