import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import Auth from '@/pages/Auth/Index.vue'
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "Icons" */ "@/pages/Icons.vue");
const Lenses = () => import(/* webpackChunkName: "Lenses" */ '@/pages/Lenses/Index.vue');
const Lense = () => import(/* webpackChunkName: "Lense" */ '@/pages/Lenses/EditLense/Index.vue');
const Admins = () => import(/* webpackChunkName: "Admins" */ '@/pages/Admins/Index.vue');
const Admin = () => import(/* webpackChunkName: "Admin" */ '@/pages/Admins/EditAdmin/Index.vue');
const Banners = () => import(/* webpackChunkName: "Banners" */ '@/pages/Banners/Index.vue');
const Banner = () => import(/* webpackChunkName: "Banner" */ '@/pages/Banners/EditBanner/Index.vue');
const Login = () => import(/* webpackChunkName: "Login" */ '@/pages/Auth/Login/Index.vue')
const Maps = () => import(/* webpackChunkName: "Maps" */ '@/pages/Maps/Index.vue')
const Map = () => import(/* webpackChunkName: "Map" */ '@/pages/Maps/CreatePin/Index.vue')

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
      },
      {
        path: 'mapas',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'mapas/create',
        name: 'Map',
        component: Map
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
