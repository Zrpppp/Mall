import Vue from 'vue';
import VueRouter from 'vue-router';
import Detail from "@/views/detail/Detail";

const Home = () => import("../views/home/Home.vue")
const category = () => import("../views/category/Category.vue")
const cart = () => import("../views/cart/Cart.vue")
const profile = () => import("../views/profile/Profile.vue")
const detail = () => import("../views/detail/Detail.vue")

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/category',
    component: category,
  },
  {
    path: '/cart',
    component: cart,
  },
  {
    path: '/profile',
    component: profile,
  },
  {
    path: '/detail/:iid',
    component: detail,
  },
]

const routers = new VueRouter({
  routes,
  mode: 'history'
});

export default routers;
