<template>
    <form @submit="onSubmit" class="login">
        <md-card class="login-card">
            <md-card-header>
                <div class="md-title text-center">ILLICIT ADMIN PANEL</div>
            </md-card-header>
            <md-card-content>
                <div>
                    <div class="w-100 mb-3" v-if="isLoading">
                        <md-progress-bar md-mode="indeterminate"></md-progress-bar>
                    </div>
                    <md-field>
                        <label>Email</label>
                        <md-input type="email" v-model="form.email" required></md-input>
                    </md-field>
                    <md-field>
                        <label>Password</label>
                        <md-input type="password" v-model="form.password" required></md-input>
                    </md-field>
                </div>
                <div v-if="errorMessage" class="text-center text-warning">
                    {{errorMessage}}
                </div>
            </md-card-content>
            <md-card-actions>
                <md-button class="md-primary md-dense md-raised" type="submit">ENTRAR</md-button>
            </md-card-actions>
        </md-card>
    </form>
</template>

<script>
import store from '@/store'
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Login',
    data: () => ({
        form: {
            email: '',
            password: ''
        },
        errorMessage: null
    }),
    computed: {
        ...mapState('oauth',{
            isLoading: 'isLoading'
        })
    },
    methods: {
        ...mapActions('oauth',{
            login: 'login'
        }),
        async onSubmit(e){
            e.preventDefault()
            try {
                await this.login(this.form)
                this.$router.push({name: 'dashboard'})
            } catch(error) {
                this.errorMessage = "Error al hacer login."
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_vars';

.login{
    @include center-layout;
    &-card{
        width: 80%;
        max-width: 450px;
        background-color: #111;
        @media #{$break-medium}{
            width: 65%;
        }
    }
}
</style>