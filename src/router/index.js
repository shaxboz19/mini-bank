import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta : {
      layout : 'main',
      auth : true,
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/help.vue'),
    meta : {
      layout : 'main',
      auth : true,
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    meta : {
      layout : 'auth',

    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('../views/request.vue'),
    meta : {
      layout : 'main',
      auth : true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass : 'active',
  linkExactActiveClass : 'active'

});
  




 router.beforeEach((to, from, next) => {
    console.log('to', to);

    const requiredAuth = to.meta.auth;
    console.log(requiredAuth);
    console.log('auth', store.getters['auth/isAuthenticated']);
    if(requiredAuth && store.getters['auth/isAuthenticated']) {
      
      next();
    } else if (requiredAuth && !store.getters['auth/isAuthenticated']) { 
      next('/auth?message=auth');
    } else {
      next();
    }
    
 }) 
export default router
