import Vue from 'vue'
import VueRouter from 'vue-router'
import BookList from '../views/BookList.vue'
import AuthorList from '../views/AuthorList.vue'
import CategoryList from '../views/CategoryList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/books'
  },
  {
    path: '/books',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/authors',
    name: 'AuthorList',
    component: AuthorList
  },
  {
    path: '/categories',
    name: 'CategoryList',
    component: CategoryList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
