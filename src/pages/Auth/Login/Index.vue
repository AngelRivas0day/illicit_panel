<template>
    <form @submit="login" class="login">
        <md-card class="login-card">
            <md-card-header>
                <div class="md-title text-center">ILLICIT ADMIN PANEL</div>
            </md-card-header>
            <md-card-content>
                <div>
                    <md-field>
                        <label>Email</label>
                        <md-input type="email" v-model="form.email" required></md-input>
                    </md-field>
                    <md-field>
                        <label>Password</label>
                        <md-input type="password" v-model="form.password" required></md-input>
                    </md-field>
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

export default {
    name: 'Login',
    data: () => ({
        form: {
            email: '',
            password: ''
        }
    }),
    methods: {
        login(e){
            e.preventDefault()
            store.dispatch('oauth/login', this.form, {root:true})
                .then(resp=>{
                    this.$router.push({name: 'dashboard'})
                })
                .catch(err=>{
                    console.log(err)
                })
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