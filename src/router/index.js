import Vue from 'vue'
import Router from 'vue-router'
import select from '@/components/select'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'select',
      component: select
    }
  ]
})
