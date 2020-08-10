import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import Auth from '@/pages/Auth/Index.vue'
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Lenses = () => import('@/pages/Lenses/Index.vue');
const Lense = () => import('@/pages/Lenses/EditLense/Index.vue');
const Admins = () => import('@/pages/Admins/Index.vue');
const Admin = () => import('@/pages/Admins/EditAdmin/Index.vue');
const Banners = () => import('@/pages/Banners/Index.vue');
const Banner = () => import('@/pages/Banners/EditBanner/Index.vue');
const Login = () => import('@/pages/Auth/Login/Index.vue')

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: 'lentes',
        name: 'Lenses',
        component: Lenses
      },
      {
        path: 'lentes/edit/:id',
        name: 'Edit-Lense',
        component: Lense
      },
      {
        path: 'lentes/create/',
        name: 'Create-Lense',
        component: Lense
      },
      {
        path: 'admins',
        name: 'Admins',
        component: Admins
      },
      {
        path: 'admins/edit/:id',
        name: 'Edit-Admin',
        component: Admin
      },
      {
        path: 'admins/create/',
        name: 'Create-Admin',
        component: Admin
      },
      {
        path: 'banners',
        name: 'Banners',
        component: Banners
      },
      {
        path: 'banners/create/',
        name: 'Create-Banner',
        component: Banner
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: '/auth/login',
    component: Auth,
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: Login
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
