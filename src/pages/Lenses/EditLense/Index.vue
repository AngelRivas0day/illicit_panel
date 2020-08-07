<template>
    <div class="card">
        <div class="card-header">
            <h1 class="title">Lentes</h1>
        </div>
        <div class="card-body">
            <EditForm />
            <!-- La info le llega al  componente por Vuex -->
        </div>
    </div>
</template>

<script>
import EditForm from './EditForm'
import { getGlass } from '@/api/glasses'
import store from '@/store'
import { mapState } from 'vuex'

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
    computed: {
        ...mapState('editor',{
            glass: 'glass'
        })
    },
    data: () => ({
        itemId: null,
    }),
    methods: {
        getData(){
            store.dispatch('loading/isLoading',null,{root:true})
            store.dispatch('editor/getGlass', this.itemId, {root:true})
                .then(resp=>{
                    console.log("Lente desde vuex: ",resp)
                })
                .catch(err=>{
                    console.log("Error desde vuex: ", err)
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