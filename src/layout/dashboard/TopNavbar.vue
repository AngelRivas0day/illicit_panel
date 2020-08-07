<template>
  <nav class="navbar navbar-expand-lg navbar-absolute"
       :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline" :class="{toggled: $sidebar.showSidebar}">
          <button type="button"
                  class="navbar-toggler"
                  aria-label="Navbar toggle button"
                  @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand">{{routeName}}</a>
      </div>
      <button class="navbar-toggler" type="button"
              @click="toggleMenu"
              data-toggle="collapse"
              data-target="#navigation"
              aria-controls="navigation-index"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>

      <collapse-transition>
        <div class="collapse navbar-collapse show" v-show="showMenu">
          <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
            <base-dropdown tag="li"
                           :menu-on-right="!$rtl.isRTL"
                           title-tag="a"
                           class="nav-item"
                           menu-classes="dropdown-navbar">
              <a slot="title" href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="true">
                <div class="photo">
                  <img src="img/anime3.png">
                </div>
                <b class="caret d-none d-lg-block d-xl-block"></b>
                <p class="d-lg-none">
                  Log out
                </p>
              </a>
              <li class="nav-link">
                <router-link to="" class="nav-item dropdown-item">Perfil</router-link>
              </li>
              <div class="dropdown-divider"></div>
              <li class="nav-link">
                <a @click="logout" class="nav-item dropdown-item">Log out</a>
              </li>
            </base-dropdown>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import Modal from '@/components/Modal';
import store from '@/store'

export default {
    components: {
      	CollapseTransition,
      	Modal
    },
    computed: {
      	routeName() {
        	const { name } = this.$route;
        	return this.capitalizeFirstLetter(name);
      	},
      	isRTL() {
        	return this.$rtl.isRTL;
      	}
    },
    data() {
      	return {
        	activeNotifications: false,
        	showMenu: false,
        	searchModalVisible: false,
        	searchQuery: ''
      	};
    },
    methods: {
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		toggleNotificationDropDown() {
			this.activeNotifications = !this.activeNotifications;
		},
		closeDropDown() {
			this.activeNotifications = false;
		},
		toggleSidebar() {
			this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
		},
		hideSidebar() {
			this.$sidebar.displaySidebar(false);
		},
		toggleMenu() {
			this.showMenu = !this.showMenu;
		},
		logout(e){
			e.preventDefault()
			store.dispatch('oauth/logout', localStorage.getItem('token'), {root:true})
				.then(resp=>{
					console.log('token destruido')
					this.$router.push({name: 'Login'})
				})
				.catch(err=>{
					console.log("Hubo un error al destruir el token: ", localStorage.getItem('token'))
					this.$router.push({name: 'Login'})
				})
		}
    }
  };
</script>
<style lang="scss" scoped>
.nav-link{
	cursor: pointer;
	&:hover .nav-item{
		text-decoration: underline;
	}
	.nav-item{
		color: #333 !important;
		background: transparent !important;
	}
}
</style>
