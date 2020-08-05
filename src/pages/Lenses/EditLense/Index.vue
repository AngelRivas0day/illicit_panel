<template>
    <div class="card">
        <div class="card-header">
            <h1 class="title">Lentes</h1>
        </div>
        <div class="card-body">
            <EditForm :glass="glass" />
        </div>
    </div>
</template>

<script>
import EditForm from './EditForm'
import { getGlass } from '@/api/glasses'
import store from '@/store'

export default {
    name: 'EditLense',
    components: {EditForm},
    beforeMount(){
        // obtenemos el parametro de la ruta si es que viene uno
        // si no viene uno entonces el formulario se queda para crear
        // un lente en lugar de editar uno
        if(this.$route.params.id){
            this.itemId = this.$route.params.id;
            console.log("Id: ", this.itemId)
            this.getData()
        }
    },
    data: () => ({
        itemId: null,
        glass: null
    }),
    methods: {
        getData(){
            store.dispatch('loading/isLoading',null,{root:true})
            getGlass(this.itemId)
                .then(resp=>{
                    console.log(resp)
                    this.glass = resp
                })
                .catch(err=>{
                    console.log(err)
                })
                .finally(()=>{
                    store.dispatch('loading/notLoading',null,{root:true})
                })
        }
    }
}
</script>

<style>

</style>